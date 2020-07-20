import { IterableBase } from './iterator';
import { Vec, VecBase } from './vec';


export class Rect
{
  public pos: Vec;
  public geom: Vec;

  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {
    this.pos = new Vec(this.x, this.y);
    this.geom = new Vec(this.w, this.h);
  }

  row = (x: number, y: number, size: number): Rect => { return new Rect(x, y, size, 1); }

  column = (x: number, y: number, size: number): Rect => { return new Rect(x, y, 1, size); }

  toString = (): string => { return `${this.pos}-${this.geom}`; }

  left = (): number => { return Math.min(this.x, this.x + this.w); }
  top = (): number => { return Math.min(this.y, this.y + this.h); }
  right = (): number => { return Math.max(this.x, this.x + this.w);  }
  bottom = (): number => { return Math.max(this.y, this.y + this.h); }

  topLeft = (): Vec => { return new Vec(this.left(), this.top()); }
  topRight = (): Vec => { return new Vec(this.right(), this.top()); }
  bottomLeft = (): Vec => { return new Vec(this.left(), this.bottom()); }
  bottomRight = (): Vec => { return new Vec(this.right(), this.bottom()); }

  center = (): Vec => { return new Vec((this.left() + this.right() / 2), (this.top() + this.bottom()) / 2); }
}