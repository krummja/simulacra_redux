import { Game } from '../core/game';
import { Actor } from '../core/actor';
import { Tile } from '../../ui';
import { Array2D, Vec } from './array2d';

/**
 * The game's live play area.
 */
export class Stage
{
  tiles: Array2D<Tile> = new Array2D(this.width, this.height);

  actorsByTile: Array2D<Actor> = new Array2D(this.width, this.height);

  constructor(
    public width: number, 
    public height: number, 
    public game: Game
  ) {}

  moveActor(from: Vec, to: Vec)
  {
    let actor = this.actorsByTile.get(from);

    this.actorsByTile.set(from, null);
    this.actorsByTile.set(to, actor);
  }

  removeActor(){}
  advanceActor(){}
  actorAt(){}
  placeDrops(){}
  addItem(){}
  isItemAt(){}
  itemsAt(){}
  forEachItem(){}

  exploreAt(){}
  findOpenTile(){}
}