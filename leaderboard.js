// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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
//Sconst analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to fetch top 10 scores for a given game mode
async function fetchTopScores(mode, elementId) {
    const scoresRef = collection(db, mode); // Assuming collection names are "FreePlay" and "Arcade"
    const q = query(scoresRef, orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);

    const scores = [];
    querySnapshot.forEach((doc) => {
        scores.push(doc.data());
    });

    // Display scores on the page
    const scoreTableBody = document.getElementById(elementId);
    scoreTableBody.innerHTML = "";
    scores.forEach((score, index) => {
        const tr = document.createElement("tr");
        const date = score.date ? new Date(score.date.seconds * 1000).toLocaleDateString() : 'N/A';

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${score.name}</td>
            <td>${score.score}</td>
            <td>${date}</td>
        `;
        scoreTableBody.appendChild(tr);
    });
}

// Fetch and display scores for both game modes
fetchTopScores("FreePlay", "freeplay-scores");
fetchTopScores("Arcade", "arcade-scores");
