import { Actor } from "../core/actor";
import { Game } from "../core/game";
import { Player } from "../player/player";
import { Vec } from "../stage/array2d";


export abstract class Action
{
  private _actor: Actor;

  private _game: Game;

  private _pos: Vec;
  
  get actor() { return this._actor; }

  get game() { return this._game; }

  get pos() { return this._pos; }

  get player() { return this._actor as Player; }

  get isImmediate() { return true; }

  bind(actor: Actor) {
    this._bind(actor, actor.pos, actor.game);
  }

  perform(): ActionResult
  {
    return 
  }

  succeed(): ActionResult 
  {
    return ActionResult.success;
  }

  fail(): ActionResult
  {
    return ActionResult.failure;
  }

  private _bind(actor: Actor, pos: Vec, game: Game)
  {
    this._actor = actor;
    this._pos = pos;
    this._game = game;
  }

  abstract onPerform(): ActionResult;
}


export class ActionResult
{
  static success = new ActionResult(true, true);

  static failure = new ActionResult(false, true);
  
  static notDone = new ActionResult(true, false);

  alternative: Action;

  constructor(
    public succeeded: boolean,
    public done: boolean
  ) {
    // TODO: Figure out a way of traversing the alternative action tree.
  }
}