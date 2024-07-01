// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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