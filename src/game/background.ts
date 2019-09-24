import * as PIXI from "pixi.js";

import { random } from "faker";

export class Background {
  public children: PIXI.DisplayObject[] = [];

  constructor() {
    this.children = [this.createBackgroundGradient(), this.createHorizon()];
  }

  public update() {}

  private createBackgroundGradient() {
    const quality = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext("2d")!;

    // use canvas2d API to create gradient
    const grd = (ctx as any).createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, "rgba(0,0,0)");
    grd.addColorStop(0.4, "rgba(0, 7, 26, .7)");
    grd.addColorStop(1, `rgba(0, 7, 26, 0.8)`);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

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

  private createHorizon() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = (window.innerHeight * 2) / 5;

    const ctx = canvas.getContext("2d")!;

    // use canvas2d API to create gradient
    const grd = ctx.createRadialGradient(
      window.innerWidth / 2,
      window.innerHeight / 4,
      0,
      window.innerWidth / 2,
      window.innerHeight / 4,
      window.innerHeight / 4
    );
    grd.addColorStop(0, `rgba(255, 255, 255, 0.45)`);
    grd.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = grd;
    ctx.fillRect(
      -window.innerWidth,
      0,
      2 * window.innerWidth,
      window.innerHeight / 4
    );

    const texture = PIXI.Texture.from(canvas);
    const sprite = new PIXI.Sprite(texture);
    sprite.height = window.innerWidth;
    sprite.width = 2 * window.innerHeight;
    sprite.x = -window.innerWidth;
    sprite.y = (5 / 7) * window.innerHeight;

    return sprite;
  }
}
