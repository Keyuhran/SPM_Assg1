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

// Function to fetch top 10 scores for a given game mode
async function fetchTopScores(mode, dateField, elementId) {
    try {
        const usersRef = collection(db, "users"); // Assuming user documents are in the "users" collection
        const querySnapshot = await getDocs(usersRef);

        const scores = [];
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData[mode] !== undefined) {
                scores.push({
                    name: userData.name || "Anonymous", // Handle missing names
                    score: userData[mode],
                    date: userData[dateField]
                });
            }
        });

        // Sort scores in descending order
        scores.sort((a, b) => b.score - a.score);

        // Get top 10 scores
        const topScores = scores.slice(0, 10);

        // Display scores on the page
        const scoreTableBody = document.getElementById(elementId);
        scoreTableBody.innerHTML = "";
        topScores.forEach((score, index) => {
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
    } catch (error) {
        console.error("Error fetching scores: ", error);
    }
}

// Fetch and display scores for both game modes
fetchTopScores("FreePlayHS", "freeplayDate", "freeplay-scores");
fetchTopScores("ArcadeHS", "arcadeDate", "arcade-scores");

function returnToMenu() {
    location.href = "./index.html";
}

const returnbtn = document.getElementById("returnbtn");
returnbtn.addEventListener("click", returnToMenu);