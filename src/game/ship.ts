import * as PIXI from "pixi.js";
import * as images from "../assets";
import keyboard from "./keyboard";

type VelocitySprite = PIXI.Sprite & { vx?: number, vy?: number };

export class Ship {
  private ship: VelocitySprite;
  public children: PIXI.DisplayObject[] = [];

  constructor() {
    this.ship = this.createShip();
    this.addKeyHandlers();

    this.children = [this.ship];
  }

  public update() {
    let vx = (this.ship.vx || 0);
    let distance = Math.abs(this.ship.x - (window.innerWidth - this.ship.width) / 2);
    let dx = distance;

    if (vx == 0) {
      if (dx > 0.5 && !this.ship.gx) {
        this.ship.gx = [];
        const direction = this.ship.x > (window.innerWidth - this.ship.width) / 2 ? -1 : 1;

        // Needs refactoring
        // go towards center
        while (dx > 5 / 6 * distance) {
          dx -= 6;
          this.ship.gx.push(direction * 6);
        }
        while (dx > 2 / 3 * distance) {
          dx -= 7;
          this.ship.gx.push(direction * 7);
        }
        while (dx > 1 / 3 * distance) {
          dx -= 8;
          this.ship.gx.push(direction * 8);
        }

        while (dx > 0) {
          dx -= 7;
          this.ship.gx.push(direction * 7);
        }

        // Go 1/8 the ship width away from center in the current direction
        while (dx > (1 / 8) * -this.ship.width) {
          dx -= 6;
          this.ship.gx.push(direction * 6);
        }

        while (dx > (1 / 2) * -this.ship.width) {
          dx -= 5;
          this.ship.gx.push(direction * 5);
        }

        // Go back towards center
        while (dx > (1 / 8) * -this.ship.width) {
          dx -= 4;
          this.ship.gx.push(direction * 4);
        }

        while (dx < 0) {
          dx += 3;
          this.ship.gx.push(-direction * 3);
        }

        // Go 1/16 the ship width away from center in the current direction
        while (dx < (1 / 16) * this.ship.width) {
          dx += 2;
          this.ship.gx.push(-direction * 2);
        }

        // Go to center
        while (dx > 0) {
          dx -= 1;
          this.ship.gx.push(direction * 1);
        }
      }
    } else {
      this.ship.gx = undefined;
    }

    const gx = (this.ship.gx || []).shift() || 0;
    this.ship.position.set(
      this.ship.x + vx + gx,
      this.ship.y
    );
  }

  private createShip(): VelocitySprite {
    const ship = PIXI.Sprite.from(images.ship);
    ship.scale = new PIXI.Point(0.3, 0.3);

    ship.y = window.innerHeight - 220;
    ship.x = (window.innerWidth - ship.width) / 2;
    ship.gx = [];

    return ship;
  }

  private addKeyHandlers() {
    let left = keyboard("ArrowLeft"),
      right = keyboard("ArrowRight");

    //Left arrow key `press` method
    left.press = () => {
      //Change the ship's velocity when the key is pressed
      this.ship.vx = -8;
      this.ship.vy = 0;
    };

    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the ship isn't moving vertically:
      //Stop the ship
      if (!right.isDown && this.ship.vy === 0) {
        this.ship.vx = 0;
      }
    };

    //Right
    right.press = () => {
      this.ship.vx = 8;
      this.ship.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.ship.vy === 0) {
        this.ship.vx = 0;
      }
    };
  }
};

