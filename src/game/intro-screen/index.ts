import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { Scene } from "../scene";
import keyboard from "../keyboard";
import { background } from "../background";

export class IntroScreen extends Scene {
  private pirate = this.createPirate();
  private message = this.createMessage();
  private messageContainer = this.createMessageContainer();
  
  private startGame = false;
  public children: PIXI.Container[] = [
    background,
    this.messageContainer,
    this.message,
    this.pirate,
  ];

  private timer = 0;

  constructor() {
    super();
  }

  public update() {

  }

  public mount() {
    this.addKeyHandlers();
  }

  public goToNextScene() {
    return this.startGame;
  }

  private createPirate() {
    const pirate = PIXI.Sprite.from(images.pirate);
    const scale = 0.5;
    pirate.scale = new PIXI.Point(scale, scale);
    pirate.x = 0;
    pirate.y = window.innerHeight - 290;
    return pirate;
  }

  private createMessage() {
    const message = new PIXI.Text("Need some goofy piratey text here\n\n\n\n\n\n\n\nPress SPACE to continue...", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xcc5500,
      align: "left"
    });

    message.x = 90;
    message.y = (2/3 * window.innerHeight - 300)/2 + 35;

    return message;
  }

  private createMessageContainer() {
    const container = this.createRect(500, 300);
    container.x = (window.innerWidth - container.width)/2;
    container.y = (2/3 * window.innerHeight - container.height)/2;

    const offset = 13;
    const innerContainer = this.createRect(container.width - 2 * offset, container.height - 2 * offset, 2);
    innerContainer.x = container.x + offset;
    innerContainer.y = container.y + offset;

    const wrapper =  new PIXI.Container();
    wrapper.addChild(innerContainer);
    wrapper.addChild(container);

    return wrapper;
  }

  private createRect(width, height, radius = 4, color = 0x0DFFFF) {
    const container = new PIXI.Graphics();
    container
      .beginFill(color)
      .drawRoundedRect(0,0, width, height, radius)
      .endFill()
      .beginHole()
      .drawRoundedRect(radius, radius, width - 2 * radius, height - 2* radius, radius)
      .endHole();
    return container;
  }

  private addKeyHandlers() {
    keyboard(" ").release = () => {
      this.startGame = true;
    };
  }
}
