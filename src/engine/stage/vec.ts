

export class VecBase
{
  constructor(
    public x: number,
    public y: number
  ) {}

  area = (): number => { return this.x * this.y; }

  rookLength = (): number => { return Math.abs(this.x) + Math.abs(this.y); }

  kingLength = (): number => { return Math.max(Math.abs(this.x), Math.abs(this.y)); }

  lengthSquared = (): number => { return this.x * this.x + this.y * this.y; }

  length = (): number => { return Math.sqrt( this.lengthSquared() ); }
}


export class Vec extends VecBase
{
  public x: number;
  public y: number;

  constructor(
    x: number,
    y: number
  ) {
    super(x, y)
    this.x = x;
    this.y = y;
  }

  static zero = new Vec(0, 0);

  hashCode() 
  {
    let a = this.x >= 0 ? 2 * this.x : -2 * this.x - 1;
    let b = this.y >= 0 ? 2 * this.y : -2 * this.y - 1;

    let result = (a + b) * (a + b + 1);
    return Math.floor(result / 2) + b;
  }
}