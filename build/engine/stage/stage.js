"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const array2d_1 = require("./array2d");
const mod_1 = require("../../ui/util/mod");
/**
 * The game's live play area.
 */
class Stage {
    constructor(_width, _height, game) {
        this._width = _width;
        this._height = _height;
        this.game = game;
        this.tiles = new array2d_1.Array2D(this._width, this._height);
        this.actorsByTile = new array2d_1.Array2D(this._width, this._height);
        this._actors = [];
        this._currentActorIndex = 0;
    }
    get actors() { return this._actors; }
    get currentActor() { return this._actors[this._currentActorIndex]; }
    get width() { return this.tiles.width; }
    get height() { return this.tiles.height; }
    addActor(actor) {
        this._actors.push(actor);
        this.actorsByTile.set({ x: actor.pos.x, y: actor.pos.y }, actor);
    }
    moveActor(from, to) {
        let actor = this.actorsByTile.get(from);
        this.actorsByTile.set(from, null);
        this.actorsByTile.set(to, actor);
    }
    advanceActor() {
        console.log("Advancing actor queue!");
        mod_1.mod(this._currentActorIndex + 1, this._actors.length);
    }
}
exports.Stage = Stage;
