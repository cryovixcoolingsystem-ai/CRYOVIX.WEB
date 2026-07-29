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

// js/firebase.js

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "AIzaSyDFxFdt_0hEzJnR3Ze-GfX_1uCzW_lgfnE",

    authDomain: "cryovix-fixify.firebaseapp.com",

    projectId: "cryovix-fixify",

    storageBucket: "cryovix-fixify.firebasestorage.app",

    messagingSenderId: "871696054329",

    appId: "1:871696054329:web:4291aa97259ac0616875e8",

    measurementId: "G-FRX2EKB0NL"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


export {
    app,
    auth,
    db,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};