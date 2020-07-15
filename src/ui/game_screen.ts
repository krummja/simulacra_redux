import * as ROT from 'rot-js';
import { BaseScreen } from './screen';
import { Input } from './input';
import { Actor, Game, Content } from '../engine';
import { StagePanel } from './panel/stagepanel';


export class GameScreen extends BaseScreen<Input>
{
  game: Game;
  subject: Actor;
  private _targetActor: Actor;
  private _target: [number, number];

  private _stagePanel: StagePanel;

  render(terminal: ROT.Display): void
  {
    terminal.clear();
  }

  constructor(game: Game){
    super()
  }

  static town(content: Content)
  {
    let game = new Game(content, 60, 40);

    for (let _ in game.generate()) {}

    return new GameScreen(game);
  }
}