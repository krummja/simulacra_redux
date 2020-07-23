import { Action, ActionResult } from './action';
import { Direction } from './direction';
import { Vec } from '../stage/array2d';

import { MapService } from '../core/services/map.service';
import { container } from '../core/container';
import { Tile } from '../../ui/tile';
import { Map } from '../core/map';

const mapService = container.get<MapService>("MapService");


export class WalkAction extends Action 
{
  dir: Direction;

  constructor(dir: Direction){
    super();

    this.dir = dir;
  }

  onPerform(): ActionResult 
  { 
    if (this.dir == Direction.none) {
      return;
    }

    let pos: Vec = {
      x: this.actor.pos.x + this.dir.dir.x, 
      y: this.actor.pos.y + this.dir.dir.y 
    }

    let tile: Tile = Map.getTile(mapService.getCurrent(), pos);

    if (tile.walkable) {
      this.actor.pos = pos;
      return this.succeed();
    }

    else if (tile.diggable) {
      mapService
        .getCurrent()
        .area
        .set(pos, Tile.floorTile());
        return this.succeed();
    }

    else {
      return this.fail();
    }
  }
}