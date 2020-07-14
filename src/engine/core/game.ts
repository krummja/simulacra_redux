import { Action } from '../action/action';
import { Queue } from './queue';


/**
 * Root class for the game engine. All game state is contained in this.
 */
export class Game
{
  // mapService...

  private _events: Array<Event>;

  private _actions: Queue<Action>;
  private _reactions: Array<Action>;
  
  constructor(
    public content: Content,
    public width: number,
    public height: number
  ) {

  }

  // Set up the map and instantiate the player's character.
  // Yield to FOV calculations
  generate()
  {

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
abstract class Content
{
  abstract buildStage(): Iterable<string>;

  // abstract createPlayer()
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