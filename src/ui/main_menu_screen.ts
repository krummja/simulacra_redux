import * as ROT from 'rot-js';

import { Content } from '../engine';
import { Terminal } from '../main';
import { GameScreen } from './game_screen';
import { Input } from './input';
import { KeyCode } from './key_bindings';
import { NewCharacterScreen } from './new_character_screen';
import { BaseScreen } from './screen';
import { Storage } from './storage';
import { mod } from './util/mod';

type CharacterData = {
  name: string;
  level: string;
  race: string;
  class: string;
}

const _chars = [
  "◢■■■■■■■◣",
  "▁▂▃▄▅▆▇▉▊",
  "◥◤❚〓█▌▐▍▎▏",
  "▏▕░▬▔▰∎▮"
];


export class MainMenuScreen extends BaseScreen<Input>
{
  content: Content;
  storage: Storage;

  display: ROT.Display;
  selection: number = 0;

  renderList: CharacterData[] = [];

  constructor(content: Content)
  {
    super()
    this.content = content;
  }

  // [handleInput] defines what to do when an [Input] is invoked, regardless of KeyCode binding.
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

  // [keyDown] defines what to do when a [KeyCode] is invoked, regardless of Input mapping.
  keyDown(keyCode: number): boolean
  {
    switch (keyCode) {
      case KeyCode.d:
        return true;
      
      case KeyCode.n:
        this.ui.push(new NewCharacterScreen(this.content, this.storage));
        return true;
    }
    return false;
  }

  activate(): void
  {

  }

  render(terminal: Terminal): void
  {
    let display = terminal['terminal'];

    let width = terminal['size'][0];
    let height = terminal['size'][1];

    display.drawText(10, 18, 'Which character shall you play?');

    if (this.renderList.length == 0) {
      display.drawText(10, 20, '%c{#ff0000}No characters! Please create a new one.%c{}');
    }

    for (let i = 0; i < this.renderList.length; i++) {
      let character: CharacterData = this.renderList[i];
      if (i == this.selection) {
        display.drawText(8, 20 + i, '%c{#cc66ff}▶%c{}')
      }

      display.drawText(10, 20 + i, character.name);
      display.drawText(30, 20 + i, '%c{#555}'+character.level);
      display.drawText(40, 20 + i, '%c{#555}'+character.race);
      display.drawText(50, 20 + i, '%c{#555}'+character.class);
    }

    for (let y = 0; y < _chars.length; y++) {
      for (let x = 0; x < _chars[y].length; x ++) {
        display.drawText(x + 1, y + 1, _chars[y][x]);
      }
    }
    
    display.drawText(
      (width - 66) / 2, 
      (height - 1), 
      '[enter] select, [⬆/⬇] change selection, [N] create new, [D] delete');
  }

  private _changeSelection(offset: number): void
  {
    this.selection = mod((this.selection + offset), this.renderList.length);
    this.ui.dirty();
    this.ui.refresh();
  }
}