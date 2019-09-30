import * as PIXI from "pixi.js";
import { random } from "faker";

export class SceneryRocks {
  public children: PIXI.Container[] = [];

  constructor() {
    this.children = [
      this.createSkySection(),
      this.createSkySection(-window.innerHeight),
      this.createSkySection(-2 * window.innerHeight)
    ];
  }

  public update() {
    this.children.forEach(this.updateSkySection);
  }

  private updateSkySection = (sky: PIXI.Container) => {
    sky.y += 3.5;

    if (sky.y > window.innerHeight) {
      sky.y = -2 * window.innerHeight;
      sky.removeChildren();
      sky.addChild(...this.createRockClusters());
    }

    sky.children.forEach(cluster => {
      const clusterChildren = (cluster as any).children;

      clusterChildren.forEach(rock => {
        rock.angle += rock.rotationSpeed;
      });
    });
  };

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
    const clusterHeight = random.number({
      min: 30,
      max: window.innerHeight / 2
    });

    const numRocks = random.number({ min: 3, max: 7 });
    const rocks = new Array(numRocks)
      .fill({})
      .map(() => this.createRock(clusterWidth, clusterHeight));

    cluster.addChild(...rocks);

    return cluster;
  };

  private createRock = (clusterWidth, clusterHeight) => {
    let radius = random.number({ min: 12, max: 20 });
    let points: PIXI.Point[] = [];
    for (let k = 0; k < 5; k++) {
      points.push(
        new PIXI.Point(
          radius * Math.cos((k * 2 * Math.PI) / 5),
          radius * Math.sin((k * 2 * Math.PI) / 5)
        )
      );
    }

    const rock = new PIXI.Graphics()
      .beginFill(0x001d4d)
      .drawPolygon(points)
      .endFill();
    (rock as any).rotationSpeed = 0;
    rock.x = random.number(clusterWidth);
    rock.y = random.number(clusterHeight);
    rock.tint = 0x777777;
    return rock;
  };
}
