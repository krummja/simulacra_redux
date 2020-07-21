import * as ROT from 'rot-js';

import { Rect } from '../../engine/stage/rect';
import { Array2D, Vec } from '../../engine/stage/array2d';
import { Terminal } from '../../main';
import { GameScreen } from "../game_screen";
import { Glyph } from '../glyph';
import { Panel } from "./panel";
import { Tile } from '../tile';
import { Map } from '../../engine/core/map';

import { container } from '../../engine/core/container';
import { MapService } from '../../engine/core/services/map.service';
import { mod } from '../util/mod';

const mapService = container.get<MapService>("MapService");

export class StagePanel extends Panel
{
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

  renderPanel(terminal: Terminal): void
  {
    let display = terminal['terminal'];

    this._positionCamera(terminal.size);

    let game = this.screen.game;
    let character = game.subject;

    let map = mapService.getCurrent();

    let topLeftX = Math.max(0, 50 - (200 / 2));
        topLeftX = Math.min(topLeftX, map.width - terminal.size.x);
    let topLeftY = Math.max(0, 28 - (terminal.size.y / 2));
        topLeftY = Math.min(topLeftY, 100 - 48);

    for (let x = topLeftX; x < topLeftX + 200; x++) {
      for (let y = topLeftY; y < topLeftY + 48; y++) {
        let tile = Map.getTile(map, {x: x, y: y});
        display.draw(x - topLeftX, y - topLeftY, 
          tile.glyph.character,
          tile.glyph.foreground,
          tile.glyph.background);
      }
    }
  }

  drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph): void
  {
    this._drawStageGlyph(terminal, x + this.bounds.x, y + this.bounds.y, glyph);
  }

  private _drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph): void
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
    let game = this.screen.game;
    let camera = {x: 50, y: 24};
    this._cameraBounds = new Rect(camera.x, camera.y, Math.min(size.x, game.stage.width), Math.min(size.y, game.stage.height));
    this._renderOffset = { x: mod((Math.max(0, size.x - game.stage.width)), 2), y: mod((Math.max(0, size.y - game.stage.height)), 2) }
  }
}