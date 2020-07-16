import * as ROT from 'rot-js';

import { Content } from '../engine';
import { GameScreen } from './game_screen';
import { Input } from './input';
import { BaseScreen } from './screen';


export class MainMenuScreen extends BaseScreen<Input>
{
  content: Content

  constructor(content: Content)
  {
    super()
    this.content = content;
  }

  handleInput(input: Input): boolean
  {
    switch (input) {
      case Input.n:
        this._changeSelection(-1);
        return true;
      case Input.s:
        this._changeSelection(1);
        return true;
      
      case Input.ok:
        this.ui.push(GameScreen.town(this.content))
        return true;
    }

    return false;
  }

  
  keyDown(keyCode: number): boolean
  {
    return false;
  }

  keyUp(keyCode: number): boolean
  {
    return false;
  }

  activate(): void
  {

  }

  update()
  {
    
  }

  render(terminal: ROT.Display): void
  {
    terminal.drawText(10, 18, 'Test text!');
  }

  private _changeSelection(offset: number): void
  {

  }
}