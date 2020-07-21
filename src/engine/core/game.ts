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
  set stage(s: Stage) { this._stage = s; }
  private _stage: Stage;

  get subject() { return this._subject; }
  set subject(a: Actor) { this._subject = a; }
  private _subject: Actor = null;
  
  constructor(
    public content: Content,
    public save: CharacterSave,
    public width: number,
    public height: number
  ) {
    this._stage = new Stage(width ? width : 100, height ? height : 48, this);
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