"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainMenuScreen = void 0;
const game_screen_1 = require("./game_screen");
const input_1 = require("./input");
const screen_1 = require("./screen");
class MainMenuScreen extends screen_1.BaseScreen {
    constructor(content) {
        super();
        this.content = content;
    }
    handleInput(input) {
        switch (input) {
            case input_1.Input.n:
                console.log("key Input.n pressed in Main Menu!");
                // this._changeSelection(-1);
                return true;
            case input_1.Input.s:
                console.log("key Input.s pressed in Main Menu!");
                // this._changeSelection(1);
                return true;
            case input_1.Input.ok:
                this.ui.push(game_screen_1.GameScreen.town(this.content));
                return true;
        }
        return false;
    }
    keyDown(keyCode) {
        return false;
    }
    keyUp(keyCode) {
        return false;
    }
    activate() {
    }
    update() {
    }
    render(terminal) {
        terminal.drawText(10, 18, 'Test text!');
    }
    _changeSelection(offset) {
    }
}
exports.MainMenuScreen = MainMenuScreen;
