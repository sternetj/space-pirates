import * as PIXI from "pixi.js";
import * as images from "../assets";
import keyboard from "./keyboard";

type VelocitySprite = PIXI.Sprite & {
  vx?: number,
  acc?: number,
  gx?: any[],
  stopAcc?: "left" | "right";
};

const shipAcc = 7.5;
const springConst = 0.04;

let vx = 0,
  m = 0.1,    // Ball mass in kg
  // Ship radius in cm, or pixels.
  r = 20,
  dt = 0.02,  // Time step.
  e = -0.3,   // Coefficient of restitution ("bounciness")
  rho = 1.2,  // Density of air. Try 1000 for water.
  C_d = 0.47, // Coeffecient of drag for a ball
  // Frontal area of the ball; divided by 10000 to compensate for the 1px = 1cm relation
  A = Math.PI * r * r / 10000;

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
      acc: ax = 0,
      width,
      x,
    } = this.ship
    const screenCenter = (window.innerWidth - width) / 2;

    let gravity = -2 * springConst * (x - screenCenter);

    if (ax) {
      gravity = ax
    }

    let fx = 0;

    /* Weight force, which only affects the y-direction (because that's the direction gravity points). */
    fx += m * (gravity + ax);

    /* Air resistance force; this would affect both x- and y-directions, but we're only looking at the y-axis in this example. */
    fx += -1 * 0.5 * rho * C_d * A * vx * vx;

    /* Verlet integration for the y-direction */
    let dx = vx * dt + (0.5 * ax * dt * dt);
    /* The following line is because the math assumes meters but we're assuming 1 cm per pixel, so we need to scale the results */
    x += dx * 100;
    let new_ax = fx / m;
    let avg_ax = 0.5 * (new_ax + ax);
    vx += avg_ax * dt;

    /* Let's do very simple collision detection */
    if (x + width + 10 > window.innerWidth && vx > 0) {
      /* This is a simplification of impulse-momentum collision response. e should be a negative number, which will change the velocity's direction. */
      vx *= e;
      /* Move the ball back a little bit so it's not still "stuck" in the wall. */
      x = window.innerWidth - 10 - width;
    } else if (x < 10 && vx < 0) {
      vx *= e;
      /* Move the ball back a little bit so it's not still "stuck" in the wall. */
      x = 10;
    }


    let distance = Math.abs(x - screenCenter);
    if (!ax && Math.abs(vx) < 0.2 && distance < 3) {
      vx = 0;
      x = screenCenter
    } else if (!ax && distance < screenCenter / 3) {
      vx *= Math.min(Math.log2(distance / (screenCenter) + 1) + .68, 0.99)
    }

    this.ship.position.set(
      x,
      this.ship.y
    );
  }

  public detectCollisions(objects: PIXI.DisplayObject[]) {
    return false;
  }

  private createShip(): VelocitySprite {
    const ship: VelocitySprite = PIXI.Sprite.from(images.ship);
    ship.scale = new PIXI.Point(0.3, 0.3);

    ship.y = window.innerHeight - 220;
    ship.x = (window.innerWidth - ship.width)/2;
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
      this.ship.acc = -shipAcc;
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
      this.ship.acc = shipAcc;
    };
    right.release = () => {
      if (!left.isDown) {
        this.ship.acc = 0;
      }
    };
  }
};

