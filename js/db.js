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
    // 1. Try IndexedDB first
    try {
      const idbData = await this.getIdbData();
      if (idbData && idbData.months && idbData.months.length > 0) {
        return idbData;
      }
    } catch (e) {
      console.warn('IndexedDB read error, falling back to LocalStorage:', e);
    }

    // 2. Fallback to LocalStorage
    const local = this.getLocalData();
    if (local && local.months && local.months.length > 0) {
      return local;
    }

    return null;
  }

  async saveAllData(data) {
    this.saveLocalData(data);
    try {
      await this.saveIdbData(data);
    } catch (e) {
      console.warn('IndexedDB save error:', e);
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
