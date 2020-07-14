"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
/**
 * The game's live play area.
 */
class Stage {
    constructor(width, height, game) {
        this._actors = [];
        this._currentActorIndex = 0;
        this.currentActor = this._actors[this._currentActorIndex];
        this.game = game;
        // TODO: Set up stage tiles in here as well.
    }
}
exports.Stage = Stage;
