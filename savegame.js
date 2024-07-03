function savegame() {
    location.href = "./load-game.html";
  }
  
  const savebutton = document.getElementById("savebutton");
  savebutton.addEventListener("click", savegame);