"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResult = exports.Action = void 0;
class Action {
    get actor() { return this._actor; }
    get game() { return this._game; }
    get pos() { return this._pos; }
    get player() { return this._actor; }
    get isImmediate() { return true; }
    bind(actor) {
        this._bind(actor, actor.pos, actor.game);
    }
    perform() {
        return;
    }
    succeed() {
        return ActionResult.success;
    }
    fail() {
        return ActionResult.failure;
    }
    _bind(actor, pos, game) {
        this._actor = actor;
        this._pos = pos;
        this._game = game;
    }
}
exports.Action = Action;
class ActionResult {
    constructor(succeeded, done) {
        this.succeeded = succeeded;
        this.done = done;
        // TODO: Figure out a way of traversing the alternative action tree.
    }
}
exports.ActionResult = ActionResult;
ActionResult.success = new ActionResult(true, true);
ActionResult.failure = new ActionResult(false, true);
ActionResult.notDone = new ActionResult(true, false);
