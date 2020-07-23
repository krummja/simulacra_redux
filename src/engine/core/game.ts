import { Action } from '../action/action';
import { Queue } from './queue';
import { CharacterSave } from '../player/character_save';
import { BaseClass } from '../player/base_class';
import { Background } from '../player/background';
import { Stage } from '../stage/stage';
import { Actor } from './actor';
import { MapService } from './services/map.service';
import { ActorService } from './services/actor.service';
import { container } from './container';
import { Vec } from '../stage/array2d';
import { Player } from '../player/player';
import { Tile } from '../../ui/tile';
import { Map } from './map';

const actorService = container.get<ActorService>("ActorService");
const mapService = container.get<MapService>("MapService");

/**
 * Root class for the game engine. All game state is contained in this.
 */
export class Game
{
  private _events: Array<Event>;

  private _actions: Queue<Action> = new Queue(100);

  private _reactions: Array<Action> = [];

  private _stage: Stage;
  
  private _player: Player = null;

  get stage() { return this._stage; }

  set stage(s: Stage) { this._stage = s; }

  get player() { return this._player; }

  set player(p: Player) { this._player = p; }
  
  constructor(
    public content: Content,
    public save: CharacterSave,
    public width: number,
    public height: number
  ) {
    this._stage = new Stage(width ? width : 100, height ? height : 48, this);
  }

  update(): GameResult
  {
    let madeProgress = false;

    while (true) {

      //! While there are actions to process...
      while (!this._actions.isEmpty) {

        let action = this._actions.queue.shift();
        let result = action.perform();

        //! While there are reactions to process...
        while (this._reactions.length != 0) {
          let reaction = this._reactions.pop();
          let result = reaction.perform();
        }

        madeProgress = true;
  
        //! If result returned done...
        if (result.done) {
          this._actions.queue.shift();

          //! And was successful...
          if (result.succeeded) {

            //! Do this.
            action.actor.finishTurn(action);
            this.stage.advanceActor();
          }

          //! If the actor is the player, do this.
          if (action.actor == this.player) return this.makeResult(madeProgress);
        }

        if (this._events.length != 0) return this.makeResult(madeProgress);
      }

      while (this._actions.isEmpty) {
        let actor = this.stage.currentActor;
        console.log(actor);

        if (actor.needsInput) {
          return this.makeResult(madeProgress);
        }

        this._actions.enqueue(actor.getAction())
        this.stage.advanceActor();

        if (actor == this._player) {
          // Implement later;
        }
      }
    }
  }

  initialize(): void
  {
    let playerPos: Vec = {x: 10, y: 10};
    this.content.buildStage(this._stage, (pos) => { playerPos = pos });

    // TODO: I'll have to have a way of getting the illumination value set to a variable later...
    // TODO: Really the Glyph config should be over in the UI anyway.
    this._player = new Player(this, playerPos, this.save, 10, { 
      character: "@",
      foreground: "#f0f",
      background: Map.getBgTint(mapService.getCurrent(), playerPos, 1)
     });
    this._stage.addActor(this._player);

    // yield "Calculating Visibility";
    // this._stage.refresh();
  }

  makeResult(madeProgress: boolean): GameResult 
  {
    console.log("Call to makeResult!");
    let result = new GameResult(madeProgress);
    for (let i = 0; i < this._events.length; i++) {
      result.events.push(this._events[i]);
    }
    this._events = [];
    return result;
  }

  addAction(action: Action)
  {
    if (action.isImmediate) {
      this._reactions.push(action);
    } else {
      this._actions.enqueue(action);
    }
  }
}


/**
 * Defines the actual content for the game: entity types, items, etc.
 * that collectively define the player experience.
 */
export abstract class Content
{
  baseClasses: BaseClass[] = [];
  
  backgrounds: Background[] = [];
  
  abstract buildStage(stage: Stage, placePlayer: (arg0: Vec) => void): void;

  abstract createPlayer(id: number, name: string, background: Background, baseClass: BaseClass): CharacterSave;
}


class GameResult
{
  events: Array<Event>;

  get needsRefresh() { return this.madeProgress || this.events.length > 0; }

  constructor(public madeProgress: boolean) {}
}


export class Event 
{

}