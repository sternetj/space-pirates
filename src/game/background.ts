import * as PIXI from "pixi.js";

import { random } from "faker";

export class Background {
  private container: PIXI.Container;
  public children: PIXI.DisplayObject[] = [];

  constructor() {
    this.container = this.createTrailContainer();
    this.children = [this.container];
  }

  public update() {};

  private createTrailContainer() {
    const sky = new PIXI.Container();
    const stars = new Array(1)
      .fill({})
      .map(() => this.createTrail(random.number(500)));
    stars.forEach(star => sky.addChild(star));
    return sky;
  }

  private createTrail(offset = 0) {
    const quality = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext("2d");

    // use canvas2d API to create gradient
    const grd = (ctx as any).createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, "rgba(0,0,0)");
    grd.addColorStop(0.4, "rgba(0, 7, 26, .7)");
    grd.addColorStop(
      1,
      `rgba(0, 7, 26, 0.8)`
    );

    (ctx as any).fillStyle = grd;
    (ctx as any).fillRect(0, 0, quality, 1);

    const texture = PIXI.Texture.from(canvas);
    const sprite = new PIXI.Sprite(texture);
    sprite.angle = 90;
    sprite.height = window.innerWidth;
    const length = window.innerHeight;
    sprite.width = length;
    sprite.x = window.innerWidth;
    sprite.y = 0;

    return sprite;
  }
}
