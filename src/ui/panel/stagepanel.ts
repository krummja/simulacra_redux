import * as ROT from 'rot-js';

import { Rect } from '../../engine/stage/rect';
import { Array2D, Vec } from '../../engine/stage/array2d';
import { Terminal } from '../../main';
import { GameScreen } from "../game_screen";
import { Glyph } from '../glyph';
import { Panel } from "./panel";
import { Tile } from '../tile';


export class StagePanel extends Panel
{
  gameScreen: GameScreen;
  bounds: Rect;

  private _cameraBounds: Rect;

  private _renderOffset: Vec;

  constructor(
    public screen: GameScreen,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ){
    super(screen);
    this.bounds = new Rect(this.x, this.y, this.width, this.height);
  }

  renderPanel(terminal: Terminal) {
    let display = terminal['terminal'];

    let game = this.gameScreen.game;
    let character = game.subject;
  }

  drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph) 
  {
    this._drawStageGlyph(terminal, x + this.bounds.x, y + this.bounds.y, glyph);
  }

  private _drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph) 
  {
    let display = terminal['terminal'];
    
    display.draw(
      x - this._cameraBounds.x + this._renderOffset.x, 
      y - this._cameraBounds.y + this._renderOffset.y,
      glyph.character, 
      glyph.foreground, 
      glyph.background
    );
  }

  private _positionCamera(size: Vec)
  {

  }
}