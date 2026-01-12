class Player {
  constructor(id, name, skin, positionX, positionY) {
    this.id = id;
    this.name = name;
    this.skin = skin;
    this.positionX = positionX;
    this.positioY = positionY;
    this.hpMax = hpMax;
    this.damage = damage;
    this.heal = heal;
    this.cooldown = cooldown;
    this.speed = speed;
    this.level = level;
  }

  update(updateData) {
    this.positionX = updateData.positionX;
    this.positionY = updateData.positioY;
    this.hpMax = updateData.hpMax;
    this.damage = updateData.damage;
    this.heal = updateData.heal;
    this.cooldown = updateData.cooldown;
    this.speed = updateData.speed;
    this.level = updateData.level;
  }
}

let p1 = new Player(1, "poyo", "jsp", 100, 101);

console.log(p1.id);
