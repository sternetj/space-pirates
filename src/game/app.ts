import * as PIXI from "pixi.js";
import { GamePlay } from "./game-play";
import { Intro } from "./intro-screen";
import { Scene } from "./scene";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let ticker: (...params: any[]) => any;
app.newGame = () => {
  const gamePlay: Scene = new GamePlay();
  const intro = new Intro();

  app.stage.removeChildren();
  app.stage.addChild(...gamePlay.children);
  // app.stage.addChild(...intro.children)

  let gameOver = false;

  app.ticker.remove(ticker);
  ticker = delta => {
    if (gameOver) return;

    gamePlay.update();

    gameOver = gamePlay.goToNextScene();
    if (app.onGameOver && gameOver) {
      app.onGameOver();
    }
  }

  app.ticker.add(ticker);
}

export default app;
