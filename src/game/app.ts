import * as PIXI from "pixi.js";
import { Ship } from "./ship";
import { Sky } from "./sky";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";

import SoundPlayer from "./sound-player";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const ship = new Ship();
const sky = new Sky();
const rocks = new SceneryRocks();
const spaceTrails = new SpaceTrails();

app.stage.addChild(...sky.children);
app.stage.addChild(...rocks.children);
app.stage.addChild(...spaceTrails.children);
app.stage.addChild(...ship.children);

SoundPlayer.ship.play({ loop: true, volume: 0.3 });

app.ticker.add(delta => {
  ship.update();
  rocks.update();
  sky.update();
  spaceTrails.update();
});

export default app;
