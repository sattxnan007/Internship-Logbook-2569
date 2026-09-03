/**
 * Firebase Configuration for Internship Work Log
 * Project: internship-2569-8ab4a
 */

window.DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBN9HvvqCygmvGHtq-v3pb2W2OWz8Dp1N4",
  authDomain: "internship-2569-8ab4a.firebaseapp.com",
  projectId: "internship-2569-8ab4a",
  storageBucket: "internship-2569-8ab4a.firebasestorage.app",
  messagingSenderId: "6646107803",
  appId: "1:6646107803:web:27f5c4534d7070131e803e",
  measurementId: "G-HK4E8B2M7E"
};

// Allow custom config override from localStorage if user updates it from the UI
window.getFirebaseConfig = function() {
  try {
    const custom = localStorage.getItem('CUSTOM_FIREBASE_CONFIG');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse custom Firebase config:', e);
  }
  return window.DEFAULT_FIREBASE_CONFIG;
};
