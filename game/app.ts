import * as PIXI from "pixi.js";
import * as images from "../assets";
import keyboard from "./keyboard";

const app = new PIXI.Application({ width: 256, height: 256 });

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

const cat = PIXI.Sprite.from(images.ship);
cat.scale = new PIXI.Point(0.3, 0.3);

const createStar = () => {
  let circle = new PIXI.Graphics();
  circle.beginFill(0xDDDDDD);
  circle.drawCircle(0, 0, 1);
  circle.endFill();
  circle.x = Math.floor(Math.random() * window.innerWidth);
  circle.y = Math.floor(Math.random() * window.innerHeight);
  return circle;
}

const numStars = 300;

const createSky = () => {
  const sky = new PIXI.Container();
  const stars = new Array(numStars).fill({}).map(() => createStar());
  stars.forEach(star => sky.addChild(star));
  return sky;
}

const skyA = createSky();
skyA.y = -window.innerHeight;
const skyB = createSky();


app.stage.addChild(skyA);
app.stage.addChild(skyB);
app.stage.addChild(cat);

cat.y = window.innerHeight

//Capture the keyboard arrow keys
let left = keyboard("ArrowLeft"),
  up = keyboard("ArrowUp"),
  right = keyboard("ArrowRight"),
  down = keyboard("ArrowDown");

//Left arrow key `press` method
left.press = () => {
  //Change the cat's velocity when the key is pressed
  cat.vx = -6;
  cat.vy = 0;
};

//Left arrow key `release` method
left.release = () => {
  //If the left arrow has been released, and the right arrow isn't down,
  //and the cat isn't moving vertically:
  //Stop the cat
  if (!right.isDown && cat.vy === 0) {
    cat.vx = 0;
  }
};

//Right
right.press = () => {
  cat.vx = 6;
  cat.vy = 0;
};
right.release = () => {
  if (!left.isDown && cat.vy === 0) {
    cat.vx = 0;
  }
};

app.ticker.add(delta => {
  // if (cat.x + cat.width >= app.screen.width) {
  //   cat.vx = -1;
  // } else if (cat.x <= 0) {
  //   cat.vx = 1;
  // }
  // if (cat.y + cat.height >= app.screen.height) {
  //   cat.vy = -1;
  // } else if (cat.y <= 0) {
  //   cat.vy = 1;
  // }

  cat.position.set(cat.x + cat.vx, cat.y + cat.vy);

  [skyA, skyB].forEach(sky => {
    sky.y += 1;

    if (sky.y > window.innerHeight) {
      sky.y = -window.innerHeight
    }
  })


});

export default app;

