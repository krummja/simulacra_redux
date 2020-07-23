import { Tile } from '../../ui/tile';


export interface Vec {
  x: number;
  y: number;
}


export class Array2D<T>
{
  private _elements: {[key: string]: T} = {};

  constructor(
    public width: number,
    public height: number,
    value?: T
  ) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this._elements[x+","+y] = value;
      }
    }
  }

  get(pos: Vec)
  {
    return this._elements[pos.x+","+pos.y];
  }

  set(pos: Vec, value: T)
  {
    this._elements[pos.x+","+pos.y] = value;
  }
}