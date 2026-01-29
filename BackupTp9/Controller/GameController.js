class GameController {
  constructor() {
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.lastServerUpdate = performance.now();

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    this.name = localStorage.getItem("name");
    this.serveurURL = localStorage.getItem("serveurUrl");
    this.spritePath = localStorage.getItem("spritePath");

    this.infos = new Game();
    this.gameView = new GameViews(this.infos);
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serveurURL);
    console.log("Connecté au serveur : ", this.serveurURL);
    this.initSocket();

    this.initInput();

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      this.lastServerUpdate = performance.now();
      // C'est ici que le lien se fait avec Game.js
      this.infos.update(data);
    };

    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
      this.startInputSender();
    };
  }

  // === Main render loop ===
  loop(timestamp) {
    this.gameView.stats();

    this.gameView.displayClassment();

    this.alpha = (timestamp - this.lastServerUpdate) / this.SERVER_INTERVAL;

    if (this.alpha > 1) this.alpha = 1;
    if (this.alpha < 0) this.alpha = 0;

    for (const id in this.infos.players) {
      const infoPlayer = this.infos.players[id];
      infoPlayer.interpolate(this.alpha);
    }

    if (this.gameView) {
      this.gameView.render();
    }
    // Request the next frame
    requestAnimationFrame(this.loop);
  }

  initInput() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "z") this.inputState.up = true;

      if (event.key === "s") this.inputState.down = true;

      if (event.key === "q") this.inputState.left = true;

      if (event.key === "d") this.inputState.right = true;

      if (event.key === "Enter") this.inputState.attack = true;
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "z") this.inputState.up = false;

      if (event.key === "s") this.inputState.down = false;

      if (event.key === "q") this.inputState.left = false;

      if (event.key === "d") this.inputState.right = false;

      if (event.key === "Enter") this.inputState.attack = false;
    });
  }

  //Envoie l'information si les touches sont préssées ou non
  startInputSender() {
    this.inputInterval = setInterval(() => {
      if (this.socket.readyState !== WebSocket.OPEN) {
        clearInterval(this.inputInterval);
        return;
      }

      const message = {
        type: "input",
        input: this.inputState,
      };

      this.socket.send(JSON.stringify(message));
    }, this.SERVER_INTERVAL);
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
new GameController();
//LANCER LE BACKEND : python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
