import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { getFirestore, doc, setDoc, collection } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

// Firebase configuration
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
const auth = getAuth();
const db = getFirestore(app);

function saveGameToFirebase() {
    const saveName = document.getElementById("save-name").value;
    if (!saveName) {
        alert("Please enter a name for your save game.");
        return;
    }

    // Get the game state from localStorage
    const gameState = JSON.parse(localStorage.getItem("gameState"));
    if (!gameState) {
        alert("No game state found.");
        return;
    }

    // Get the currently logged-in user
    const user = auth.currentUser;
    if (!user) {
        alert("No user is logged in.");
        return;
    }

    const uid = user.uid;

    // Reference to the user's savegames collection
    const saveGameRef = collection(db, 'savegame', uid, 'savedGames');

    // Save the game state
    setDoc(doc(saveGameRef, saveName), gameState)
        .then(() => {
            alert("Game saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving game: ", error);
            alert("Failed to save game.");
        });
}

document.getElementById("savebutton").addEventListener("click", saveGameToFirebase);

// Ensure the user is authenticated before allowing to save the game
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in: ", user.uid);
    } else {
        console.log("No user is signed in.");
        // Redirect to login page or show a login form
        window.location.href = "login.html";
    }
});
