"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCharacterScreen = void 0;
const screen_1 = require("./screen");
const input_1 = require("./input");
const panel_1 = require("./panel");
const key_bindings_1 = require("./key_bindings");
const mod_1 = require("./util/mod");
class _Field {
}
_Field.NAME = 0;
_Field.RACE = 1;
_Field.CLASS = 2;
_Field.count = 3;
class NewCharacterScreen extends screen_1.BaseScreen {
    constructor(content, storage) {
        super();
        this.content = content;
        this.storage = storage;
        this._maxNameLength = 20;
        this._field = _Field.NAME;
        this._name = "";
        this._defaultName = "Aulia";
    }
    render(terminal) {
        let display = terminal['terminal'];
        let width = terminal['size'][0];
        let height = terminal['size'][1];
        display.clear();
        this._renderName(terminal);
        this._renderBackground(terminal);
        this._renderClass(terminal);
        this._renderMenu(terminal);
        let help = ["[Tab] Next field"];
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
    _renderName(terminal) {
        let display = terminal['terminal'];
        let panel = new panel_1.Panel(display, 0, 0, 40, 10)._frame();
        let box = new panel_1.Panel(display, 2, 5, 36, 3)._box();
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
            }
            else {
                display.drawText(3, 6, this._defaultName);
            }
        }
    }
    _renderBackground(terminal) { }
    _renderClass(terminal) { }
    _renderMenu(terminal) { }
    handleInput(input) {
        if (input == input_1.Input.cancel) {
            this.ui.pop();
            return true;
        }
        return false;
    }
    keyDown(keyCode, shift, alt) {
        switch (keyCode) {
            case key_bindings_1.KeyCode.enter:
                return true;
            case key_bindings_1.KeyCode.tab:
                if (shift) {
                    this._changeField(-1);
                }
                else {
                    this._changeField(1);
                }
                console.log(this._field);
                return true;
            case key_bindings_1.KeyCode.back:
                if (this._field == _Field.NAME) {
                    if (this._name.length > 0) {
                        this._name = this._name.substring(0, this._name.length - 1);
                        this.ui.dirty();
                        this.ui.refresh();
                    }
                }
                return true;
            case key_bindings_1.KeyCode.space:
                if (this._field == _Field.NAME) {
                    this._appendToName(" ");
                }
                return true;
            default:
                if (this._field == _Field.NAME && !alt) {
                    let key = keyCode;
                    if (key == null)
                        break;
                    if (key >= key_bindings_1.KeyCode.a && key <= key_bindings_1.KeyCode.z) {
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
    _changeField(offset) {
        this._field = mod_1.mod((this._field + offset + _Field.count), _Field.count);
    }
    _appendToName(text) {
        this._name += text;
        if (this._name.length > this._maxNameLength) {
            this._name = this._name.substring(0, this._maxNameLength);
        }
        this.ui.dirty();
        this.ui.refresh();
    }
    _changeRace(offset) { }
    _changeClass(offset) { }
}
exports.NewCharacterScreen = NewCharacterScreen;