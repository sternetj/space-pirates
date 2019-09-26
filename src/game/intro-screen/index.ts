import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { random } from "faker";

export class Intro {
  public children: PIXI.Container[] = [];

  constructor() {
    this.children = [
      this.createPirate()
    ];
  }

  public update() {
  }

  private createPirate() {
    const pirate = PIXI.Sprite.from(images.pirate);
    const scale = 0.5
    pirate.scale = new PIXI.Point(scale, scale)
    pirate.x = 0;
    pirate.y = window.innerHeight - pirate.height;
    return pirate;
  }
}
