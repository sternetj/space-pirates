import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { random } from "faker";
import { Scene } from "../scene";

export class Intro extends Scene {
  public children: PIXI.Container[] = [
    this.createPirate()
  ];

  public update() {
  }

  public nextScene(app: PIXI.Application) {

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
