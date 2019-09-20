import * as PIXI from "pixi.js";
import * as images from "../assets";
import keyboard from "./keyboard";

type VelocitySprite = PIXI.Sprite & {
  vx?: number,
  acc?: number,
  gx?: any[],
};

export class Ship {
  private ship: VelocitySprite;
  public children: PIXI.DisplayObject[] = [];

  constructor() {
    this.ship = this.createShip();
    this.addKeyHandlers();

    this.children = [this.ship];
  }

  public update() {
    let {
      vx = 0,
      acc = 0,
      width,
      x: shipX
    } = this.ship
    const screenCenter = (window.innerWidth - width) / 2;
    let distance = Math.abs(this.ship.x - screenCenter);
    const gravity = 0; //shipX > screenCenter ? -4 : 4;

    this.ship.vx = vx + gravity + acc;

    if (distance < 1 && !this.ship.acc) {
      this.ship.vx = 0;
    }

    if (shipX > window.innerWidth - width - 25 && this.ship.vx > 0) {
      this.ship.vx = 0;
    } else if (shipX < 25 && this.ship.vx < 0) {
      this.ship.vx = 0;
    }
    this.ship.position.set(
      this.ship.x + this.ship.vx,
      this.ship.y
    );
  }

  private createShip(): VelocitySprite {
    const ship: VelocitySprite = PIXI.Sprite.from(images.ship);
    ship.scale = new PIXI.Point(0.3, 0.3);

    ship.y = window.innerHeight - 220;
    ship.x = (window.innerWidth - ship.width) / 2;
    ship.vx = 0;

    return ship;
  }

  private addKeyHandlers() {
    let left = keyboard("ArrowLeft"),
      right = keyboard("ArrowRight");

    //Left arrow key `press` method
    left.press = () => {
      //Change the ship's velocity when the key is pressed
      // this.ship.vx = -8;
      this.ship.acc = -0.1;
    };

    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the ship isn't moving vertically:
      //Stop the ship
      if (!right.isDown) {
        this.ship.acc = 0;
      }
    };

    //Right
    right.press = () => {
      this.ship.acc = 0.1;
    };
    right.release = () => {
      if (!left.isDown) {
        this.ship.acc = 0;
      }
    };
  }
};

