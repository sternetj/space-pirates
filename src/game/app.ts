import * as PIXI from "pixi.js";
import { GamePlay } from "./game-play-scene";
import { Intro } from "./intro-screen";
import { Scene } from "./scene";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let ticker: (...params: any[]) => any;
let defaultScene: Scene = { children: [], update: () => undefined, goToNextScene: () => true };

app.newGame = (firstGame: boolean) => {
  const scenes: Scene[] = [defaultScene, ...(firstGame ? [new Intro()] : []), new GamePlay()];
  let currentScene = scenes.shift();
  let gameOver = false;

  app.ticker.remove(ticker);
  ticker = delta => {
    if (gameOver) return;

    if (!currentScene) {
      app.onGameOver();
      gameOver = true;
      return;
    }

    currentScene.update();

    const goToNext = currentScene.goToNextScene();
    if (goToNext) {
      app.stage.removeChildren();
      currentScene = scenes.shift();

      if (currentScene) {
        app.stage.addChild(...currentScene.children);
      }
    }
  };

  app.ticker.add(ticker);
};

export default app;
