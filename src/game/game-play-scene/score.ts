import * as PIXI from "pixi.js";

export class Score extends PIXI.Container {
  private scene = new PIXI.Container();

  public score = 0;
  public scoreRate = 100;
  public ticksPerScore = 8;
  public message = this.createMessage();

  constructor() {
    super();

    this.addChild(this.message);
  }

  public update() {
    this.ticksPerScore -= 1;

    if (this.ticksPerScore === 0) {
      this.score += this.scoreRate;
      this.updateMessage(this.score);
      this.ticksPerScore = 4;
    }
  }

  private updateMessage(score: number) {
    this.message.text = `SCORE: ${score}`;
  }

  private createMessage() {
    const message = new PIXI.Text("", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0x0dffff,
      align: "center"
    });

    message.x = 20;
    message.y = 20;

    return message;
  }
}
