import { Vec, VecBase } from './vec';
import { Rect } from './rect';




export class Array2D<T>
{
  get elements() { return this._elements; }
  private _elements: T[] = [];

  get bounds() { return this._bounds; }
  private _bounds: Rect;

  constructor(
    public width: number,
    public height: number,
    public value?: T
  ) {
    for (let i = 0; i < this.width * this.height; i++) {
      this._elements.push(value);
    }
    this._bounds = new Rect(0, 0, this.width, this.height);
  }

  generate(generator: Generator): void
  {
    
  }

  /**
   * Gets the element in the array at [x], [y].
   */
  get(pos: Vec): T
  {
    return this._elements[pos.y * this.width + pos.x];
  }

  /**
   * Sets the element in the array at [x], [y] to [value].
   */
  set(pos: Vec, value: T): void
  {
    this._elements[pos.y * this.width + pos.x] = value;
  }

  
  /**
   * Sets every element to [value].
   */
  fill(value: T)
  {
    this._elements.fill(value, 0, this._elements.length);
  }
}
