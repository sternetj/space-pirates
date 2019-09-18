import * as PIXI from "pixi.js";
import * as images from "../assets";
import { Ship } from "./ship";
import { Sky } from "./sky";

const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const ship = new Ship();
const sky = new Sky();

app.stage.addChild(...sky.children);
app.stage.addChild(...ship.children);

app.ticker.add(delta => {
  ship.update();
  sky.update();
});

export default app;

