import { Vec } from './array2d';

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
    this.pos = {x: this.x, y: this.y};
    this.geom = {x: this.w, y: this.h};
  }

  row = (x: number, y: number, size: number): Rect => { return new Rect(x, y, size, 1); }

  column = (x: number, y: number, size: number): Rect => { return new Rect(x, y, 1, size); }

  toString = (): string => { return `${this.pos}-${this.geom}`; }

  left = (): number => { return Math.min(this.x, this.x + this.w); }
  top = (): number => { return Math.min(this.y, this.y + this.h); }
  right = (): number => { return Math.max(this.x, this.x + this.w);  }
  bottom = (): number => { return Math.max(this.y, this.y + this.h); }

  topLeft = (): Vec => { return {x: this.left(), y: this.top()} }
  topRight = (): Vec => { return {x: this.right(), y: this.top()} }
  bottomLeft = (): Vec => { return {x: this.left(), y: this.bottom()} }
  bottomRight = (): Vec => { return {x: this.right(), y: this.bottom()} }

  center = (): Vec => { return { x: this.left() + this.right() / 2, y: (this.top() + this.bottom()) / 2 } }
}