import * as PIXI from "pixi.js";
import * as images from "../assets";
import { random } from "faker";

export class SceneryRocks {
  public children: PIXI.Container[] = [];

  constructor() {
    this.children = [
      this.createSkySection(),
      this.createSkySection(-window.innerHeight),
      this.createSkySection(-2 * window.innerHeight),
    ];
  }

  public update() {
    this.children.forEach(this.updateSkySection)
  }

  private updateSkySection = (sky: PIXI.Container) => {
    sky.y += 4;

    if (sky.y > window.innerHeight) {
      sky.y = -2 * window.innerHeight
      sky.removeChildren();
      sky.addChild(...this.createRockClusters())
    }

    sky.children.forEach((cluster: PIXI.Container) => {
      cluster.children.forEach(rock => {
        rock.angle += rock.rotationSpeed
      })
    })
  }

  private createSkySection(y = 0) {
    const sky = new PIXI.Container();

    sky.addChild(...this.createRockClusters());
    sky.y = y;
    return sky;
  }

  private createRockClusters() {
    const rockClusters = random.number({ min: 2, max: 4 });
    return new Array(rockClusters).fill({}).map(this.createRockCluster);
  }

  private createRockCluster = () => {
    const cluster = new PIXI.Container();
    cluster.x = -300 + random.number(window.innerWidth + 300);
    cluster.y = random.number(window.innerHeight);
    const clusterWidth = random.number({ min: 30, max: window.innerWidth / 3 });
    const clusterHeight = random.number({ min: 30, max: window.innerHeight / 2 });

    const numRocks = random.number({ min: 3, max: 5 });
    const rocks = new Array(numRocks).fill({}).map(() => {
      let rock = PIXI.Sprite.from(images.rock);
      rock.angle = random.number(360);
      rock.scale.set(0.1 + Math.random() * 0.35)
      rock.anchor.set(0.5);

      rock.hitArea
      rock.x = random.number(clusterWidth);
      rock.y = random.number(clusterHeight);
      rock.tint = 0x464646;
      rock.rotationSpeed = random.number({ min: -3, max: 3 }) || 1;

      return rock;
    });

    cluster.addChild(...rocks);

    return cluster;
  }
};

