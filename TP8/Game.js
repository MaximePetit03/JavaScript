// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./assets/3.png",
      position: [0.5600000000000003, 0.17999999999999977],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 3,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
    "28ead291-fcea-4b41-a596-d3c876c49a53": {
      name: "bloublou",
      skinPath: "./assets/4.png",
      position: [0.44, 0.19],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 0,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

class Game {
  constructor() {
    this.timer = 0;
    this.players = {};
    this.isRunning = false;
    this.isOver = false;
  }

  update(gameStateFromServer) {
    this.timer = gameStateFromServer.timer;

    // Set assemble toutes les clés
    const id = new Set(Object.keys(gameStateFromServer.players));

    // Parcours tous les id
    for (const playersId of id) {
      const playersData = gameStateFromServer.players[playersId];

      //Si le joueur existe, update les données du joueur
      if (this.players[playersId]) {
        this.players[playersId].update(playersData);
        //Sinon crée un nouveau joueur
      } else {
        this.players[playersId] = new Player(
          playersId,
          playersData.name,
          playersData.skinPath,
          playersData.position,
        );
      }
    }
    //Parcours tous les id des joueurs contenuent dans l'objet joueur
    for (const playerId of Object.keys(this.players)) {
      //Supprime le joueur si l'ensemble des id ne correspondent pas l'id du joueur
      if (!id.has(playerId)) {
        delete this.players[playerId];
      }
    }

    // for (let key in gameStateFromServer) {
    //   if (gameStateFromServer.players) {
    //     let p1 = new Player();
    //     p1.update(key);
    //     console.log(p1);
    //   }

    //   if () {
    //     for (let id in gameStateFromServer.players) {
    //       delete this.players[id];
    //     }
    //   } else {
    //     for (let id in gameStateFromServer.players) {
    //       for (let values in gameStateFromServer.players[id]) {
    //         gameStateFromServer.players[id].update(values);
    //       }
    //     }
    //   }
  }
}
