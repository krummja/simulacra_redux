"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noun = exports.Actor = void 0;
const glyph_1 = require("../../ui/glyph");
class Actor {
    constructor(sightRadius, glyphProps) {
        this.sightRadius = sightRadius;
        this.glyphProps = glyphProps;
        this._pos = { x: 0, y: 0 };
        this.glyph = new glyph_1.Glyph(glyphProps);
    }
    get needsInput() { return false; }
    get pos() { return this._pos; }
    set pos(v) { this._pos = v; }
    changePosition(from, to) {
        this.game.stage.moveActor(from, to);
    }
    finishTurn(action) {
        this.onFinishTurn(action);
    }
    onFinishTurn(action) {
        // Do nothing
    }
    getAction() {
        console.log("Call to getAction()");
        let action = this.onGetAction();
        if (action != null)
            action.bind(this);
        return action;
    }
    onGetAction() { return; }
}
exports.Actor = Actor;
class Noun {
}
exports.Noun = Noun;
