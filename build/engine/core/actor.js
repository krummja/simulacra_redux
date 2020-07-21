"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noun = exports.Actor = void 0;
class Actor {
    constructor(name, sightRadius, renderOrder, glyphProps) {
        this.name = name;
        this.sightRadius = sightRadius;
        this.renderOrder = renderOrder;
        this.glyphProps = glyphProps;
        this._pos = { x: 0, y: 0 };
    }
    get pos() { return this._pos; }
    set pos(v) { this._pos = v; }
    changePosition(from, to) {
        this.game.stage.moveActor(from, to);
    }
}
exports.Actor = Actor;
class Noun {
}
exports.Noun = Noun;
