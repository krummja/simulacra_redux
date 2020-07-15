import * as ROT from 'rot-js';
import { BaseScreen } from './screen';
import { Input } from './input';
import { Actor, Game } from '../engine';


export class GameScreen extends BaseScreen<Input>
{
  game: Game;
  subject: Actor;

  // Looks like the FSM goes in here.

  render(terminal: ROT.Display): void
  {
    terminal.clear();
  }
}