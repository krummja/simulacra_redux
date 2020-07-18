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
import { CharacterSave } from '../engine/character/character_save';
import { Background } from '../engine/character/background';
import { BaseClass } from '../engine/character/base_class';
import { GameContent } from '../content';



const _chars = [
"  ____________   ____    ____  _____  _____    ____       ____  ______           ___________      __________   ___________     ___________	",
" /    ___     \\ |    \\   \\   \\/___  \\/___  \\  |    \\     |   / |      |         |     ___   \\    /  ___     \\ |     ___   \\   |     ___   \\",
"|    /   \\____/  \\   |    |  |    |  |   |  |  \\   |     |  |   \\    /           \\   |   \\   |  |  |   \\____/  \\   |   \\   \\   \\   |   \\   |",
"|   |             |  |    |  |    |  |   |  |   |  |     |  |    |  |             |  |    |  |  |  |            |  |    |  |    |  |    |  |",
"|    \\________    |  |    |  |    |  |   |  |   |  |     |  |    |  |             |  |____|  |  |  |            |  |____|  /    |  |____|  |",
" \\________    \\   |  |    |  |    |  |   |  |   |  |     |  |    |  |             |   ____   |  |  |            |   ___   /     |   ____   | ",
" ____     |   |   |  |    |  |    |  |   |  |   |  |     |  |    |  |      ___    |  |    |  |  |  |     ___    |  |   \\  \\     |  |    |  | ",
"/    \\___/    |   |  |_  _|  |    |  |_  |  |_  |   \\___/   |_  _|   \\____/   \\  _|  |    |  |_ |   \\___/   \\  _|  |    \\  \\_  _|  |    |  |_",
"\\_____________/   \\___/  \\___/    \\___/  \\___/  \\_______/\\___/  \\_____________/  \\___/    \\___/  \\__________/  \\___/     \\___/ \\___/    \\___/",
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
    this.content = new GameContent();
    this.storage = new Storage(this.content);
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
        this.ui.push(GameScreen.town(this.content));
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

  render(terminal: Terminal): void
  {
    let display = terminal['terminal'];

    let width = terminal['size'][0];
    let height = terminal['size'][1];

    display.drawText(10, 18, 'Which character shall you play?');

    if (this.storage.characters.length == 0) {
      display.drawText(10, 20, '%c{#ff0000}No characters! Please create a new one.%c{}');
    }

    for (let i = 0; i < this.storage.characters.length; i++) {


      let character: CharacterSave = this.storage.characters[i];
      if (i == this.selection) {
        display.drawText(8, 20 + i, '%c{#cc66ff}▶%c{}')
      }

      let background = character.background as Background;
      let baseClass = character.baseClass as BaseClass;

      display.drawText(10, 20 + i, character.name);
      display.drawText(30, 20 + i, '%c{#999}'+'Lv. 1');
      display.drawText(40, 20 + i, '%c{#999}'+background.name);
      display.drawText(50, 20 + i, '%c{#999}'+baseClass.name);
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
    this.selection = mod((this.selection + offset), this.storage.characters.length);
    this.ui.dirty();
    this.ui.refresh();
  }
}