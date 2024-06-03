const board = document.getElementById("board");


function getId(id) {
    console.log(id);
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