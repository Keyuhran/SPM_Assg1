// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWMWesdJBRs64nInlQotb3BGOPVFzLfEg",
  authDomain: "ngeeanncity-11800.firebaseapp.com",
  projectId: "ngeeanncity-11800",
  storageBucket: "ngeeanncity-11800.appspot.com",
  messagingSenderId: "327848331733",
  appId: "1:327848331733:web:18c968969b91beeebfd55c",
  measurementId: "G-DB9D997LYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);