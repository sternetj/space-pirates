import * as PIXI from "pixi.js";

import { random } from "faker";

export class SpaceTrails {
  private container: PIXI.Container;
  public children: PIXI.DisplayObject[] = [];

  constructor() {
    this.container = this.createTrailContainer();
    this.children = [this.container];
  }

  public update() {
    this.container.children.forEach(this.updateTrail)
  }

  private updateTrail = (trail: PIXI.Sprite) => {
    trail.y += trail.vy;

    if (trail.y - trail.height > window.innerHeight) {
      this.container.removeChild(trail);
      const currentTrails = this.container.children.length
      if (currentTrails < 16) {
        const shouldCreate = Math.random() > 0.5;
        if (currentTrails < 8 || shouldCreate) {
          this.container.addChild(this.createTrail())
        }
      }
    }
  }

  private createTrailContainer() {
    const sky = new PIXI.Container();
    const stars = new Array(20).fill({}).map(() => this.createTrail(random.number(500)));
    stars.forEach(star => sky.addChild(star));
    return sky;
  }

  private createTrail(offset = 0) {
    const quality = 256;
    const canvas = document.createElement('canvas');
    canvas.width = quality;
    canvas.height = 1;

    const ctx = canvas.getContext('2d');

    // use canvas2d API to create gradient
    const grd = ctx.createLinearGradient(0, 0, quality, 0);
    grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
    grd.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
    grd.addColorStop(1, `rgba(255, 255, 255, 0.${random.number({ min: 60, max: 99 })})`);

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, quality, 1);

    const texture = PIXI.Texture.from(canvas);
    const sprite = new PIXI.Sprite(texture);
    sprite.angle = 90;
    sprite.height = 5;
    const length = random.number({ min: 80, max: window.innerHeight/3 })
    sprite.width = length;
    sprite.x = Math.floor(Math.random() * window.innerWidth);
    sprite.y = -length - offset;
    sprite.vy = random.number({ min: 5, max: 10 });
    sprite.tint = 0x888888;

    return sprite;

  }
};

