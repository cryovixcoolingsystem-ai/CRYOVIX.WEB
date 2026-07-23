import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

const firebaseConfig = {

apiKey:"YOUR_API_KEY",

authDomain:"YOUR_PROJECT.firebaseapp.com",

projectId:"YOUR_PROJECT",

storageBucket:"YOUR_PROJECT.appspot.com",

messagingSenderId:"XXXXX",

appId:"XXXXX"

};

export const app =
initializeApp(firebaseConfig);