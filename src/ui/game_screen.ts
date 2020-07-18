import * as ROT from 'rot-js';

import { Actor, Content, Game } from '../engine';
import { CharacterSave } from '../engine/character/character_save';
import { Terminal } from '../main';
import { Input } from './input';
import { StagePanel } from './panel/stagepanel';
import { BaseScreen } from './screen';


export class GameScreen extends BaseScreen<Input>
{
  game: Game;
  
  storage: Storage;

  subject: Actor;
  
  private _targetActor: Actor;
  
  private _target: [number, number];

  private _stagePanel: StagePanel;

  constructor(game: Game, storage: Storage)
  {
    super()
    this.game = game;
    this.storage = storage;
  }

  static town(storage: Storage, content: Content, save: CharacterSave)
  {
    let game = new Game(content, save, 120, 48);

    for (let _ in game.generate()) {}

    return new GameScreen(game, storage);
  }

  handleInput(input: Input): boolean
  {
    return false;
  } 

  keyDown(keyCode: number): boolean { return false; }
  keyUp(keyCode: number): boolean { return false; }

  activate(): void
  {

  }

  update(): void
  {

  }

  render(terminal: Terminal): void
  {
    let display = terminal['terminal']
    display.clear();
  }
}