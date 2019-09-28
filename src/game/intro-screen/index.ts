import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { Scene } from "../scene";
import keyboard from "../keyboard";
import { background } from "../background";

export class Intro extends Scene {
  private logo = this.createLogo();
  private message = this.createMessage();
  private about = this.createAbout();
  
  private startGame = false;
  public children: PIXI.Container[] = [
    background,
    this.logo,
    this.message,
    this.about,
  ];

  private timer = 0;

  constructor() {
    super();
    this.addKeyHandlers();
    background.alpha = 0
  }

  public update() {
    if (this.logo.y < window.innerHeight / 6 - this.logo.height / 2) {
      this.logo.y += 8;
    } else {
      if (this.timer % 40 === 1) {
        this.message.visible = !this.message.visible;
      }

      if (this.about.alpha < 1 && this.timer >= 100) {
        this.about.alpha += 0.1;
      }
    }

    if (background.alpha < 0.8) {
      background.alpha += 0.04;
    }

    this.timer++;
  }

  public goToNextScene() {
    return this.startGame;
  }

  private createPirate() {
    const pirate = PIXI.Sprite.from(images.pirate);
    const scale = 0.5;
    pirate.scale = new PIXI.Point(scale, scale);
    pirate.x = 0;
    pirate.y = window.innerHeight - pirate.height;
    return pirate;
  }

  private createLogo() {
    const logo = PIXI.Sprite.from(images.logo);
    const scale = 0.5;
    logo.scale = new PIXI.Point(scale, scale);
    logo.x = (window.innerWidth - 314) / 2;
    logo.y = -450;
    return logo;
  }

  private createMessage() {
    const message = new PIXI.Text("Press SPACE to launch...", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xcc5500,
      align: "center"
    });

    message.visible = false;
    message.x = (window.innerWidth - message.width) / 2;
    message.y = (window.innerHeight - message.height) / 2;

    return message;
  }

  private createAbout() {
    const message = new PIXI.Text("By Chris Pratt & Teddy Sterne", {
      fontFamily: "Arial",
      fontSize: 18,
      fill: 0x0DFFFF,
      align: "center"
    });

    message.alpha = 0;
    message.x = (window.innerWidth - message.width) / 2;
    message.y = 5/6 * window.innerHeight - message.height / 2;

    return message;
  }

  private addKeyHandlers() {
    keyboard(" ").press = () => {
      this.startGame = true;
    };
  }
}
