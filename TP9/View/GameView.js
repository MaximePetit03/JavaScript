class GameViews {
  constructor(gameInstance) {
    this.timer = document.querySelector(".timer");
    this.div = document.querySelector(".stats");

    this.startTime = Date.now();
    this.playersAlive = document.querySelector("#playerAlive");

    this.game = gameInstance;
    this.canvas = document.querySelector("canvas");

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");

    this.img = new Image();
    this.img.onload = () => {
      this.render();
    };

    this.img.onerror = () => {
      console.error("Image introuvable !");
    };

    this.img.src = "View/fond.png";

    this.skins = {};
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  drawBackground() {
    this.ctx.drawImage(this.img, 0, 0, this.canvasWidth, this.canvasHeight);
  }

  render() {
    this.clear();
    this.drawBackground();

    const players = this.game.players;

    for (const id in players) {
      const player = players[id];

      console.log("Joueur à dessiner :", player);
      if (!player.isDead) {
        this.drawPlayer(player);
      }
    }
  }

  drawStats(player, x, y) {
    const barWidth = 40;
    const barHeight = 4;
    const gap = 6;
    const verticalOffset = 30; // Hauteur au-dessus du centre du perso

    //Barre de Vie
    const hpRatio = player.hp / player.maxHp;
    const hpX = x - barWidth / 2;
    const hpY = y - verticalOffset;

    // Fond de la barre
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.79)";
    this.ctx.fillRect(hpX, hpY, barWidth, barHeight);

    // Remplissage HP
    this.ctx.fillStyle = "#51ff00";
    this.ctx.fillRect(hpX, hpY, barWidth * hpRatio, barHeight);

    //Barre de Cooldown
    //Si attackCooldown est 0, on met le ratio à 1
    let cooldownRatio = 1;
    if (player.attackCooldown > 0) {
      cooldownRatio =
        (player.attackCooldown - player.currentAttackCooldown) /
        player.attackCooldown;
    }

    const coolDownY = hpY + barHeight + 2;

    //recharge du cooldown
    this.ctx.fillStyle = cooldownRatio >= 1 ? "#00ffd5" : "#d200c4";
    this.ctx.fillRect(hpX, coolDownY, barWidth * Math.min(cooldownRatio, 1), 2);

    //Pseudo
    this.ctx.fillStyle = "white";
    this.ctx.font = "bold";
    this.ctx.font = "20";
    this.ctx.textAlign = "center";

    const level = `${player.name} lvl ${player.lvl}`;
    this.ctx.fillText(level, x, hpY - 4);
  }

  stats() {
    const delaySeconds = Math.floor((Date.now() - this.startTime) / 1000);

    const minutes = Math.floor(delaySeconds / 60);
    const seconds = delaySeconds % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (this.timer) {
      this.timer.textContent = `Temps : ${timeString}`;
    }

    let aliveCount = 0;
    const players = this.game.players;
    for (const id in players) {
      if (!players[id].isDead) {
        aliveCount++;
      }
    }

    if (this.playersAlive) {
      this.playersAlive.textContent = `Joueurs en vie  ${aliveCount}`;
      this.div.style.marginRight = "250px";

      if (aliveCount === 1) {
        this.playersAlive.textContent = `Fin de la partie`;
        this.div.style.marginRight = "250px";
        this.playersAlive.style.textShadow = "0 0 10px #51ff00";
        this.playersAlive.style.color = "#51ff00";
      } else if (aliveCount === 0) {
        this.playersAlive.textContent = `Aucun joueur`;
        this.div.style.marginRight = "250px";
        this.playersAlive.style.color = "#00ffd5";
        this.playersAlive.style.textShadow = "0 0 10px #00ffd5";
      } else if (aliveCount > 1) {
        this.playersAlive.textContent = `Joueurs en vie ${aliveCount}`;
        this.div.style.marginRight = "250px";
      }
    }
  }

  displayClassment() {
    this.liste = document.querySelector("ul");

    this.liste.innerHTML = "";
    //On transforme l'objet des joueurs en un tableau pour pouvoir le manipuler
    const players = Object.values(this.game.players);

    //On trie les joueurs du niveau le plus élevé (b) jusqu'au plus petit (a)
    players.sort((a, b) => {
      if (a.isDead !== b.isDead) {
        return a.isDead ? 1 : -1;
      }
      // Si les deux ont le même état, il sont triés par niveau
      return b.lvl - a.lvl;
    });

    for (const id in players) {
      const player = players[id];

      const li = document.createElement("li");

      //On regarde si le joueur est mort ou vivant pour choisir quoi afficher
      const statut = player.isDead ? "mort" : "en vie";

      li.textContent = `${player.name} : Lvl ${player.lvl} est ${statut}`;

      this.liste.appendChild(li);
    }
  }

  drawPlayer(player) {
    let skinPath = player.skinPath;
    let spriteSpeciaux = [26, 29, 24, 21, 18, 13, 7];
    const skinMaudits = Number(skinPath.replace(/\D/g, ""));

    if (!skinPath.startsWith("./") && !skinPath.startsWith("http")) {
      skinPath = "./" + skinPath;
    }

    if (!this.skins[skinPath]) {
      this.skins[skinPath] = new Image();
      this.skins[skinPath].src = player.skinPath;
    }

    const spriteImg = this.skins[skinPath];

    if (!spriteImg.complete || spriteImg.naturalWidth === 0) {
      return;
    }

    const x = player.renderX * this.canvasWidth;
    const y = player.renderY * this.canvasHeight;

    player.animate();

    let spriteSize = 64;
    let spriteX = 0;
    let spriteY = 0;

    let trueDirection = player.direction;
    if (trueDirection === 1) {
      trueDirection = 3;
    } else if (trueDirection === 3) {
      trueDirection = 1;
    }
    //image à 128px
    if (
      player.isAttacking ||
      (player.attackSpriteIndex && player.attackSpriteIndex > 0)
    ) {
      if (spriteSpeciaux.includes(skinMaudits)) {
        spriteSize = 128;
      } else {
        spriteSize = 196;
      }
      const startY = 54 * 64;
      // On descend d'une ligne de 128px par direction
      spriteX = player.attackSpriteIndex * spriteSize;
      spriteY = startY + trueDirection * spriteSize;
    } else if (player.isWalking) {
      spriteSize = 64;

      // Index de départ pour la marche (Ligne 9 = index 8)
      const startRow = 8;

      spriteX = player.walkSpriteIndex * spriteSize;
      spriteY = (startRow + trueDirection) * spriteSize;
    } else {
      spriteX = player.walkSpriteIndex * spriteSize;
      spriteY = 2 * spriteSize;
    }

    this.ctx.drawImage(
      spriteImg,
      spriteX,
      spriteY,
      spriteSize,
      spriteSize, // Découpe du sprite
      x - spriteSize / 2,
      y - spriteSize / 2, // Position sur l'écran
      spriteSize,
      spriteSize, // Taille d'affichage
    );

    this.drawStats(player, x, y);
  }
}
