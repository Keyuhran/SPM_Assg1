const board = document.getElementById("board");

const buildings = ["Residential", "Road", "Industry", "Park", "Commercial"];
let selectedBuildings = [];
let built = {};
let turnCounter = 0;
let coins = 16;
let choice = "Residential";

for (let i = 0; i < 2; i++) {
    let random = Math.floor(Math.random() * (5 - i));
    selectedBuildings.push(buildings[random]);
    buildings.splice(random, 1);
    console.log(buildings);
    if (i == 0) {
        const building1 = document.getElementById("building1");
        const html = `<img src="./images/${selectedBuildings[0].toLowerCase()}.svg" />
                      <h1 class="text-center">${selectedBuildings[0]}</h1>`;
        building1.insertAdjacentHTML("afterbegin", html);
    } else {
        const building2 = document.getElementById("building2");
        const html = `<img src="./images/${selectedBuildings[1].toLowerCase()}.svg" />
                      <h1 class="text-center">${selectedBuildings[1]}</h1>`;
        building2.insertAdjacentHTML("afterbegin", html);
    }
}

console.log(selectedBuildings);

function getId(id) {
    const tile = document.getElementById(id);
    turnCounter++;
  
    // Check if the tile already has a building
    if (tile.childElementCount > 0) {
      const buildingType = built[id];
      tile.removeChild(tile.firstElementChild);
      delete built[id];
      coins -= 1;
      updateCoinDisplay()
    } else {
      // Check if it's the first building
      if (Object.keys(built).length === 0) {
        // Allow the first building to be placed anywhere
        if (coins >= getBuildingCost(choice)) {
          placeBuilding(tile, id);
        } else {
          alert("Not enough coins to place a building!");
        }
      } else {
        // Check if the tile is adjacent to an existing building
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
            alert("Not enough coins to place a building!");
          }
        } else {
          alert("You can only place buildings adjacent to existing ones.");
        }
      }
    }
  }

// Helper function to get adjacent tile IDs
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

// Helper function to place a building on a tile
function placeBuilding(tile, id) {
    const html = `<img src="./images/${choice.toLowerCase()}-tiny.svg" />`;
    tile.insertAdjacentHTML("afterbegin", html);
    built[id] = choice;
    coins -= getBuildingCost(choice); //deduct coins
    updateCoinDisplay(); //update coin display
}

// helper function to get the cost of a building
function getBuildingCost(buildingType) {
    // return the cost of the building based on its type
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
  
// helper function to update the coin display on the main page
function updateCoinDisplay() {
    const coinDisplay = document.getElementById("coin-display");
    coinDisplay.textContent = `Coins: ${coins}`;
  }

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

