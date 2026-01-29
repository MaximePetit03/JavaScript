import { Player } from "./Player.js";

export class Game {
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

    // Parcours tous les ids
    for (const playerId of id) {
      const playerData = gameStateFromServer.players[playerId];

      let fileName = playerData.skinPath.split("/").pop();

      // On reconstruit le chemin de façon stricte
      playerData.skinPath = "./assets/" + fileName;

      // Si le joueur existe, update les données du joueur
      if (this.players[playerId]) {
        this.players[playerId].update(playerData);
      } // Si il n'existe pas, crée le joueur
      else {
        this.players[playerId] = new Player(
          playerId,
          playerData.name,
          playerData.skinPath,
          playerData.position || [0.56, 0.17999999999999977],
        );
      }
    }
    // Parcours tous les ids des joueurs contenuent dans l'objet joueur
    for (const playerId of Object.keys(this.players)) {
      // Supprime le joueur si l'ensemble des Id n'a pas l'id du joueur
      if (!id.has(playerId)) {
        delete this.players[playerId];
      }
    }
  }
}
