const buildings = ["Residential", "Road", "Industry", "Park", "Commercial"];
let choice;
let built = {};
let coins = Infinity;
let profit = 0;
let upkeep = 0;
let lossCounter = 0;
let expansionCount = 0;
let gameType = "Freeplay";

const building1 = document.getElementById("building1");
const html1 = `<img src="./images/residential.svg" />
                <h1 class="text-center">Residential</h1>`;
building1.insertAdjacentHTML("afterbegin", html1);
building1.addEventListener("click", function() {
    choice = "Residential";
})

const building2 = document.getElementById("building2");
const html2 = `<img src="./images/road.svg" />
                <h1 class="text-center">Road</h1>`;
building2.insertAdjacentHTML("afterbegin", html2);
building2.addEventListener("click", function() {
    choice = "Road";
})

const building3 = document.getElementById("building3");
const html3 = `<img src="./images/industry.svg" />
                <h1 class="text-center">Industry</h1>`;
building3.insertAdjacentHTML("afterbegin", html3);
building3.addEventListener("click", function() {
    choice = "Industry";
})

const building4 = document.getElementById("building4");
const html4 = `<img src="./images/park.svg" />
                <h1 class="text-center">Park</h1>`;
building4.insertAdjacentHTML("afterbegin", html4);
building4.addEventListener("click", function() {
    choice = "Park";
})

const building5 = document.getElementById("building5");
const html5 = `<img src="./images/commercial.svg" />
                <h1 class="text-center">Commercial</h1>`;
building5.insertAdjacentHTML("afterbegin", html5);
building5.addEventListener("click", function() {
    choice = "Commercial";
})

let rows = 5;

const board = document.getElementById("board");

