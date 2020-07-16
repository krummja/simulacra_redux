import * as ROT from 'rot-js';

import { Actor, Content, Game } from '../engine';
import { Input } from './input';
import { StagePanel } from './panel/stagepanel';
import { BaseScreen } from './screen';


export class GameScreen extends BaseScreen<Input>
{
  game: Game;
  
  subject: Actor;
  
  private _targetActor: Actor;
  
  private _target: [number, number];

  private _stagePanel: StagePanel;

  constructor(game: Game){
    super()
  }

  static town(content: Content)
  {
    let game = new Game(content, 60, 40);

    for (let _ in game.generate()) {}

    return new GameScreen(game);
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

  render(terminal: ROT.Display): void
  {
    terminal.clear();
  }
}