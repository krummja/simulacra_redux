
import * as ROT from 'rot-js';
import { IModule } from './module';
import { lineOpts, Line } from '../line';
import { Entity } from '../../engine/core/entity';


export class EntityMenu implements IModule
{
  public id: number = 0;
  public menuList: Entity[]  = [];

  constructor(
    private _display: ROT.Display,
    public header: string,
    public selection: number,
    public config: lineOpts,
    public focused: boolean
  ) { }

  public draw(x: number, y: number, w?: number, h?: number) 
  {
    this._display.drawText(x, y, this.header);

    y += 2;
    let renderData: string[] = [];

    for (let entity of this.menuList) {
      let item = Line(w, `${entity.glyph.character}`, `${entity.name}`, '', this.config);
      renderData.push(item);
    }
    
    for (let i = 0; i < renderData.length; i++) {
      if (this.focused && i === this.selection) {
        renderData[i] = "%c{#fc5a03}" + renderData[i];
      }
      this._display.drawText(x, i + y, renderData[i], w);
    }
    y++
  }

  public saturate(target: Entity[])
  {
    target.map((item: Entity) => { this.menuList.push(item) });
  }
}