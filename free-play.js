const buildings = ["Residential", "Road", "Industry", "Park", "Commercial"];
let choice;

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
        let rowHTML = `<div id="r${i}" class="flex justify-center w-70p h-5p"></div>`;
        board.insertAdjacentHTML("beforeend", rowHTML);
        for (let j = 1; j < rows + 1; j++) {
            let id = parseInt(j * 1) + parseInt((i - 1) * rows);
            let tileHTML = `<button id="${id}" class="w-4p bg-green m-5 rounded-5 border-0" onclick="getId(this.id)"></button>`;
            document.getElementById(`r${i}`).insertAdjacentHTML("beforeend", tileHTML);
        }
    }
}

function getId(id) {
    const tile = document.getElementById(id);
    if (id >= 1 && id <= rows) {
        rows += 10;
        drawBoard();
    } else if (id % rows == 0 || id % rows == 1) {
        rows += 10;
        drawBoard();
    } else if (id >= (rows - 1) * rows && id <= rows * rows) {
        rows += 10;
        drawBoard();
    }
}
drawBoard();

