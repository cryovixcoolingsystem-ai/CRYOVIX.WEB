// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore ke liye
import { getAuth } from "firebase/auth";           // Authentication ke liye (agar chahiye)

const firebaseConfig = {
  apiKey: "AIzaSyA6i1kfeHbjfnpoGEhKA547RfiEs4YPxWs",
  authDomain: "cryovix-fixify-9568.firebaseapp.com",
  databaseURL: "https://cryovix-fixify-9568-default-rtdb.firebaseio.com",
  projectId: "cryovix-fixify-9568",
  storageBucket: "cryovix-fixify-9568.firebasestorage.app",
  messagingSenderId: "1085216868854",
  appId: "1:1085216868854:web:a64ade2b08a871bfdf9fd7",
  measurementId: "G-GPXDLR50SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app); // Database instance export
export const auth = getAuth(app);     // Auth instance export

export default app;