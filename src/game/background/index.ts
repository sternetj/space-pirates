import * as PIXI from "pixi.js";

import { Background as Horizon } from "./background";
import { Sky } from "./sky";

export class Background extends PIXI.Container {
  private background = new Horizon();
  private sky = new Sky();
  
  public children = this.background.children.concat(
    this.sky.children,
  );

  constructor() {
    super();

    this.addChild(...this.background.children, ...this.sky.children)
  }

  public update() {
    this.sky.update();
  }
}

export const background = new Background();
