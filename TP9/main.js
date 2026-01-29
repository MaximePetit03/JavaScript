import { Game } from "./Model/Game.js";
import { GameViews } from "./View/GameView.js";
import { GameController } from "./controller/GameController.js";

const game = new Game();

const gameView = new GameViews(game);

new GameController(game, gameView);
