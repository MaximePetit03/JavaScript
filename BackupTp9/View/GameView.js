class GameViews {
  constructor(infos) {
    this.timer = document.querySelector(".timer");
    this.div = document.querySelector(".stats");

    this.startTime = Date.now();
    this.playersAlive = document.querySelector("#playerAlive");

    this.game = infos;
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

    //Recharge du cooldown
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
    const allPlayers = Object.values(this.game.players);

    // On filtre les survivants en utilisant isDying
    const survivants = allPlayers.filter((player) => !player.isDying);
    aliveCount = survivants.length;

    if (this.playersAlive) {
      // Reset du style par défaut
      this.playersAlive.style.textShadow = "0 0 10px #00ffd5";
      this.playersAlive.style.color = "#00ffd5";
      this.div.style.marginRight = "250px";

      if (aliveCount === 1) {
        // VICTOIRE (Exactement 1 survivant)
        const gagnant = survivants[0];
        this.playersAlive.textContent = `Victoire pour ${gagnant.name}`;
        this.playersAlive.style.textShadow = "0 0 10px #51ff00";
        this.playersAlive.style.color = "#51ff00";
      } else if (aliveCount === 0) {
        this.playersAlive.textContent = `Aucun joueur en vie`;
        this.div.style.marginLeft = "80px";
      } else {
        this.playersAlive.textContent = `Joueurs en vie : ${aliveCount}`;
      }
    }
  }

  displayClassment() {
    this.liste = document.querySelector("ul");

    this.liste.innerHTML = "";
    //Transforme l'objet des joueurs en un tableau pour pouvoir le manipuler
    const players = Object.values(this.game.players);

    players.sort((a, b) => {
      //vivants au-dessus des morts
      if (a.isDying !== b.isDying) {
        return a.isDying ? 1 : -1;
      }

      //Si les deux sont morts => tri par temps de survie
      if (a.isDying) {
        return (b.deathTime || 0) - (a.deathTime || 0);
      }

      return b.lvl - a.lvl;
    });

    for (const player of players) {
      const li = document.createElement("li");
      let statut;
      let deathMoment;

      if (player.isDying) {
        if (!player.deathTime) {
          player.deathTime = Date.now();
        }
        deathMoment = player.deathTime;
        statut = "mort";
      } else {
        deathMoment = Date.now();
        statut = "en vie";
      }

      const totalSecondes = Math.floor((deathMoment - this.startTime) / 1000);
      const mins = Math.floor(totalSecondes / 60);
      const secs = (totalSecondes % 60).toString().padStart(2, "0");
      const tempsSurvie = `${mins}:${secs}`;

      if (player.isDying) {
        li.textContent = `${player.name} : Lvl ${player.lvl} - ${statut} - ${tempsSurvie}`;
        li.style.color = "red";
      } else {
        li.textContent = `${player.name} : Lvl ${player.lvl} - ${statut}`;
      }

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
        //Découpe du sprite
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
      spriteSize,
      x - spriteSize / 2,
      y - spriteSize / 2, //Position sur l'écran
      spriteSize,
      spriteSize, //Taille d'affichage
    );

    this.drawStats(player, x, y);
  }
}
