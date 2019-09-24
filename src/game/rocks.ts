import * as PIXI from "pixi.js";
import * as images from "../assets";
import { random } from "faker";

export class Rocks {
  public children: PIXI.Container[] = [];
  private scene = new PIXI.Container();

  constructor() {
    this.children = [this.scene];
    this.scene.addChild(...new Array(12).fill({}).map(this.createRock));
  }

  public update() {
    this.scene.children.forEach(rock => {
      rock.y += 6;

      if (rock.y - (rock as any).radius > window.innerHeight) {
        this.scene.removeChild(rock);

        if (this.scene.children.length < 12) {
          const shouldCreate = Math.random() > 0.5;
          if (this.scene.children.length < 5 || shouldCreate) {
            this.scene.addChild(this.createRock());
          }
        }
      }
    });
  }

  private createRock = () => {
    let radius = random.number({ min: 18, max: 50 });
    let points: PIXI.Point[] = [];
    for (let k = 0; k < 5; k++) {
      points.push(
        new PIXI.Point(
          radius * Math.cos((k * 2 * Math.PI) / 5),
          radius * Math.sin((k * 2 * Math.PI) / 5)
        )
      );
    }

    const mask = new PIXI.Graphics()
      .beginFill(0x0000ff, 0.7)
      .drawPolygon([
        new PIXI.Point(radius / 5, 0),
        new PIXI.Point(-radius, 2 * radius),
        new PIXI.Point(2 * radius, 2 * radius),
        new PIXI.Point(2 * radius, -2 * radius),
        new PIXI.Point(-radius, -2 * radius)
      ])
      .endFill();

    const rock = new PIXI.Graphics()
      .beginFill(0xcc5500)
      .drawPolygon(points)
      .endFill();
    const darkRock = new PIXI.Graphics()
      .beginFill(0x7c3100)
      .drawPolygon(points)
      .endFill();

    let rockContainer = new PIXI.Container();
    rockContainer.addChild(rock);
    rockContainer.addChild(darkRock);
    rockContainer.addChild(mask);
    darkRock.mask = mask;

    rockContainer.x = random.number({
      min: -radius,
      max: window.innerWidth + radius
    });
    rockContainer.y = random.number({ min: -window.innerHeight, max: -radius });
    (rockContainer as any).radius = radius;
    rockContainer.angle = random.number(360);

    return rockContainer;
  };
}