function drawBoard() {
    board.innerHTML = ``;
    for (let i = 1; i < rows + 1; i++) {
        let rowHTML = `<div id="r${i}" class="flex justify-center w-100p h-5p"></div>`;
        board.insertAdjacentHTML("beforeend", rowHTML);
        for (let j = 1; j < rows + 1; j++) {
            let id = parseInt(j * 1) + parseInt((i - 1) * rows);
            let tileHTML = `<button id="${id}" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
            document.getElementById(`r${i}`).insertAdjacentHTML("beforeend", tileHTML);
        }
    }

    for (let i = 0; 0 < Object.keys(built).length; i++) {
        document.getElementById(Object.keys(built)[i]).innerHTML = `<img src="./images/${Object.values(built)[i]}-tiny.svg" />`;
    }
}

// Load game state from localStorage if available
document.addEventListener('DOMContentLoaded', () => {
  const savedGameState = localStorage.getItem('savedGameState');
  if (savedGameState) {
      const gameData = JSON.parse(savedGameState);
      built = gameData.built || {};
      coins = gameData.coins || Infinity;
      profit = gameData.profit || 0;
      upkeep = gameData.upkeep || 0;
      lossCounter = gameData.lossCounter || 0;
      rows = gameData.rows || 5; // Ensure rows is set appropriately

      drawBoard();
      updateCoinDisplay();
      updateProfitDisplay();
      updateUpkeepDisplay();
      calculateScore();
  } else {
      drawBoard();
      updateCoinDisplay();
      updateProfitDisplay();
      updateUpkeepDisplay();
      calculateScore();
  }
});

function getId(id) {
    const tile = document.getElementById(id);
    if (tile.childElementCount > 0) {
        tile.removeChild(tile.firstElementChild);
        delete built[id];
        coins -= 1;
        updateCoinDisplay();
    } else {
        tile.innerHTML = `<img src="./images/${choice.toLowerCase()}-tiny.svg" />`;
        built[id] = choice;
        coins -= 1; //deduct a coin
        updateCoinDisplay();
        console.log(built);
    }

    if (expansionCount < 2) {
      if (id >= 1 && id <= rows) {
          rows += 10;
          let newBuilt = {};
          for (let i = 0; i < Object.keys(built).length; i++) {
              let newId = (Math.floor(Object.keys(built)[i] / (rows - 10)) + 5) * rows + 5 + (Object.keys(built)[i] % (rows - 10));
              newBuilt[newId] = Object.values(built)[i];
          }
          built = newBuilt;
          expansionCount++;
          drawBoard();
      } else if (id % rows == 0) {
          rows += 10;
          let newBuilt = {};
          for (let i = 0; i < Object.keys(built).length; i++) {
              if (Object.keys(built)[i] % (rows - 10) == 0) {
                  let newId = (Math.floor((Object.keys(built)[i] - 1) / (rows - 10)) + 5) * rows + 5 + ((Object.keys(built)[i] - 1) % (rows - 10)) + 1;
                  newBuilt[newId] = Object.values(built)[i];
              } else {
                  let newId = (Math.floor(Object.keys(built)[i] / (rows - 10)) + 5) * rows + 5 + (Object.keys(built)[i] % (rows - 10));
                  newBuilt[newId] = Object.values(built)[i];
              }
          }
          built = newBuilt;
          expansionCount++;
          drawBoard();
      } else if (id % rows == 1) {
          rows += 10;
          let newBuilt = {};
          for (let i = 0; i < Object.keys(built).length; i++) {
              let newId = (Math.floor(Object.keys(built)[i] / (rows - 10)) + 5) * rows + 5 + (Object.keys(built)[i] % (rows - 10));
              newBuilt[newId] = Object.values(built)[i];
          }
          built = newBuilt;
          expansionCount++;
          drawBoard();
      } else if (id >= (rows - 1) * rows && id <= rows * rows) {
          rows += 10;
          let newBuilt = {};
          for (let i = 0; i < Object.keys(built).length; i++) {
              let newId = (Math.floor(Object.keys(built)[i] / (rows - 10)) + 5) * rows + 5 + (Object.keys(built)[i] % (rows - 10));
              newBuilt[newId] = Object.values(built)[i];
          }
          built = newBuilt;
          expansionCount++;
          drawBoard();
      }
    } else {
      drawBoard();
    }
    updateProfitDisplay();
    updateUpkeepDisplay();
    calculateScore();
    if (upkeep > profit) {
      lossCounter++;
    } else {
      lossCounter = 0;
    }

    if (lossCounter >= 20) {
      localStorage.setItem("finalScore", points);
      location.href = "./end-screen(fp).html";

    }
}

function updateCoinDisplay() {
    const coinDisplay = document.getElementById("coin-display");
    coinDisplay.textContent = `Coins: ${coins}`;
}

function updateProfitDisplay() {
    const profitDisplay = document.getElementById("profit-display");
    for (let i = 0; i < Object.keys(built).length; i++) {
      const buildingId = Object.keys(built)[i];
      const buildingType = built[buildingId];
      switch (buildingType) {
        case "Residential":
          profit += 1;
          break;
        case "Industry":
          profit += 2;
          break;
        case "Commercial":
          profit += 3;
          break;
        default:
          profit += 0;
      }
    }
    profitDisplay.textContent = `Profit: ${profit}`;
}

function updateUpkeepDisplay() {
    const upkeepDisplay = document.getElementById("upkeep-display");
    for (let i = 0; i < Object.keys(built).length; i++) {
        const buildingId = Object.keys(built)[i];
        const buildingType = built[buildingId];
        switch (buildingType) {
            case "Residential":
                if (built[Object.keys(built)[i-1]] == "Residential"|| built[Object.keys(built)[i+1]] == "Residential") {
                    upkeep += 1;
                }
                break;
            case "Industry":
                upkeep += 1;
                break;
            case "Commercial":
                upkeep += 2;
                break;
            case "Park":
                upkeep += 1;
                break;
            case "Road":
                let isConnected = false;
                if (i > 0 && built[Object.keys(built)[i-1]] != undefined) {
                    isConnected = true;
                }
                if (i < Object.keys(built).length - 1 && built[Object.keys(built)[i+1]] != undefined) {
                    isConnected = true;
                }
                if (!isConnected) {
                    upkeep += 1;
                }
                break;
        }
    }
    upkeepDisplay.textContent = `Upkeep: ${upkeep}`;
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
  console.log(points);


  if (coins == 0) {
    setTimeout(() => {
      location.href = "./end-screen(fp).html";
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

function saveGame() {
  const gameState = {
    gameType,
    built,
    lossCounter,
    profit,
    upkeep,
    points
  };
  localStorage.setItem("gameState", JSON.stringify(gameState));
  location.href = "./save-game.html";
}
  
const exitButton = document.getElementById("exitButton");
exitButton.addEventListener("click", exitGame);
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", saveGame);

