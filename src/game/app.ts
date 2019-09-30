import * as PIXI from "pixi.js";
import { GamePlay } from "./game-play-scene";
import { StartScreen } from "./start-screen";
import { MessageScreen } from "./message-screen";
import { Scene } from "./scene";

const app = new PIXI.Application() as any;

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
          new MessageScreen(
            `Yo ho ho!  Avast and whatnot.\nYe be helpin' me pirate... I mean,\npilot me ship through deep\nspace!\n\nSo hold onto yer booty and\ndodge these space rocks!`
          )
        ]
      : []),
    new GamePlay(),
    new MessageScreen("Yar! Good try matey!\n\nBetter luck next time!", "to play again")
  ];
  let currentScene = scenes.shift();
  let gameOver = false;

  app.ticker.remove(ticker);
  ticker = delta => {
    if (gameOver) return;

    if (!currentScene) {
      app.newGame();
      gameOver = true;
      return;
    }

    currentScene.update();

    const goToNext = currentScene.goToNextScene();
    if (goToNext) {
      currentScene.destroy();
      app.stage.removeChildren();
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
