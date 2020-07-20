import { Action } from '../action/action';
import { Queue } from './queue';
import { CharacterSave } from '../character/character_save';
import { BaseClass } from '../character/base_class';
import { Background } from '../character/background';
import { Stage } from '../stage/stage';
import { Actor } from './actor';
import { MapService } from './services/map.service';
import { ActorService } from './services/actor.service';
import { container } from './container';

const actorService = container.get<ActorService>("ActorService");
const mapService = container.get<MapService>("MapService");

/**
 * Root class for the game engine. All game state is contained in this.
 */
export class Game
{
  private _events: Array<Event>;

  private _actions: Queue<Action>;

  private _reactions: Array<Action>;

  get stage() { return this._stage; }
  private _stage: Stage;

  get subject() { return this._subject; }
  private _subject: Actor;
  
  constructor(
    public content: Content,
    public save: CharacterSave,
    public width: number,
    public height: number
  ) {

  }

  // Updates the game's internal logic.
  update(): GameResult
  {
    return
  }

  addAction(action: Action): void
  {
    // if (action.isImmediate)
  }

  addEvent(): void
  {

  }

  makeResult(madeProgress: boolean): GameResult
  {
    return
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
  
  abstract buildStage(): Iterable<string>;

  abstract createPlayer(id: number, name: string, background: Background, baseClass: BaseClass): CharacterSave;
}


/**
 * Each call to [Game.update()] will return a [GameResult] object that tells
 * the UI what happened during that update and what it needs to do.
 */
class GameResult
{

}


/**
 * Describes a single "interesting" thing that occurred during a call to
 * [Game.update()]. In general, events correspond to things that a UI is likely
 * to want to display visually in some form.
 */
class Event
{

}


/**
 * A kind of [Event] that has occurred.
 */
class EventType
{

}