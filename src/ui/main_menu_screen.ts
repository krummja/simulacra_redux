import * as ROT from 'rot-js';

import { BaseScreen } from './screen';
import { Input } from './input';


export class MainMenuScreen extends BaseScreen<Input>
{
  // content: Content
  // storage: Storage

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
        // ! On pressing 'enter' (i.e. 'ok') this loads the GameScreen with content.
        // this.ui.push(GameScreen.town(storage, content, save))
        return true;
    }

    return false;
  }

  keyDown(keyCode: number, shift?: boolean, alt?: boolean): boolean
  {
    return false;
  }

  activate(): void
  {

  }

  render(terminal: ROT.Display): void
  {

  }

  private _changeSelection(offset: number): void
  {

  }

  // constructor(content: Content)
  // {
  //   this.content = content;
  // }
}