import { Game } from '../core/game';
import { Actor } from '../core/actor';

/**
 * The game's live play area.
 */
export class Stage
{
  game: Game;

  private _actors: Array<Actor> = [];

  private _currentActorIndex: number = 0;

  currentActor: Actor = this._actors[this._currentActorIndex];

  constructor(width: number, height: number, game: Game)
  {
    this.game = game;
    // TODO: Set up stage tiles in here as well.
  }
}