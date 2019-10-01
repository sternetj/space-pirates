import * as PIXI from "pixi.js";
import * as images from "../../assets";

export class Explosion extends PIXI.Container {
  public fire = this.createFire();
  private scaleFactor = 0.05;
  private times = 0;
  private direction = 1;
  public finished = false;

  constructor() {
    super();

    this.addChild(this.fire);
  }

  public update({x = 0, y = 0, width = 0}: PIXI.Sprite) {
    this.scaleFactor += this.direction * 0.02;
    this.fire.scale = new PIXI.Point(this.scaleFactor, this.scaleFactor);
    this.fire.x = x + width/2;
    this.fire.y = y

    if (this.scaleFactor >= 0.6) {
      this.times++;
      this.direction = -this.direction
    }

    if (this.direction < 0 && this.scaleFactor <= 0.3) {
      this.direction = -this.direction;
    }

    if (this.times >= 3) {
      this.finished = true;
    }
  }

  private createFire() {
    const fire = PIXI.Sprite.from(images.explosion);

    fire.scale = new PIXI.Point(0, 0);
    fire.rotation = Math.floor(Math.random() * 360)
    fire.anchor.set(0.5)
    fire.x = 0;
    fire.y = 0;

    return fire;
  }
}
