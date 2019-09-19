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
    this.ship.position.set(
      this.ship.x + (this.ship.vx || 0),
      this.ship.y + (this.ship.vy || 0)
    );
  }

  private createShip(): VelocitySprite {
    const ship = PIXI.Sprite.from(images.ship);
    ship.scale = new PIXI.Point(0.3, 0.3);

    ship.y = window.innerHeight - ship.height - 50;
    ship.x = (window.innerWidth - ship.width) / 2;

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

