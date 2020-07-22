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
import { Vec } from '../stage/array2d';

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

  get player() { return this._player; }
  set player(a: Actor) { this._player = a; }
  private _player: Actor = null;
  
  constructor(
    public content: Content,
    public save: CharacterSave,
    public width: number,
    public height: number
  ) {
    this._stage = new Stage(width ? width : 100, height ? height : 48, this);
  }

  *initialize(): Iterable<string>
  {
    let playerPos: Vec = {x: 0, y: 0};
    yield* this.content.buildStage(this._stage, (pos) => { playerPos = pos });

    // this._player = new Player(this, playerPos, this.save);
    // this._stage.addActor(this._player);

    yield "Calculating Visibility";
    // this._stage.refresh();
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
  
  abstract buildStage(stage: Stage, placePlayer: (arg0: Vec) => void): Iterable<string>;

  abstract createPlayer(id: number, name: string, background: Background, baseClass: BaseClass): CharacterSave;
}