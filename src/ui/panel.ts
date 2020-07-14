import * as ROT from 'rot-js';
import { Glyph } from './glyph';

import { UIModule } from './module/module';


export const FRAME = {
  T_LEFT: 
    new Glyph({
      character: '◤',
      foreground: '#ffffff',
      background: '#000000'
    }),
  T_RIGHT: 
    new Glyph({
      character: '◥',
      foreground: '#ffffff',
      background: '#000000'
    }),
  B_LEFT: 
    new Glyph({
      character: '◣',
      foreground: '#ffffff',
      background: '#000000'
    }),
  B_RIGHT: 
    new Glyph({
      character: '◢',
      foreground: '#ffffff',
      background: '#000000'
    }),
  VERTICAL: 
    new Glyph({
      character: '∙',
      foreground: '#ffffff',
      background: '#000000'
    }),
  HORIZONTAL: 
    new Glyph({
      character: '∙',
      foreground: '#ffffff',
      background: '#000000'
    }),
  EMPTY:
    new Glyph({
      character: ' ',
      foreground: '#000000',
      background: '#000000'
    })
}


/**
 * A basic rectangular UI object.
 * 
 * A [Panel] displays a [UIModule] as its internal content.
 * The role of the [Panel] is to encapsulate the [UIModule] and render a frame around it.
 * It also calls [UIModule.draw()] on each render cycle of the main process.
 */
export class Panel
{
  constructor(
    public display: ROT.Display,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public module: UIModule,
    public focused?: boolean
  ) { }

  // The main render function.
  // The [Panel] frame and then the internal contents are rendered.
  draw(): void
  {
    this._box(this.x, this.y, this.width, this.height);
    this._content(this.module);
  }

  // Draw a single [Glyph] at position [x, y].
  private _point(x: number, y: number, symbol: Glyph)
  {
    this.display.draw(
      x, y,
      symbol.character,
      symbol.foreground,
      symbol.background
    )
  }

  // Draw a horizontal line from [x] to [x+w] on line [y].
  // [startSymbol] and [endSymbol] are the corner symbols.
  private _horizontal(x: number, y: number, w: number, startSymbol: Glyph, endSymbol: Glyph, line: Glyph): void
  {
    this._point(x, y, startSymbol);
    for (let i = x + 1; i < w + x; i++) {
      this._point(i, y, line);
    }
    this._point(x + w, y, endSymbol);
  }

  // Draw a vertical line from [y] to [y+h] on column [x].
  private _vertical(x: number, y: number, h: number, line: Glyph): void
  {
    for (let i = y + 1; i < h + y + 1; i++) {
      this._point(x, i, line);
    }
  }

  // Draw a box from [x,y] to [x+w, y+h].
  private _box(x: number, y: number, w: number, h: number): void
  { 
    w -= 1;
    h -= 1;
    this._horizontal(x, y, w, FRAME.T_LEFT, FRAME.T_RIGHT, FRAME.HORIZONTAL);
    this._vertical(x, y, h, FRAME.VERTICAL);
    this._vertical(x + w, y, h, FRAME.VERTICAL);
    this._horizontal(x, y + h, w, FRAME.B_LEFT, FRAME.B_RIGHT, FRAME.HORIZONTAL);
  }

  // The space within the [Panel] that can render substantive content.
  // The content itself is drawn from a [module] which gets drawn to the internal dimensions of [Panel].
  private _content(module: UIModule): void
  {
    let x = this.x + 1;
    let y = this.y + 1;
    let w = this.width - 2;
    let h = this.height - 2;

    module.draw(x, y, w, h);
  }
}