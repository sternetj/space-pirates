import * as PIXI from "pixi.js";
import { Ship } from "./ship";
import { Sky } from "./sky";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";
import { Rocks } from "./rocks";
import { Background } from "./background";
import { Intro } from "./intro-screen";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let ticker: (...params: any[]) => any;
app.newGame = () => {
  const ship = new Ship();
  const background = new Background();
  const sky = new Sky();
  const sRocks = new SceneryRocks();
  const spaceTrails = new SpaceTrails();
  const rocks = new Rocks();
  const intro = new Intro();

  app.stage.removeChildren();
  app.stage.addChild(...background.children);
  app.stage.addChild(...sky.children);
  app.stage.addChild(...sRocks.children);
  app.stage.addChild(...spaceTrails.children);
  app.stage.addChild(...ship.children);
  app.stage.addChild(...rocks.children);
  // app.stage.addChild(...intro.children)

  let gameOver = false;

  app.ticker.remove(ticker);
  ticker = delta => {
    if (gameOver) return;

    ship.update();
    sRocks.update();
    sky.update();
    spaceTrails.update();
    rocks.update();

    gameOver = ship.detectCollisions(rocks.children[0].children);
    if (app.onGameOver && gameOver) {
      app.onGameOver();
    }
  }

  app.ticker.add(ticker);
}

export default app;
