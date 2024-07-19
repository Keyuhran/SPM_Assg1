import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

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
const db = getFirestore(app);

await setDoc(doc(db, "users", localStorage.getItem("uid")), {
    test: "testText",
});

function goToArcade() {
    window.location.href = "arcade.html";
}

function goToFreePlay() {
    window.location.href = "free-play.html";
}

function goToLeaderboard() {
    window.location.href = "leaderboard.html";
}

function goToLoadGame() {
    window.location.href = "load-game.html";
}

function goToMainMenu() {
    window.location.href = "index.html";
}

function exit() {
    window.close();
}