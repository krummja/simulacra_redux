import { BaseScreen } from './screen';
import { Input } from './input';
import { Content } from '../engine/core/game';
import { Storage } from './storage';
import { Terminal } from '../main';
import { Panel } from './frame';
import { KeyCode } from './key_bindings';
import { GameContent } from '../content';
import { mod } from './util/mod';
import { GameScreen } from './game_screen';

class _Field {
  static NAME: number = 0;
  static BACKGROUND: number = 1;
  static CLASS: number = 2;
  static count: number = 3;
}

enum _Background {
  Default,
}

enum _BaseClass {
  Default,
}


export class NewCharacterScreen extends BaseScreen<Input>
{
  private readonly _maxNameLength: number = 20;

  _field: number = _Field.NAME;
  _name: string = "";
  _defaultName: string = "Aulia";
  _background: number = 0;
  _class: number = 0;

  constructor(
    public content: Content, 
    public storage: Storage
  ) {
    super();

    this.content = content;
    this.storage = storage;
  }

  render(terminal: Terminal): void {
    let display = terminal['terminal'];

    let width = terminal['size'][0];
    let height = terminal['size'][1];

    display.clear();
    this._renderName(terminal);
    this._renderBackground(terminal);
    this._renderClass(terminal);
    this._renderMenu(terminal);

    let help: string[] = ["[Tab] Next field"];
    switch (this._field) {
      case _Field.NAME:
        help.push("[A-Z Del] Edit name");
        break;

      case _Field.BACKGROUND:
        help.push("[⬆/⬇] Select background");
        break;

      case _Field.CLASS:
        help.push("[⬆/⬇] Select base class");
        break;
    }

    help.push("[Enter] Finalize");
    help.push("[Esc] Return to Main");
    display.drawText(0, height - 1, help.join(", "));
  }

  private _renderName(terminal: Terminal): void 
  {
    let display = terminal['terminal'];

    let panel = new Panel(display, 0, 0, 40, 10)
    let box = new Panel(display, 2, 5, 24, 3)._box();
    
    if (this._field == _Field.NAME) {
      panel._focused_frame();
      display.drawText(2, 0, "%c{#fc5a03}" + "︱Name︱");
    } else {
      panel._frame();
      display.drawText(2, 0, "%c{#333}" + "︱Name︱");
    }

    display.drawText(2, 2, "A new dawn rises on a lone");
    display.drawText(2, 3, "adventurer named...");

    if (this._name.length > 0) {
      if (this._field == _Field.NAME) {
        display.drawText(4, 6, "%c{#fc5a03}" + this._name);
        display.drawText(30, 6, `${this._name.length}/${this._maxNameLength}`);
      } else {
        display.drawText(4, 6, this._name);
      }

      if (this._field == _Field.NAME) {
        display.drawText(4 + this._name.length, 6, " ");
      }
    } 
    
    else {
      if (this._field == _Field.NAME) {
        display.drawText(4, 6, "%c{#fc5a03}" + this._defaultName);
      } else {
        display.drawText(4, 6, this._defaultName);
      }
    }
  }
  
  private _renderBackground(terminal: Terminal): void 
  {
    let display = terminal['terminal'];

    let panel = new Panel(display, 0, 11, 40, 30);
  
    if (this._field == _Field.BACKGROUND) {
      panel._focused_frame();
      display.drawText(2, 11, "%c{#fc5a03}" + "︱Background︱");
    } else {
      panel._frame();
      display.drawText(2, 11, "%c{#333}" + "︱Background︱");
    }
  }

  private _renderClass(terminal: Terminal): void 
  {
    let display = terminal['terminal'];
    let height = terminal.size[1];

    let panel = new Panel(display, 42, 0, 40, 41);
    if (this._field == _Field.CLASS) {
      panel._focused_frame();
      display.drawText(44, 0, "%c{#fc5a03}" + "︱Base Class︱");
    } else {
      panel._frame();
      display.drawText(44, 0, "%c{#333}" + "︱Base Class︱");
    }
  }
  
  private _renderMenu(terminal: Terminal): void {}

  handleInput(input: Input): boolean { 
    if (input == Input.cancel) {
      this.ui.pop();
      return true;
    }
    return false;
  }

  keyDown(keyCode: number, shift?: boolean, alt?: boolean): boolean 
  { 
    switch (keyCode) {
      case KeyCode.enter:
        let id = Math.floor(100000 + Math.random() * 900000);
        let character = this.content.createPlayer(
          id,
          this._name.length > 0 ? this._name : this._defaultName, 
          this.content.backgrounds[this._background], 
          this.content.baseClasses[this._class]
        );

        this.storage.characters.push(character);
        this.storage.save();

        // this.ui.goTo(GameScreen.town(this.content));
        return true;

      case KeyCode.tab:
        if (shift) {
          this._changeField(-1);
        } else {
          this._changeField(1);
        }
        return true;

      case KeyCode.back:
        if (this._field == _Field.NAME) {
          if (this._name.length > 0) {
            this._name = this._name.substring(0, this._name.length - 1);
            this.ui.dirty();
            this.ui.refresh();
          }
        }
        return true;

      case KeyCode.space:
        if (this._field == _Field.NAME) {
          this._appendToName(" ");
        }
        return true;

      default:
        if (this._field == _Field.NAME && !alt) {
          let key = keyCode;
          if (key == null) break;

          if (key >= KeyCode.a && key <= KeyCode.z) {
            let charCode = key;

            if (!shift) {
              charCode = 'a'.charCodeAt(0) - 'A'.charCodeAt(0) + charCode;
            }

            this._appendToName(String.fromCharCode(charCode));
            return true;
          }
        }
        break;
    }

    return false;
  }
  
  private _changeField(offset: number): void 
  {
    this._field = mod((this._field + offset + _Field.count), _Field.count);
    this.ui.dirty();
    this.ui.refresh();
  }
  
  private _appendToName(text: string): void 
  {
    this._name += text;
    if (this._name.length > this._maxNameLength) {
      this._name = this._name.substring(0, this._maxNameLength);
    }

    this.ui.dirty();
    this.ui.refresh();
  }
  
  private _changeRace(offset: number): void {}
  private _changeClass(offset: number): void {}
}