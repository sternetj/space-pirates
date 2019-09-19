import * as PIXI from "pixi.js";

export class Sky {
  private skyA: PIXI.Container;
  private skyB: PIXI.Container;
  public children: PIXI.DisplayObject[] = [];

  constructor(visibleStars = 300) {
    this.skyA = this.createSkySection(visibleStars);
    this.skyB = this.createSkySection(visibleStars, -window.innerHeight);

    this.children = [this.skyA, this.skyB];
  }

  public update() {
    this.children.forEach(this.updateSkySection as any);
  }

  private updateSkySection = (sky: PIXI.Container) => {
    sky.y += 1;

    if (sky.y > window.innerHeight) {
      sky.y = -window.innerHeight;
    }
  };

  private createSkySection(visibleStars, y = 0) {
    const sky = new PIXI.Container();
    const stars = new Array(visibleStars).fill({}).map(() => this.createStar());
    stars.forEach(star => sky.addChild(star));
    sky.y = y;
    return sky;
  }

  private createStar() {
    let star = new PIXI.Graphics();
    star.beginFill(0xdddddd);
    star.drawCircle(0, 0, 1);
    star.endFill();
    star.x = Math.floor(Math.random() * window.innerWidth);
    star.y = Math.floor(Math.random() * window.innerHeight);
    return star;
  }
}
