import { Game } from '../core/game';
import { Actor } from '../core/actor';
import { Tile } from '../../ui';
import { Array2D, Vec } from './array2d';
import { mod } from '../../ui/util/mod';

/**
 * The game's live play area.
 */
export class Stage
{
  tiles: Array2D<Tile> = new Array2D(this._width, this._height);

  actorsByTile: Array2D<Actor> = new Array2D(this._width, this._height);

  private _actors: Actor[] = [];

  private _currentActorIndex: number = 0;
  
  get actors() { return this._actors as Iterable<Actor>; }

  get currentActor() { return this._actors[this._currentActorIndex]; }

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
    this.actorsByTile.set({x: actor.pos.x, y: actor.pos.y}, actor);
  }

  moveActor(from: Vec, to: Vec)
  {
    let actor = this.actorsByTile.get(from);

    this.actorsByTile.set(from, null);
    this.actorsByTile.set(to, actor);
  }

  advanceActor()
  {
    console.log("Advancing actor queue!");
    mod(this._currentActorIndex + 1, this._actors.length);
  }
}