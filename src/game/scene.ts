import PIXI from "pixi.js";

export class Scene {
  public children: PIXI.DisplayObject[] = [];

  public mount(): void {}
  public destroy(): void {}
  public update(): void {};
  public goToNextScene(): boolean { return true; };
}