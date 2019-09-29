import * as PIXI from "pixi.js";
import { GamePlay } from "./game-play-scene";
import { StartScreen } from "./start-screen";
import { IntroScreen } from "./intro-screen";
import { Scene } from "./scene";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let ticker: (...params: any[]) => any;
let defaultScene = new Scene();

app.newGame = (firstGame: boolean) => {
  const scenes: Scene[] = [
    defaultScene,
    ...(firstGame
      ? [
          new StartScreen(),
          new IntroScreen(
            "Need some goofy piratey text here\n\n\n\n\n\n\n\n"
              .split("")
              .concat("Press SPACE to continue...")
          )
        ]
      : []),
    new GamePlay(),
    new IntroScreen("Yar! Good try matey!\n\nBetter luck next time!".split(""))
  ];
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
      currentScene.destroy();
      currentScene = scenes.shift();

      if (currentScene) {
        app.stage.addChild(...currentScene.children);
        currentScene.mount();
      }
    }
  };

  app.ticker.add(ticker);
};

export default app;
