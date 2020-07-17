"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScreen = void 0;
const engine_1 = require("../engine");
const screen_1 = require("./screen");
class GameScreen extends screen_1.BaseScreen {
    constructor(game) {
        super();
    }
    static town(content) {
        let game = new engine_1.Game(content, 60, 40);
        for (let _ in game.generate()) { }
        return new GameScreen(game);
    }
    handleInput(input) {
        return false;
    }
    keyDown(keyCode) { return false; }
    keyUp(keyCode) { return false; }
    activate() {
    }
    update() {
    }
    render(terminal) {
        let display = terminal['terminal'];
        display.clear();
    }
}
exports.GameScreen = GameScreen;
