class GameViews {
  constructor(gameInstance) {
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

  drawPlayer(player) {
    let skinPath = player.skinPath;

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

    if (
      player.isAttacking ||
      (player.attackSpriteIndex && player.attackSpriteIndex > 0)
    ) {
      // ATTAQUE (128px)
      spriteSize = 128;
      // On commence après 54 lignes de 64px
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
