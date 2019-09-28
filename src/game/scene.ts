import PIXI from "pixi.js";

export abstract class Scene {
  public children: PIXI.DisplayObject[] = [];

  public mount(): void {}
  public abstract update(): void;
  public abstract goToNextScene(): boolean;
}