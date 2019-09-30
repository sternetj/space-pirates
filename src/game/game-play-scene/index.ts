import { Scene } from "../scene";
import { Ship } from "./ship";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";
import { Rocks } from "./rocks";
import { background } from "../background";
import { Score } from "./score";

export class GamePlay extends Scene {
  private ship = new Ship();
  private sRocks = new SceneryRocks();
  private spaceTrails = new SpaceTrails();
  private rocks = new Rocks();
  private score = new Score();

  public children = [
    background,
    ...this.sRocks.children,
    ...this.spaceTrails.children,
    ...this.ship.children,
    ...this.rocks.children,
    ...this.score.children
  ];

  public mount() {
    this.ship.mount();
  }

  public destroy() {
    this.ship.destroy();
  }

  public update() {
    this.ship.update();
    this.sRocks.update();
    this.spaceTrails.update();
    this.rocks.update();
    this.score.update();
    background.update();
  }

  public goToNextScene() {
    return this.ship.detectCollisions(this.rocks.children[0].children);
  }
}
