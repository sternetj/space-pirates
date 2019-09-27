import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { Scene } from "../scene";
import keyboard from "../keyboard";

export class Intro extends Scene {
  private logo = this.createLogo();
  private message = this.createMessage();
  // private priate = this.createPirate();
  private startGame = false;
  public children: PIXI.Container[] = [
    this.logo,
    // this.priate,
    this.message
  ];

  private messageOffFor = 0;

  constructor() {
    super();
    this.addKeyHandlers();
  }

  public update() {
    if (this.logo.y < window.innerHeight / 6 - this.logo.height / 2) {
      this.logo.y += 8;
    }

    if (this.messageOffFor++ >= 75) {
      this.messageOffFor = 36;
      this.message.visible = !this.message.visible;
    }
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

  private addKeyHandlers() {
    keyboard(" ").press = () => {
      this.startGame = true;
    };
  }
}
