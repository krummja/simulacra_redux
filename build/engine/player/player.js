"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const actor_1 = require("../core/actor");
const container_1 = require("../core/container");
const behavior_1 = require("./behavior");
const mapService = container_1.container.get("MapService");
class Player extends actor_1.Actor {
    constructor(game, pos, save, sightRadius, glyphProps) {
        super(sightRadius, glyphProps);
        this.maxLevel = 50;
        this._behavior = new behavior_1.ActionBehavior(null);
        this.pos = pos;
        this.save = save;
    }
    get needsInput() {
        if (this._behavior != null && this._behavior.canPerform(this)) {
            this.waitForInput();
        }
        return this._behavior = null;
    }
    changePosition(from, to) {
        super.changePosition(from, to);
        // this.game.stage.visibilityChange();
    }
    setNextAction(action) {
        console.log("Setting behavior based on action.");
        this._behavior = new behavior_1.ActionBehavior(action);
    }
    waitForInput() {
        this._behavior = null;
    }
    onGetAction() {
        console.log("Call to onGetAction()");
        return this._behavior.getAction(this);
    }
}
exports.Player = Player;
