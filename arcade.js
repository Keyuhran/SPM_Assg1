const board = document.getElementById("board");

const buildings = ["Residential", "Road", "Industry", "Park", "Commercial"];
let selectedBuildings = [];
let built = {};
let turnCounter = 0;
let coins = 16;
let choice;
let gameType = "Arcade";


// Function to initialize the game state
function initializeGame(gameState) {
  if (gameState) {
      built = gameState.built || {};
      turnCounter = gameState.turnCounter || 0;
      coins = gameState.coins || 16;
      points = gameState.points || 0;

      // Restore selected buildings
      selectedBuildings = gameState.selectedBuildings || [];
      setupBuildingOptions();

      // Restore board state
      for (let i = 1; i <= 400; i++) {  // Assuming 400 tiles
          const tile = document.getElementById(i.toString());
          if (tile) {
              if (built[i]) {
                  const html = `<img src="./images/${built[i].toLowerCase()}-tiny.svg" />`;
                  tile.insertAdjacentHTML("afterbegin", html);
              }
          }
      }

      // Update coin display and score
      updateCoinDisplay();
      updateScoreDisplay();
  } else {
      setupBuildingOptions();  // Initialize building options for a new game
  }
}

// Function to setup building options (similar to your original setup code)
function setupBuildingOptions() {
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
          });
      } else {
          const building2 = document.getElementById("building2");
          const html = `<img src="./images/${selectedBuildings[1].toLowerCase()}.svg" />
                        <h1 class="text-center">${selectedBuildings[1]}</h1>`;
          building2.insertAdjacentHTML("afterbegin", html);
          building2.addEventListener("click", function() {
            choice = selectedBuildings[1];
          });
      }
  }
}

// Function to update the score display
function updateScoreDisplay() {
  score.innerHTML = `Your Score: ${points}`;
}

// Event handler to load saved game state
document.addEventListener('DOMContentLoaded', () => {
  const savedGameState = localStorage.getItem('gameState');
  if (savedGameState) {
      const gameState = JSON.parse(savedGameState);
      initializeGame(gameState);
      localStorage.removeItem('gameState');  // Clear the saved state
  } else {
      initializeGame();  // Initialize a new game if no saved state
  }
});

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
          coins += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          coins += 1;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          coins += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          coins += 1;
        }
      }
    } else if (type == "Commercial") {
      if (Object.keys(built).includes((tileId + 20).toString()) == true) {
        if (built[tileId + 20] == "Residential") {
          coins += 1;
        } else if (built[tileId + 20] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 20).toString()) == true) {
        if (built[tileId - 20] == "Residential") {
          coins += 1;
        } else if (built[tileId - 20] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId + 1).toString()) == true) {
        if (built[tileId + 1] == "Residential") {
          coins += 1;
        } else if (built[tileId + 1] == "Commercial") {
          tempPoints2 += 1;
        }
      }
      if (Object.keys(built).includes((tileId - 1).toString()) == true) {
        if (built[tileId - 1] == "Residential") {
          coins += 1;
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

  updateCoinDisplay();

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

function saveGame() {
  const gameState = {
    gameType,
    built,
    turnCounter,
    coins,
    points
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
  location.href = "./save-game.html";
}

const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveGame);

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

