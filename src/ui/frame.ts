import * as ROT from 'rot-js';
import { Rect } from '../engine/stage/rect';
import { Glyph } from './glyph';


export const FRAME = {
  T_LEFT: 
    new Glyph({
      character: '╒',
      foreground: '#333333',
      background: '#000000'
    }),
  T_RIGHT: 
    new Glyph({
      character: '╕',
      foreground: '#333333',
      background: '#000000'
    }),
  B_LEFT: 
    new Glyph({
      character: '╘',
      foreground: '#333333',
      background: '#000000'
    }),
  B_RIGHT: 
    new Glyph({
      character: '╛',
      foreground: '#333333',
      background: '#000000'
    }),
  VERTICAL: 
    new Glyph({
      character: ' ',
      foreground: '#333333',
      background: '#000000'
    }),
  HORIZONTAL: 
    new Glyph({
      character: '═',
      foreground: '#333333',
      background: '#000000'
    }),
  EMPTY:
    new Glyph({
      character: ' ',
      foreground: '#000000',
      background: '#000000'
    })
}

export const FOCUSED_FRAME = {
  T_LEFT: 
    new Glyph({
      character: '╒',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  T_RIGHT: 
    new Glyph({
      character: '╕',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  B_LEFT: 
    new Glyph({
      character: '╘',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  B_RIGHT: 
    new Glyph({
      character: '╛',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  VERTICAL: 
    new Glyph({
      character: ' ',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  HORIZONTAL: 
    new Glyph({
      character: '═',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  EMPTY:
    new Glyph({
      character: ' ',
      foreground: '#000000',
      background: '#000000'
    })
}

export const BOX = {
  T_LEFT: 
    new Glyph({
      character: '┌',
      foreground: '#333333',
      background: '#000000'
    }),
  T_RIGHT: 
    new Glyph({
      character: '┐',
      foreground: '#333333',
      background: '#000000'
    }),
  B_LEFT: 
    new Glyph({
      character: '└',
      foreground: '#333333',
      background: '#000000'
    }),
  B_RIGHT: 
    new Glyph({
      character: '┘',
      foreground: '#333333',
      background: '#000000'
    }),
  VERTICAL: 
    new Glyph({
      character: ' ',
      foreground: '#333333',
      background: '#000000'
    }),
  HORIZONTAL: 
    new Glyph({
      character: ' ',
      foreground: '#333333',
      background: '#000000'
    }),
  EMPTY:
    new Glyph({
      character: ' ',
      foreground: '#000000',
      background: '#000000'
    })
}

export const FOCUSED_BOX = {
  T_LEFT: 
    new Glyph({
      character: '┌',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  T_RIGHT: 
    new Glyph({
      character: '┐',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  B_LEFT: 
    new Glyph({
      character: '└',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  B_RIGHT: 
    new Glyph({
      character: '┘',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  VERTICAL: 
    new Glyph({
      character: ' ',
      foreground: '#fc5a03',
      background: '#000000'
    }),
  HORIZONTAL: 
    new Glyph({
      character: ' ',
      foreground: '#fc5a03',
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
  bounds: Rect;

  constructor(
    public display: ROT.Display,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) { 
    this.bounds = new Rect(this.x, this.y, this.width, this.height);
  }

  // Draw a single [Glyph] at position [x, y].
  _point(x: number, y: number, symbol: Glyph)
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
  _horizontal(x: number, y: number, w: number, startSymbol: Glyph, endSymbol: Glyph, line: Glyph): void
  {
    this._point(x, y, startSymbol);
    for (let i = x + 1; i < w + x; i++) {
      this._point(i, y, line);
    }
    this._point(x + w, y, endSymbol);
  }

  // Draw a vertical line from [y] to [y+h] on column [x].
  _vertical(x: number, y: number, h: number, line: Glyph): void
  {
    for (let i = y + 1; i < h + y + 1; i++) {
      this._point(x, i, line);
    }
  }

  // Draw a box from [x,y] to [x+w, y+h].
  _frame(): void
  { 
    let w = this.width -= 1;
    let h = this.height -= 1;
    
    this._horizontal(this.x, this.y, w, FRAME.T_LEFT, FRAME.T_RIGHT, FRAME.HORIZONTAL);
    this._vertical(this.x, this.y, h, FRAME.VERTICAL);
    this._vertical(this.x + w, this.y, h, FRAME.VERTICAL);
    this._horizontal(this.x, this.y + h, w, FRAME.B_LEFT, FRAME.B_RIGHT, FRAME.HORIZONTAL);
  }

  _focused_frame(): void
  {
    let w = this.width -= 1;
    let h = this.height -= 1;

    this._horizontal(this.x, this.y, w, FOCUSED_FRAME.T_LEFT, FOCUSED_FRAME.T_RIGHT, FOCUSED_FRAME.HORIZONTAL);
    this._vertical(this.x, this.y, h, FOCUSED_FRAME.VERTICAL);
    this._vertical(this.x + w, this.y, h, FOCUSED_FRAME.VERTICAL);
    this._horizontal(this.x, this.y + h, w, FOCUSED_FRAME.B_LEFT, FOCUSED_FRAME.B_RIGHT, FOCUSED_FRAME.HORIZONTAL);
  }

  _box(): void
  {
    let w = this.width -= 1;
    let h = this.height -= 1;
    this._horizontal(this.x, this.y, w, BOX.T_LEFT, BOX.T_RIGHT, BOX.HORIZONTAL);
    this._vertical(this.x, this.y, h, BOX.VERTICAL);
    this._vertical(this.x + w, this.y, h, BOX.VERTICAL);
    this._horizontal(this.x, this.y + h, w, BOX.B_LEFT, BOX.B_RIGHT, BOX.HORIZONTAL);
  }
}