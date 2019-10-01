import { Scene } from "../scene";
import { Ship } from "./ship";
import { SceneryRocks } from "./scenery-rocks";
import { SpaceTrails } from "./space-trails";
import { Rocks } from "./rocks";
import { background } from "../background";
import { Score } from "./score";
import { Explosion } from "./explosion";

export class GamePlay extends Scene {
  private ship = new Ship();
  private sRocks = new SceneryRocks();
  private spaceTrails = new SpaceTrails();
  private rocks = new Rocks();
  private score = new Score();
  private explosion = new Explosion();
  private gameOver = false;
  private timer = 0;

  public children = [
    background,
    ...this.sRocks.children,
    ...this.spaceTrails.children,
    ...this.ship.children,
    ...this.rocks.children,
    this.score,
    this.explosion
  ];

  public mount() {
    this.ship.mount();
  }

  public destroy() {
    this.ship.destroy();
  }

  public update() {
    if (!this.gameOver) {
      this.ship.update();
      this.score.update();
    }
    if (!this.explosion.finished) {
      this.sRocks.update();
      this.spaceTrails.update();
      this.rocks.update();
      background.update();
    }

    this.gameOver =
      this.gameOver ||
      this.ship.detectCollisions(this.rocks.children[0].children);

    if (this.gameOver && !this.explosion.finished) {
      this.explosion.update(this.ship.ship);
      this.ship.destroy();
    }

    if (this.explosion.finished) {
      this.timer++;
    }
  }

  public goToNextScene() {
    return this.explosion.finished && this.timer >= 60;
  }
}
