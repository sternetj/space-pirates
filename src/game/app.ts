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
let currentScene = new Intro();
app.stage.addChild(...currentScene.children);

app.newGame = () => {
  const scenes: Scene[] = [new GamePlay()];

  let gameOver = false;

  app.ticker.remove(ticker);
  ticker = delta => {
    if (gameOver) return;
    if (!currentScene) {
      currentScene = scenes.shift();
    }

    currentScene.update();

    const goToNext = currentScene.goToNextScene();
    if (goToNext) {
      app.stage.removeChildren();
      currentScene = scenes.shift();

      if (!currentScene) {
        app.onGameOver();
        gameOver = true;
      } else {
        app.stage.addChild(...currentScene.children);
      }
    }
  };

  app.ticker.add(ticker);
};

export default app;
