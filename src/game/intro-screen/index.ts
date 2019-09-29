import * as PIXI from "pixi.js";
import * as images from "../../assets";
import { Scene } from "../scene";
import keyboard from "../keyboard";
import touch from "../touch";
import { background } from "../background";

export class IntroScreen extends Scene {
  private pirate = this.createPirate();
  private message = this.createMessage();
  private messageContainer = this.createMessageContainer();
  private handlers: { unsubscribe: Function }[] = [];
  private startGame = false;
  public children: PIXI.Container[] = [
    background,
    this.messageContainer,
    this.message,
    this.pirate
  ];

  private timer = 0;

  constructor(private messageParts: string[]) {
    super();
  }

  public mount() {
    this.handlers = this.addKeyHandlers();
  }

  public destroy() {
    this.handlers.forEach(handler => handler.unsubscribe());
  }

  public update() {
    if (this.timer++ % 2 === 0 && this.message.text.length < this.messageParts.join("").length) {
      this.message.text += this.messageParts[this.message.text.length]
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
    pirate.y = window.innerHeight - 290;
    return pirate;
  }

  private createMessage() {
    const message = new PIXI.Text(
      "",
      {
        fontFamily: "Arial",
        fontSize: 24,
        fill: 0xcc5500,
        align: "left"
      }
    );

    message.x = window.innerWidth/2 - 215;
    message.y = ((2 / 3) * window.innerHeight - 300) / 2 + 35;

    return message;
  }

  private createMessageContainer() {
    const container = this.createRect(500, 300);
    container.x = (window.innerWidth - container.width) / 2;
    container.y = ((2 / 3) * window.innerHeight - container.height) / 2;

    const offset = 13;
    const innerContainer = this.createRect(
      container.width - 2 * offset,
      container.height - 2 * offset,
      2
    );
    innerContainer.x = container.x + offset;
    innerContainer.y = container.y + offset;

    const wrapper = new PIXI.Container();
    wrapper.addChild(innerContainer);
    wrapper.addChild(container);

    return wrapper;
  }

  private createRect(width, height, radius = 4, color = 0x0dffff) {
    const container = new PIXI.Graphics();
    container
      .beginFill(color)
      .drawRoundedRect(0, 0, width, height, radius)
      .endFill()
      .beginHole()
      .drawRoundedRect(
        radius,
        radius,
        width - 2 * radius,
        height - 2 * radius,
        radius
      )
      .endHole();
    return container;
  }

  private addKeyHandlers() {
    const press = touch();
    const space = keyboard(" ");
    space.release = press.release = () => {
      this.startGame = true;
    };

    return [press, space];
  }
}
