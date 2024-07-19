document.addEventListener("DOMContentLoaded", function() {
    function goToArcade() {
        window.location.href = "./arcade.html";
    }

    function goToFreePlay() {
        window.location.href = "./free-play.html";
    }

    function goToLeaderboard() {
        window.location.href = "./leaderboard.html";
    }

    function goToMainMenu() {
        window.location.href = "./index.html";
    }

    function exit() {
        window.close();
    }

    // Safely add event listeners if elements exist
    const arcade = document.getElementById("esArcade");
    if (arcade) {
        arcade.addEventListener("click", goToArcade);
    }

    const freeplay = document.getElementById("esFreeplay");
    if (freeplay) {
        freeplay.addEventListener("click", goToFreePlay);
    }

    const leaderboard = document.getElementById("esLeaderboard");
    if (leaderboard) {
        leaderboard.addEventListener("click", goToLeaderboard);
    }

    const mainMenu = document.getElementById("esMainMenu");
    if (mainMenu) {
        mainMenu.addEventListener("click", goToMainMenu);
    }

    const exitpage = document.getElementById("esExit");
    if (exitpage) {
        exitpage.addEventListener("click", exit);
    }
});
