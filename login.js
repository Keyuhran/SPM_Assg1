import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js'
import { getAuth, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyBWMWesdJBRs64nInlQotb3BGOPVFzLfEg",
    authDomain: "ngeeanncity-11800.firebaseapp.com",
    projectId: "ngeeanncity-11800",
    storageBucket: "ngeeanncity-11800.appspot.com",
    messagingSenderId: "327848331733",
    appId: "1:327848331733:web:18c968969b91beeebfd55c",
    measurementId: "G-DB9D997LYY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById('loginButton').addEventListener('click', function(event) {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    if (!emailInput.value) {
        alert('Please enter your email.');
        emailInput.focus();
        event.preventDefault();
        return;
    }

    if (!passwordInput.value) {
        alert('Please enter your password.');
        passwordInput.focus();
        event.preventDefault();
        return;
    }

    if (emailInput.value && passwordInput.value) {
        signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          window.location.href = 'index.html';
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
});