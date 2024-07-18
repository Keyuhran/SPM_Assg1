/* // Import the functions you need from the SDKs you need
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
const auth = getAuth(app); */

const board = document.getElementById("board");

const buildings = ["Residential", "Road", "Industry", "Park", "Commercial"];
let selectedBuildings = [];
let built = {};
let turnCounter = 0;
let coins = 16;
let choice;

/* // Authentication listener
auth.onAuthStateChanged(user => {
  if (user) {
      console.log("User is signed in:", user);
  } else {
      console.log("No user signed in");
      // Redirect to sign-in page or show sign-in UI
  }
});

// Function to save the game state
function saveGame() {
  const user = auth.currentUser;
  if (user) {
      const gameState = {
          built,
          turnCounter,
          coins,
          points
      };

      db.collection("games").doc(user.uid).set(gameState)
          .then(() => {
              console.log("Game state saved successfully!");
              alert("Game state saved successfully!");
          })
          .catch(error => {
              console.error("Error saving game state:", error);
              alert("Error saving game state: " + error.message);
          });
  } else {
      alert("No user signed in. Please sign in to save the game.");
  }
}

// Add event listener to Save Game button
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveGame);

// Function to load the game state
function loadGame() {
  const user = auth.currentUser;
  if (user) {
      db.collection("games").doc(user.uid).get()
          .then(doc => {
              if (doc.exists) {
                  const gameState = doc.data();
                  built = gameState.built;
                  turnCounter = gameState.turnCounter;
                  coins = gameState.coins;
                  points = gameState.points;
                  updateUI();
              } else {
                  console.log("No saved game state found.");
              }
          })
          .catch(error => {
              console.error("Error loading game state:", error);
              alert("Error loading game state: " + error.message);
          });
  }
}

// Function to update the UI based on the loaded game state
function updateUI() {
  // Update the coin display
  updateCoinDisplay();
  // Re-render the buildings on the board
  for (const id in built) {
      const tile = document.getElementById(id);
      const html = `<img src="./images/${built[id].toLowerCase()}-tiny.svg" />`;
      tile.innerHTML = html;
  }
  // Update the score display
  calculateScore();
} */


for (let i = 0; i < 2; i++) {
    let random = Math.floor(Math.random() * (5 - i));
    selectedBuildings.push(buildings[random]);
    buildings.splice(random, 1);
    if (i == 0) {
        const building1 = document.getElementById("building1");
        const html = `<img src="./images/${selectedBuildings[0].toLowerCase()}.svg" />
                      <h1 class="text-center">${selectedBuildings[0]}</h1>`;
        building1.insertAdjacentHTML("afterbegin", html);
        building1.addEventListener("click", function() {
          choice = selectedBuildings[0];
        })
    } else {
        const building2 = document.getElementById("building2");
        const html = `<img src="./images/${selectedBuildings[1].toLowerCase()}.svg" />
                      <h1 class="text-center">${selectedBuildings[1]}</h1>`;
        building2.insertAdjacentHTML("afterbegin", html);
        building2.addEventListener("click", function() {
          choice = selectedBuildings[1];
        })
    }
}

function getId(id) {
  const tile = document.getElementById(id);
  turnCounter++;

  
  if (tile.childElementCount > 0) {
    const buildingType = built[id];
    if (coins >= 1) {  
      tile.removeChild(tile.firstElementChild);
      delete built[id];
      coins -= 1;
      updateCoinDisplay();
    } else {
      setTimeout(() => {
        location.href = "./end-screen(a).html";
      }, 1000);
    }
  } else {
    
    if (Object.keys(built).length === 0) {
      
      if (coins >= getBuildingCost(choice)) {
        placeBuilding(tile, id);
      } else {
        setTimeout(() => {
          location.href = "./end-screen(a).html";
        }, 1000);
      }
    } else {
      
      const adjacentTiles = getAdjacentTiles(id);
      let adjacentBuilding = false;
      for (const adjTileId of adjacentTiles) {
        if (built[adjTileId]) {
          adjacentBuilding = true;
          break;
        }
      }
      if (adjacentBuilding) {
        if (coins >= getBuildingCost(choice)) {
          placeBuilding(tile, id);
        } else {
          setTimeout(() => {
            location.href = "./end-screen(a).html";
          }, 1000);
        }
      } else {
        alert("You can only place buildings adjacent to existing ones.");
      }
    }
  }
}


