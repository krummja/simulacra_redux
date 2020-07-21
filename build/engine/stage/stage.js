"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const array2d_1 = require("./array2d");
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
    }
    get width() { return this.tiles.width; }
    get height() { return this.tiles.height; }
    moveActor(from, to) {
        let actor = this.actorsByTile.get(from);
        this.actorsByTile.set(from, null);
        this.actorsByTile.set(to, actor);
    }
}
exports.Stage = Stage;
