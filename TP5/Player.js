var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(10, 100, 500, 400);
canvas.style.border = "2px solid black";
ctx.closePath();

class Player {
  constructor(id, name, skin) {
    this.id = id;
    this.name = name;
    this.skin = skin;

    this.renderX = position[0];
    this.renderY = position[1];

    //Stats
    this.hp = 100;
    this.hpMax = 100;
    this.speed = 50;
    this.level = 1;

    //Pas dans update()
    this.walkSpriteDuration = 10; // Vitesse de l'animation
    this.walkSpriteIndex = 0; // Sprite actuel
    this.walkSpriteNumber = 9;

    // Animation Attaque
    this.attackSpriteDuration = 10;
    this.attackSpriteIndex = 0;
    this.attackSpriteNumber = 6;

    // Animation Mort
    this.deathSpriteDuration = 10;
    this.deathSpriteIndex = 0;
    this.deathSpriteNumber = 6;

    this.idleSpriteIndex = 0;
    this.idleSpriteNumber = 2;

    this.isWalking = false;
    this.isAttacking = false;
    this.isDie = false;
    this.dead = false;

    this.currentWalkSpriteStep = 0;
    this.currentAttackSpriteStep = 0;
    this.currentDeathSpriteStep = 0;
    this.currentIdleSpriteStep = 0;
  }

  update(updateData) {
    [this.renderX, this.renderY] = updateData.position;

    this.name = updateData.name;
    this.hp = updateData.hp;
    this.hpMax = updateData.hpMax;
    this.attackCooldown = updateData.attackCooldown;
    this.currentAttackCooldown = updateData.currentAttackCooldown;
    this.speed = updateData.speed;
    this.level = updateData.level;

    this.isAttacking = updateData.isAttacking;
    this.isWalking = updateData.isWalking;
    this.isDying = updateData.isDying;
    this.skinPath = updateData.skinPath;
  }

  animate() {
    //The player is walking
    if (this.isWalking) {
      this.walkSpriteIndex = 0;
      this.currentWalkSpriteStep = 0;

      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
      //The player is attacking
    } else if (
      this.isAttacking ||
      this.currentAttackSpriteStep > 0 ||
      this.attackSpriteIndex > 0
    ) {
      this.currentAttackSpriteStep++;

      if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
        this.currentAttackSpriteStep = 0;
        this.attackSpriteIndex++;
      }
      if (this.attackSpriteIndex >= this.attackSpriteNumber) {
        this.attackSpriteIndex = 0;
      }
      //The player is die
    } else if (
      this.isDie ||
      this.currentDeathSpriteStep > 0 ||
      this.deathSpriteIndex > 0
    ) {
      this.currentDeathSpriteStep++;

      if (this.currentDeathSpriteStep >= this.deathSpriteDuration) {
        this.currentDeathSpriteStep = 0;
        this.deathSpriteIndex++;
      }

      if (this.currentDeathSpriteStep >= this.deathSpriteNumber) {
        this.dead = true;
      }
      //The player is idle
    } else {
      this.walkSpriteIndex = 0;
    }
  }
}
