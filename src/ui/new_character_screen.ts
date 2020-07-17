import { BaseScreen } from './screen';
import { Input } from './input';
import { Content } from '../engine/core/game';
import { Storage } from './storage';
import { Terminal } from '../main';
import { Panel } from './panel';
import { KeyCode } from './key_bindings';
import { mod } from './util/mod';

class _Field {
  static NAME: number = 0;
  static RACE: number = 1;
  static CLASS: number = 2;
  static count: number = 3;
}


export class NewCharacterScreen extends BaseScreen<Input>
{
  private readonly _maxNameLength: number = 20;

  _field: number = _Field.NAME;
  _name: string = "";
  _defaultName: string = "Aulia";
  _background: number;
  _class: number;

  constructor(
    public content: Content, 
    public storage: Storage
  ) {
    super();
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

      case _Field.RACE:
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

    let panel = new Panel(display, 0, 0, 40, 10)._frame();
    let box = new Panel(display, 2, 5, 36, 3)._box();

    display.drawText(2, 2, "A new dawn rises on a lone");
    display.drawText(2, 3, "adventurer named...");

    if (this._name.length > 0) {
      display.drawText(3, 6, this._name);

      if (this._field == _Field.NAME) {
        display.drawText(3 + this._name.length, 6, " ");
      }
    } 
    
    else {
      if (this._field == _Field.NAME) {
        display.drawText(3, 6, "%c{#cc66ff}" + this._defaultName);
      } else {
        display.drawText(3, 6, this._defaultName);
      }
    }
  }
  
  private _renderBackground(terminal: Terminal): void 
  {

  }

  private _renderClass(terminal: Terminal): void 
  {

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
        return true;

      case KeyCode.tab:
        if (shift) {
          this._changeField(-1);
        } else {
          this._changeField(1);
        }
        console.log(this._field);
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