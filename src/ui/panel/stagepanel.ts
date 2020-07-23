import * as ROT from 'rot-js';

import { Rect } from '../../engine/stage/rect';
import { Array2D, Vec } from '../../engine/stage/array2d';
import { Terminal } from '../../main';
import { GameScreen } from "../game_screen";
import { Glyph } from '../glyph';
import { Panel } from "./panel";
import { Tile } from '../tile';
import { Map } from '../../engine/core/map';
import { Event } from '../../engine';

import { container } from '../../engine/core/container';
import { MapService } from '../../engine/core/services/map.service';
import { mod } from '../util/mod';

const mapService = container.get<MapService>("MapService");

export class StagePanel extends Panel
{
  bounds: Rect;

  private _cameraBounds: Rect = null;

  private _renderOffset: Vec = {x: 0, y: 0};

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

    for (let x = 0; x < this._cameraBounds.w; x++) {
      for (let y = 0; y < this._cameraBounds.h; y++) {
        let tile = Map.getTile(mapService.getCurrent(), {x: x, y: y});
        this.drawStageGlyph(terminal, x, y, tile.glyph);
      }
    }
  }

  // Draws [Glyph] at [x], [y] in [Stage] coordinates onto the current view.
  drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph): void
  {
    this._drawStageGlyph(terminal, x + this.bounds.x, y + this.bounds.y, glyph);
  }

  private _drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph): void
  {
    let display = terminal['terminal'];
    
    display.draw(
      x,
      y,
      glyph.character, 
      glyph.foreground,
      glyph.background
    );
  }

  private _positionCamera(size: Vec)
  {
    let game = this.screen.game;
  
    let rangeWidth = Math.max(0, game.stage.width - size.x);
    
    let rangeHeight = Math.max(0, game.stage.height - size.y);

    let cameraRange = new Rect(0, 0, rangeWidth, rangeHeight);

    let camera: Vec = {x: game.player.pos.x - mod(size.x, 2), y: game.player.pos.y - mod(size.y, 2)};

    camera = cameraRange.clamp(camera);

    this._cameraBounds = new Rect(
      camera.x, 
      camera.y, 
      Math.min(size.x, game.stage.width), 
      Math.min(size.y, game.stage.height)
    );

    this._renderOffset = { 
      x: mod(Math.max(0, size.x - game.stage.width), 2), 
      y: mod(Math.max(0, size.y - game.stage.height), 2) 
    };
  }

  update(events: Iterable<Event>): boolean
  {
    for (const event in events) {}

    // This will be for animation rendering...

    return false;
  }
}