function getAdjacentTiles(id) {
    const numericId = parseInt(id, 10);
    const row = Math.floor((numericId - 1) / 20);
    const col = (numericId - 1) % 20;
    const adjacentTiles = [];

    // Check top
    if (row > 0) adjacentTiles.push(numericId - 20);
    // Check bottom
    if (row < 19) adjacentTiles.push(numericId + 20);
    // Check left
    if (col > 0) adjacentTiles.push(numericId - 1);
    // Check right
    if (col < 19) adjacentTiles.push(numericId + 1);

    return adjacentTiles;
}


function placeBuilding(tile, id) {
  const cost = getBuildingCost(choice);

  if (coins >= cost) {  
    const html = `<img src="./images/${choice.toLowerCase()}-tiny.svg" />`;
    tile.insertAdjacentHTML("afterbegin", html);
    built[id] = choice;
    coins -= cost;  
    updateCoinDisplay();
    calculateScore();
  } else {
    alert("Not enough coins to place a building!");
  }
}


function getBuildingCost(buildingType) {
    
    switch (buildingType) {
        case "Residential":
            return 1;
        case "Road":
            return 1;
        case "Industry":
            return 1;
        case "Park":
            return 1;
        case "Commercial":
            return 1;
        default:
            return 0;
    }
  }

var points = 0;
const score = document.getElementById("score");
function calculateScore() {
  let tempPoints = 0;
  for (let i = 0; i < Object.keys(built).length; i++) {
    let tempPoints2 = 0;
    let tileId = parseInt(Object.keys(built)[i]);
    let type = Object.values(built)[i]
    if (type == "Residential") {
      if (Object.keys(built).includes((tileId + 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId + 20] == "Commercial") {
          tempPoints2 += 1;
        } else if (built[tileId + 20] == "Park") {
          tempPoints2 += 2;
        } else if (built[tileId + 20] == "Industry") {
          tempPoints2 += 1;
          tempPoints += tempPoints2;
          continue;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId - 20] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId - 20] == "Commercial") {
          tempPoints2 += 1;
        } else if (built[tileId - 20] == "Park") {
          tempPoints2 += 2;
        } else if (built[tileId - 20] == "Industry") {
          tempPoints2 += 1;
          tempPoints += tempPoints2;
          continue;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 1] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId + 1] == "Commercial") {
          tempPoints2 += 1;
        } else if (built[tileId + 1] == "Park") {
          tempPoints2 += 2;
        } else if (built[tileId + 1] == "Industry") {
          tempPoints2 += 1;
          tempPoints += tempPoints2;
          continue;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId - 1] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId - 1] == "Commercial") {
          tempPoints2 += 1;
        } else if (built[tileId - 1] == "Park") {
          tempPoints2 += 2;
        } else if (built[tileId - 1] == "Industry") {
          tempPoints2 += 1;
          tempPoints += tempPoints2;
          continue;
        }
      }
    } else if (type == "Industry") {
      tempPoints2 += Object.values(built).filter(x => x == "Industry").length;
      if (Object.keys(built).includes((tileId + 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        }
      }
    } else if (type == "Commercial") {
      if (Object.keys(built).includes((tileId + 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId + 20] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId - 20] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId - 20] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 1] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId + 1] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId - 1] == "Residential") {
          tempPoints2 += 1;
        } else if (built[tileId - 1] == "Commercial") {
          tempPoints2 += 1;
        }
      }
    } else if (type == "Park") {
      if (Object.keys(built).includes((tileId + 20).toString()) == true) {
        if (built[tileId + 20] == "Park") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId - 20] == "Park") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 1] == "Park") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId - 1] == "Park") {
          tempPoints2 += 1;
        }
      }
    } else if (type == "Road") {
      tempPoints2 += 1;
      for (let i = 0; i < 20; i++) {
        if (Object.keys(built).includes((tileId + i + 1).toString()) == true) {
          if (built[tileId + 1] == "Road") {
            tempPoints2 += 1;
          }
        }

        if (Object.keys(built).includes((tileId - i - 1).toString()) == true) {
          if (built[tileId - 1] == "Road") {
            tempPoints2 += 1;
          }
        }
      }
    }
    tempPoints += tempPoints2;
  }
  points += tempPoints;


  score.innerHTML = `Your Score: ` + points + ``; 

  


  if (coins == 0) {
    localStorage.setItem("finalScore", points);
    setTimeout(() => {
      location.href = "./end-screen(a).html?score=" + points;
    }, 1000);
  }
}
  
