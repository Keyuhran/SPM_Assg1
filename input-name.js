// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

// Your web app's Firebase configuration
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
const db = getFirestore(app);
