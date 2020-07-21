"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuScreen = void 0;
const input_1 = require("./input");
const key_bindings_1 = require("./key_bindings");
const new_character_screen_1 = require("./new_character_screen");
const screen_1 = require("./screen");
const storage_1 = require("./storage");
const mod_1 = require("./util/mod");
const content_1 = require("../content");
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
class MainMenuScreen extends screen_1.BaseScreen {
    constructor(content) {
        super();
        this.selection = 0;
        this.renderList = [];
        this.content = new content_1.GameContent();
        this.storage = new storage_1.Storage(this.content);
    }
    // [handleInput] defines what to do when an [Input] is invoked, regardless of KeyCode binding.
    handleInput(input) {
        switch (input) {
            case input_1.Input.n:
                this._changeSelection(-1);
                return true;
            case input_1.Input.s:
                this._changeSelection(1);
                return true;
            case input_1.Input.ok:
                // this.ui.push(GameScreen.town(this.content));
                return true;
        }
        return false;
    }
    // [keyDown] defines what to do when a [KeyCode] is invoked, regardless of Input mapping.
    keyDown(keyCode) {
        switch (keyCode) {
            case key_bindings_1.KeyCode.d:
                return true;
            case key_bindings_1.KeyCode.n:
                this.ui.push(new new_character_screen_1.NewCharacterScreen(this.content, this.storage));
                return true;
        }
        return false;
    }
    render(terminal) {
        let display = terminal['terminal'];
        let width = terminal.size.x;
        let height = terminal.size.y;
        display.drawText(10, 18, 'Which character shall you play?');
        if (this.storage.characters.length == 0) {
            display.drawText(10, 20, '%c{#ff0000}No characters! Please create a new one.%c{}');
        }
        for (let i = 0; i < this.storage.characters.length; i++) {
            let character = this.storage.characters[i];
            if (i == this.selection) {
                display.drawText(8, 20 + i, '%c{#cc66ff}▶%c{}');
            }
            let background = character.background;
            let baseClass = character.baseClass;
            display.drawText(10, 20 + i, character.name);
            display.drawText(30, 20 + i, '%c{#999}' + 'Lv. 1');
            display.drawText(40, 20 + i, '%c{#999}' + background.name);
            display.drawText(50, 20 + i, '%c{#999}' + baseClass.name);
        }
        for (let y = 0; y < _chars.length; y++) {
            for (let x = 0; x < _chars[y].length; x++) {
                display.drawText(x + 1, y + 1, _chars[y][x]);
            }
        }
        display.drawText((width - 66) / 2, (height - 1), '[enter] select, [⬆/⬇] change selection, [N] create new, [D] delete');
    }
    _changeSelection(offset) {
        this.selection = mod_1.mod((this.selection + offset), this.storage.characters.length);
        this.ui.dirty();
        this.ui.refresh();
    }
}
exports.MainMenuScreen = MainMenuScreen;
