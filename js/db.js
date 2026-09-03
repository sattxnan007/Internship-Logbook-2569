/**
 * Unified Database Storage Manager (IndexedDB + LocalStorage Sync)
 * Stores Months, Weeks, Tasks, and Images reliably without quota errors.
 */

class StorageManager {
  constructor() {
    this.LOCAL_KEY = 'ALL_INTERN_DATA_V3';
  }

  // Load raw data from LocalStorage (synchronous, instant, zero latency)
  getLocalData() {
    try {
      const raw = localStorage.getItem(this.LOCAL_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return null;
  }

  saveLocalData(data) {
    try {
      localStorage.setItem(this.LOCAL_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error (likely image size, using memory):', e);
    }
  }

  async getAllData() {
    // 1. Fetch local cached data first (instant fallback)
    let localData = null;
    try {
      localData = await this.getIdbData();
      if (!localData || !localData.months || localData.months.length === 0) {
        localData = this.getLocalData();
      }
    } catch (e) {
      console.warn('Local read error:', e);
      localData = this.getLocalData();
    }

    // 2. If local cache has fewer filled entries than the bundled data, upgrade to bundled data
    const getFilledCount = (d) => (d && d.tasks) ? d.tasks.filter(t => t.title && t.title.trim()).length : 0;
    const defaultData = window.DEFAULT_SAMPLE_DATA;
    if (defaultData && getFilledCount(localData) < getFilledCount(defaultData)) {
      console.log('[StorageManager] Seeding with bundled real internship data...');
      localData = JSON.parse(JSON.stringify(defaultData));
      this.saveLocalData(localData);
      this.saveIdbData(localData).catch(() => {});
    }

    // 3. Asynchronous non-blocking Cloud sync (does NOT delay initial render)
    if (window.firebaseService && typeof window.firebaseService.loadData === 'function') {
      setTimeout(async () => {
        try {
          // Check if cloud has newer data or needs initial seeding
          const cloudData = await window.firebaseService.loadData();
          if (cloudData && cloudData.months && cloudData.months.length > 0) {
            // Cloud has data
            if (getFilledCount(cloudData) > getFilledCount(localData)) {
              console.log('[StorageManager] Cloud has newer data, updating background cache...');
              this.saveLocalData(cloudData);
              this.saveIdbData(cloudData).catch(() => {});
              if (window.appState) {
                window.appState.load();
              }
            }
          } else if (localData && getFilledCount(localData) > 0) {
            console.log('[StorageManager] Cloud is empty, syncing local data to cloud in background...');
            window.firebaseService.saveData(localData).catch(err => {
              console.warn('Background cloud init error:', err);
            });
          }
        } catch (e) {
          console.warn('[StorageManager] Background cloud sync check:', e);
        }
      }, 1000);
    }

    // 4. Return immediately (< 5ms) for instant display
    if (localData && localData.months && localData.months.length > 0) {
      return localData;
    }

    return defaultData || null;
  }

  async saveAllData(data) {
    // 1. Instant local save (zero lag in UI)
    this.saveLocalData(data);
    try {
      await this.saveIdbData(data);
    } catch (e) {
      console.warn('IndexedDB save error:', e);
    }

    // 2. Asynchronous save to Cloud Firestore
    if (window.firebaseService && typeof window.firebaseService.saveData === 'function') {
      window.firebaseService.saveData(data).catch(err => {
        console.warn('Background cloud save failed:', err);
      });
    }
  }

  // IndexedDB implementation
  async openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open('AllInternModernDB_v3', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('store')) {
          db.createObjectStore('store', { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async getIdbData() {
    const db = await this.openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('store', 'readonly');
      const req = tx.objectStore('store').get('app_data');
      req.onsuccess = () => resolve(req.result ? req.result.value : null);
      req.onerror = () => resolve(null);
    });
  }

  async saveIdbData(data) {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('store', 'readwrite');
      const req = tx.objectStore('store').put({ key: 'app_data', value: data });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async clearAll() {
    localStorage.removeItem(this.LOCAL_KEY);
    try {
      const db = await this.openDB();
      const tx = db.transaction('store', 'readwrite');
      tx.objectStore('store').clear();
    } catch (e) {}
  }
}

window.storageManager = new StorageManager();
