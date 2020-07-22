import { Game } from '../core/game';
import { Actor } from '../core/actor';
import { Tile } from '../../ui';
import { Array2D, Vec } from './array2d';

/**
 * The game's live play area.
 */
export class Stage
{
  tiles: Array2D<Tile> = new Array2D(this._width, this._height);

  actorsByTile: Array2D<Actor> = new Array2D(this._width, this._height);

  get actors() { return this._actors as Iterable<Actor>; }
  private _actors: Actor[] = [];

  get width() { return this.tiles.width; }
  get height() { return this.tiles.height; }

  constructor(
    private _width: number, 
    private _height: number, 
    public game: Game
  ) {}

  addActor(actor: Actor) 
  {
    this._actors.push(actor);
    // this.actorsByTile[actor.pos]
  }

  moveActor(from: Vec, to: Vec)
  {
    let actor = this.actorsByTile.get(from);

    this.actorsByTile.set(from, null);
    this.actorsByTile.set(to, actor);
  }
}