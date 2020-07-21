"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const array2d_1 = require("./array2d");
/**
 * The game's live play area.
 */
class Stage {
    constructor(width, height, game) {
        this.width = width;
        this.height = height;
        this.game = game;
        this.tiles = new array2d_1.Array2D(this.width, this.height);
        this.actorsByTile = new array2d_1.Array2D(this.width, this.height);
    }
    moveActor(from, to) {
        let actor = this.actorsByTile.get(from);
        this.actorsByTile.set(from, null);
        this.actorsByTile.set(to, actor);
    }
    removeActor() { }
    advanceActor() { }
    actorAt() { }
    placeDrops() { }
    addItem() { }
    isItemAt() { }
    itemsAt() { }
    forEachItem() { }
    exploreAt() { }
    findOpenTile() { }
}
exports.Stage = Stage;
