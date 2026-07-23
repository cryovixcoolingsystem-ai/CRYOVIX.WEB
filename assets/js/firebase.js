// ==========================================
// Firebase Configuration
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ==========================================
// Your Firebase Config
// ==========================================

const firebaseConfig = {
  apiKey: "AIzaSyCUY3RQ-o02JdP3-hWJshSutp4UQr0yuvM",
  authDomain: "cryovix-fixify-8869f.firebaseapp.com",
  projectId: "cryovix-fixify-8869f",
  storageBucket: "cryovix-fixify-8869f.firebasestorage.app",
  messagingSenderId: "170952588532",
  appId: "1:170952588532:web:36641730b831dc18aeb2a1",
  measurementId: "G-F3C0ME38D8"
};

// ==========================================
// Initialize Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export
export {
  db,
  storage,
  auth,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  ref,
  uploadBytes,
  getDownloadURL
};