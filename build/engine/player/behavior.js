"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionBehavior = void 0;
class Behavior {
}
class ActionBehavior extends Behavior {
    constructor(action) {
        super();
        this.action = action;
    }
    canPerform(player) {
        console.log("Call to Behavior.canPerform()");
        return true;
    }
    getAction(player) {
        console.log("Call to Behavior.getAction()");
        player.waitForInput();
        return this.action;
    }
}
exports.ActionBehavior = ActionBehavior;
