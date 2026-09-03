/**
 * Firebase Firestore Cloud Service for Internship Work Log
 * Manages cloud storage, realtime sync, and offline-first data backup.
 */

class FirebaseService {
  constructor() {
    this.db = null;
    this.isInitialized = false;
    this.syncStatus = 'disconnected'; // 'disconnected' | 'connecting' | 'connected' | 'syncing' | 'synced' | 'error'
    this.statusListeners = [];
    this.lastError = null;
    this.knownRemoteTaskIds = new Set();
  }

  // Subscribe to status changes
  onStatusChange(callback) {
    if (typeof callback === 'function') {
      this.statusListeners.push(callback);
      callback(this.syncStatus, this.lastError);
    }
  }

  setStatus(status, error = null) {
    this.syncStatus = status;
    this.lastError = error;
    this.statusListeners.forEach(cb => {
      try { cb(status, error); } catch (e) { console.error('Status listener error:', e); }
    });
  }

  // Initialize Firebase app & Firestore
  init() {
    if (this.isInitialized) return true;

    try {
      if (typeof firebase === 'undefined') {
        console.warn('Firebase SDK not loaded.');
        this.setStatus('error', 'Firebase SDK not loaded');
        return false;
      }

      const config = window.getFirebaseConfig ? window.getFirebaseConfig() : window.DEFAULT_FIREBASE_CONFIG;
      if (!config || !config.apiKey || config.apiKey === 'YOUR_API_KEY') {
        this.setStatus('error', 'Firebase Config ยังไม่ได้ระบุ API Key');
        return false;
      }

      this.setStatus('connecting');

      // Initialize Firebase App if not already initialized
      if (!firebase.apps || firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }

      this.db = firebase.firestore();
      this.isInitialized = true;
      this.setStatus('connected');
      console.log('Firebase Firestore initialized successfully with project:', config.projectId);
      return true;
    } catch (e) {
      console.error('Firebase init error:', e);
      this.setStatus('error', e.message || 'Firebase initialization failed');
      return false;
    }
  }

  // Load all internship data from Firestore
  async loadData() {
    if (!this.init()) return null;

    this.setStatus('syncing');
    try {
      // 1. Load Structure (Months & Weeks)
      const structureDoc = await this.db.collection('internship_data').doc('structure').get();

      if (!structureDoc.exists) {
        console.log('No structure data found on Firestore (Cloud is empty).');
        this.setStatus('connected');
        return null;
      }

      const structure = structureDoc.data();
      const months = structure.months || [];
      const weeks = structure.weeks || [];

      // 2. Load Tasks collection
      const tasksSnapshot = await this.db.collection('internship_tasks').get();
      const tasks = [];
      this.knownRemoteTaskIds.clear();

      tasksSnapshot.forEach(doc => {
        this.knownRemoteTaskIds.add(doc.id);
        tasks.push(doc.data());
      });

      // Sort tasks by date if possible
      tasks.sort((a, b) => (a.date || '').localeCompare(b.date || ''));

      this.setStatus('synced');
      return { months, weeks, tasks };
    } catch (e) {
      console.error('Firestore loadData error:', e);
      let errMsg = e.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูลจาก Cloud';
      if (e.code === 'permission-denied') {
        errMsg = 'Firestore ยังไม่ได้เปิดสิทธิ์อ่าน/เขียน (กรุณาตั้งค่า Rules เป็น Test Mode)';
      }
      this.setStatus('error', errMsg);
      return null;
    }
  }

  // Save all internship data to Firestore
  async saveData(data) {
    if (!data) return false;
    if (!this.init()) return false;

    this.setStatus('syncing');
    try {
      const now = new Date().toISOString();

      // 1. Save Structure (Months & Weeks)
      await this.db.collection('internship_data').doc('structure').set({
        months: data.months || [],
        weeks: data.weeks || [],
        updatedAt: now,
        taskCount: (data.tasks || []).length
      });

      // 2. Batch write Tasks (Chunks of 400 for safety, Firestore limit is 500)
      const tasks = data.tasks || [];
      const currentTaskIds = new Set();
      const chunkSize = 400;

      for (let i = 0; i < tasks.length; i += chunkSize) {
        const batch = this.db.batch();
        const chunk = tasks.slice(i, i + chunkSize);

        chunk.forEach(task => {
          if (task && task.id) {
            currentTaskIds.add(task.id);
            const docRef = this.db.collection('internship_tasks').doc(task.id);
            batch.set(docRef, task);
          }
        });

        await batch.commit();
      }

      // 3. Clean up deleted tasks from Firestore
      const tasksToDelete = [];
      this.knownRemoteTaskIds.forEach(id => {
        if (!currentTaskIds.has(id)) {
          tasksToDelete.push(id);
        }
      });

      if (tasksToDelete.length > 0) {
        for (let i = 0; i < tasksToDelete.length; i += chunkSize) {
          const deleteBatch = this.db.batch();
          const deleteChunk = tasksToDelete.slice(i, i + chunkSize);
          deleteChunk.forEach(id => {
            deleteBatch.delete(this.db.collection('internship_tasks').doc(id));
          });
          await deleteBatch.commit();
        }
      }

      // Update known remote task ids
      this.knownRemoteTaskIds = currentTaskIds;

      this.setStatus('synced');
      return true;
    } catch (e) {
      console.error('Firestore saveData error:', e);
      let errMsg = e.message || 'บันทึกลง Cloud ไม่สำเร็จ';
      if (e.code === 'permission-denied') {
        errMsg = 'Firestore สิทธิ์ไม่เพียงพอ (กรุณาตั้งค่า Rules ใน Firebase Console)';
      }
      this.setStatus('error', errMsg);
      return false;
    }
  }

  // Force push local data into Cloud
  async pushLocalToCloud(localData) {
    if (!localData) return false;
    return await this.saveData(localData);
  }
}

window.firebaseService = new FirebaseService();
