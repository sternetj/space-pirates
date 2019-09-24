import * as PIXI from "pixi.js";
import { Ship } from "./ship";
import { Sky } from "./sky";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";
import { Rocks } from "./rocks";
import { Background } from "./background";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const ship = new Ship();
const background = new Background();
const sky = new Sky();
const sRocks = new SceneryRocks();
const spaceTrails = new SpaceTrails();
const rocks = new Rocks();

app.stage.addChild(...background.children);
app.stage.addChild(...sky.children);
app.stage.addChild(...sRocks.children);
app.stage.addChild(...spaceTrails.children);
app.stage.addChild(...ship.children);
app.stage.addChild(...rocks.children);

let gameOver = false;
app.ticker.add(delta => {
  if (gameOver) return;
  
  ship.update();
  sRocks.update();
  sky.update();
  spaceTrails.update();
  rocks.update();

  gameOver = ship.detectCollisions(rocks.children[0].children)
});

export default app;
