import * as ROT from 'rot-js';

import { IModule } from './module';


export class DataMenu implements IModule
{
  id: number = 0;

  get menuList(): string[] { return this._menuList }
  private _menuList: string[] = [];

  constructor(
    private display: ROT.Display,
    public header: string,
    public focused?: boolean
  ) { }

  draw(x: number, y: number, w?: number, h?: number)
  {
    this.display.drawText(x, y, this.header);
    y += 1;
    for (const line of this._menuList) {
      y += 1;
      this.display.drawText(x, y, line);
    }
  }
}
