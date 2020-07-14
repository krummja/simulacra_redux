import * as ROT from 'rot-js';
import { IModule } from './module';


export class BasicMenu implements IModule
{
  id: number = 0;

  constructor(
    private _display: ROT.Display,
    public header: string,
  ) { }

  draw(x: number, y: number, w?: number, h?: number)
  {
    this._display.drawText(x, y, this.header);
    y += 1;
    this._display.drawText(x, y, "This is some test text");
    y += 1;
    this._display.drawText(x, y, "intended to test UIModules.")
  }
}