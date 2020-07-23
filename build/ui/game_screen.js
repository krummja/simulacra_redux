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
        this.player = null;
        this.game = game;
        this.storage = storage;
        this.player = this.game.player;
        this._stagePanel = new stagepanel_1.StagePanel(this, 50, 0, 100, 48);
    }
    drawStageGlyph(terminal, x, y, glyph) {
        this._stagePanel.drawStageGlyph(terminal, x, y, glyph);
    }
    handleInput(input) {
        let action;
        switch (input) {
            case input_1.Input.n:
                console.log("Input detected!");
                action = new engine_1.WalkAction(engine_1.Direction.n);
                break;
            case input_1.Input.s:
                console.log("Input detected!");
                action = new engine_1.WalkAction(engine_1.Direction.s);
                break;
            case input_1.Input.e:
                console.log("Input detected!");
                action = new engine_1.WalkAction(engine_1.Direction.e);
                break;
            case input_1.Input.w:
                console.log("Input detected!");
                action = new engine_1.WalkAction(engine_1.Direction.w);
                break;
        }
        if (action != null) {
            console.log("Setting next action");
            this.game.player.setNextAction(action);
            this.ui.refresh();
        }
        return true;
    }
    keyDown(keyCode) { return false; }
    keyUp(keyCode) { return false; }
    render(terminal) {
        let display = terminal['terminal'];
        display.clear();
        this._stagePanel.render(terminal);
        for (const actor of this.game.stage.actors) {
            this.drawStageGlyph(terminal, actor.pos.x, actor.pos.y, actor.glyph);
        }
    }
    update() {
        console.log("Call to GameScreen.update()!");
        let result = this.game.update();
        if (this._stagePanel.update(result.events))
            this.ui.dirty();
        if (result.needsRefresh)
            this.ui.dirty();
        this.ui.refresh();
    }
    static initialize(storage, content, save) {
        let game = new engine_1.Game(content, save, 100, 48);
        game.initialize();
        return new GameScreen(game, storage);
    }
}
exports.GameScreen = GameScreen;
