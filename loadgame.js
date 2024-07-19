import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';
import { getFirestore, collection, getDocs, getDoc, doc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

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

function loadSavedGames() {
    const user = auth.currentUser;
    if (!user) {
        alert("No user is logged in.");
        return;
    }

    const uid = user.uid;
    const saveGameRef = collection(db, 'savegame', uid, 'savedGames');

    getDocs(saveGameRef).then(querySnapshot => {
        const savedGames = [];
        querySnapshot.forEach(doc => {
            const data = doc.data();
            data.id = doc.id;  // Add the document ID to the data
            savedGames.push(data);
        });

        displaySavedGames(savedGames);
    }).catch(error => {
        console.error("Error fetching saved games: ", error);
        alert("Failed to load saved games.");
    });
}

function displaySavedGames(savedGames) {
    const saveList = document.querySelector('.save-list');
    saveList.innerHTML = '';

    savedGames.forEach(game => {
        const gameType = game.gameType || 'Unknown';
        const saveName = game.id.split('_')[1]; // Extract save name from the composite key

        const saveItem = document.createElement('div');
        saveItem.classList.add('save-item');

        const saveType = document.createElement('div');
        saveType.classList.add('save-type');
        saveType.textContent = gameType;

        const saveNameDiv = document.createElement('div');
        saveNameDiv.classList.add('save-name');
        saveNameDiv.textContent = saveName;

        const loadButton = document.createElement('button');
        loadButton.classList.add('btn', 'load');
        loadButton.textContent = 'LOAD';
        loadButton.addEventListener('click', () => loadGame(game.id));

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'edit');
        editButton.textContent = 'EDIT';
        editButton.addEventListener('click', () => editGameName(game.id, game));

        saveItem.appendChild(saveType);
        saveItem.appendChild(saveNameDiv);
        saveItem.appendChild(loadButton);
        saveItem.appendChild(editButton);

        saveList.appendChild(saveItem);
    });
}

function loadGame(saveId) {
    const user = auth.currentUser;
    if (!user) {
        alert("No user is logged in.");
        return;
    }

    const uid = user.uid;
    const saveGameRef = doc(db, 'savegame', uid, 'savedGames', saveId);

    getDoc(saveGameRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
            const gameData = docSnapshot.data();
            
            // Store the game state in localStorage
            localStorage.setItem('savedGameState', JSON.stringify(gameData));

            // Redirect based on the game type
            const gameType = gameData.gameType || 'Unknown';
            if (gameType === 'Arcade') {
                window.location.href = "arcade.html";
            } else if (gameType === 'Freeplay') {
                window.location.href = "free-play.html";
            } else {
                alert("Unknown game type.");
            }
        } else {
            alert("No saved game found.");
        }
    }).catch(error => {
        console.error("Error loading game: ", error);
        alert("Failed to load game.");
    });
}


function editGameName(oldSaveId, gameData) {
    const newSaveName = prompt('Enter new save name:', oldSaveId.split('_')[1]); // Extract old save name
    const gameType = gameData.type || 'Unknown';

    if (newSaveName && newSaveName !== oldSaveId.split('_')[1]) {
        const user = auth.currentUser;
        if (!user) {
            alert("No user is logged in.");
            return;
        }

        const uid = user.uid;
        const saveGameRef = collection(db, 'savegame', uid, 'savedGames');

        const newSaveId = `${gameType}_${newSaveName}`;

        setDoc(doc(saveGameRef, newSaveId), gameData)
            .then(() => {
                return deleteDoc(doc(saveGameRef, oldSaveId));
            })
            .then(() => {
                alert("Save name updated successfully!");
                loadSavedGames();
            })
            .catch(error => {
                console.error("Error updating save name: ", error);
                alert("Failed to update save name.");
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadSavedGames();
        } else {
            console.log("No user is signed in.");
            // Redirect to login page or show a login form
            window.location.href = "loginpage.html";
        }
    });
});