// helper function to update the coin display on the main page
function updateCoinDisplay() {
  const coinDisplay = document.getElementById("coin-display");
  coinDisplay.textContent = `Coins: ${coins}`;
}

function exitGame() {
  location.href = "./index.html";
}

const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", exitGame);

for (let i = 1; i < 21; i++) {
    const tileHTML1 = `<button id="` + i * 1 + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r1").insertAdjacentHTML("beforeend", tileHTML1);

    const tileHTML2 = `<button id="` + (i * 1 + 20) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r2").insertAdjacentHTML("beforeend", tileHTML2);

    const tileHTML3 = `<button id="` + (i * 1 + 40) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r3").insertAdjacentHTML("beforeend", tileHTML3);

    const tileHTML4 = `<button id="` + (i * 1 + 60) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r4").insertAdjacentHTML("beforeend", tileHTML4);

    const tileHTML5 = `<button id="` + (i * 1 + 80) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r5").insertAdjacentHTML("beforeend", tileHTML5);

    const tileHTML6 = `<button id="` + (i * 1 + 100) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r6").insertAdjacentHTML("beforeend", tileHTML6);

    const tileHTML7 = `<button id="` + (i * 1 + 120) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r7").insertAdjacentHTML("beforeend", tileHTML7);

    const tileHTML8 = `<button id="` + (i * 1 + 140) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r8").insertAdjacentHTML("beforeend", tileHTML8);

    const tileHTML9 = `<button id="` + (i * 1 + 160) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r9").insertAdjacentHTML("beforeend", tileHTML9);

    const tileHTML10 = `<button id="` + (i * 1 + 180) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r10").insertAdjacentHTML("beforeend", tileHTML10);

    const tileHTML11 = `<button id="` + (i * 1 + 200) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r11").insertAdjacentHTML("beforeend", tileHTML11);

    const tileHTML12 = `<button id="` + (i * 1 + 220) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r12").insertAdjacentHTML("beforeend", tileHTML12);

    const tileHTML13 = `<button id="` + (i * 1 + 240) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r13").insertAdjacentHTML("beforeend", tileHTML13);

    const tileHTML14 = `<button id="` + (i * 1 + 260) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r14").insertAdjacentHTML("beforeend", tileHTML14);

    const tileHTML15 = `<button id="` + (i * 1 + 280) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r15").insertAdjacentHTML("beforeend", tileHTML15);

    const tileHTML16 = `<button id="` + (i * 1 + 300) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r16").insertAdjacentHTML("beforeend", tileHTML16);

    const tileHTML17 = `<button id="` + (i * 1 + 320) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r17").insertAdjacentHTML("beforeend", tileHTML17);

    const tileHTML18 = `<button id="` + (i * 1 + 340) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r18").insertAdjacentHTML("beforeend", tileHTML18);

    const tileHTML19 = `<button id="` + (i * 1 + 360) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r19").insertAdjacentHTML("beforeend", tileHTML19);

    const tileHTML20 = `<button id="` + (i * 1 + 380) + `" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
    document.getElementById("r20").insertAdjacentHTML("beforeend", tileHTML20);
} 

