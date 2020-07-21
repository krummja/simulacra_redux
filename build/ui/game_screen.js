"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameScreen = void 0;
const engine_1 = require("../engine");
const input_1 = require("./input");
const stagepanel_1 = require("./panel/stagepanel");
const screen_1 = require("./screen");
class GameScreen extends screen_1.BaseScreen {
    constructor(game, storage) {
        super();
        this.subject = null;
        this.game = game;
        this.storage = storage;
        this._stagePanel = new stagepanel_1.StagePanel(this, 50, 0, 100, 48);
        this.subject = this.game.subject;
    }
    drawStageGlyph(terminal, x, y, glyph) {
        this._stagePanel.drawStageGlyph(terminal, x, y, glyph);
    }
    handleInput(input) {
        switch (input) {
            case input_1.Input.ok:
                console.log("Enter pressed in Game Screen!");
                this.ui.dirty();
                this.ui.refresh();
        }
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
        this._stagePanel.render(terminal);
    }
    static town(storage, content, save) {
        let game = new engine_1.Game(content, save, 100, 48);
        game.subject = null;
        return new GameScreen(game, storage);
    }
}
exports.GameScreen = GameScreen;
