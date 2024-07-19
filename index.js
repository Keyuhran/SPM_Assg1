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

function exit() {
    window.close();
}
//arcade nav
const arcade = document.getElementById("navArcade");
arcade.addEventListener("click", goToArcade);
//freeplay nav
const freeplay = document.getElementById("navFreePlay");
freeplay.addEventListener("click", goToFreePlay);
//leaderboard nav
const leaderboard = document.getElementById("navLeaderboard");
leaderboard.addEventListener("click", goToLeaderboard);
//load game nav
const load = document.getElementById("navLoad");
load.addEventListener("click", goToLoadGame);
//exit nav
const exitpage = document.getElementById("navExit");
exitpage.addEventListener("click", exit);