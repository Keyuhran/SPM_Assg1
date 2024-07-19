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

// Get the input field and button elements
const inputField = document.getElementById('input-name');
const enterButton = document.querySelector('.input-button');

function saveHighScoreToFirebase() {
  const highScoreInput = document.getElementById("input-name").value;
  const highScore = parseInt(highScoreInput); // Assuming the input is a numeric value

  if (!highScore) {
    alert("Please enter a valid high score.");
    return;
  }

  // Get the currently logged-in user
  const user = auth.currentUser;
  if (!user) {
    alert("No user is logged in.");
    return;
  }

  const uid = user.uid;

  // Create a new document in the 'highScores' collection
  const highScoreRef = collection(db, 'highScores', uid, 'scores');
  const highScoreDocId = `highScore_${highScoreInput}`; // Use a composite key for document ID

  // Save the high score
  setDoc(doc(highScoreRef, highScoreDocId), {
    score: highScore,
    timestamp: Date.now()
  })
    .then(() => {
      alert("High score saved successfully!");
      // Redirect to the main menu or another page
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Error saving high score: ", error);
      alert("Failed to save high score.");
    });
}

// Add event listeners to the Enter button and input field
enterButton.addEventListener('click', saveHighScoreToFirebase);
