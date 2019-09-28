import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { random } from "faker";
import { Scene } from "../scene";
import { Ship } from "./ship";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";
import { Rocks } from "./rocks";
import { background } from "../background";

export class GamePlay extends Scene {
  private ship = new Ship();
  private sRocks = new SceneryRocks();
  private spaceTrails = new SpaceTrails();
  private rocks = new Rocks();
  
  public children = background.children.concat(
    this.sRocks.children,
    this.spaceTrails.children,
    this.ship.children,
    this.rocks.children
  );

  public update() {
    this.ship.update();
    this.sRocks.update();
    this.spaceTrails.update();
    this.rocks.update();
    background.update();
  }

  public goToNextScene() {
    return this.ship.detectCollisions(this.rocks.children[0].children);
  }
}
