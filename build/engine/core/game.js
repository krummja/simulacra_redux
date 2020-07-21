"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.Game = void 0;
const stage_1 = require("../stage/stage");
const container_1 = require("./container");
const actorService = container_1.container.get("ActorService");
const mapService = container_1.container.get("MapService");
/**
 * Root class for the game engine. All game state is contained in this.
 */
class Game {
    constructor(content, save, width, height) {
        this.content = content;
        this.save = save;
        this.width = width;
        this.height = height;
        this._stage = new stage_1.Stage(width, height, this);
    }
    get stage() { return this._stage; }
    set stage(s) { this._stage = s; }
    get subject() { return this._subject; }
    set subject(a) { this._subject = a; }
    // Updates the game's internal logic.
    update() {
        return;
    }
    addAction(action) {
        // if (action.isImmediate)
    }
    addEvent() {
    }
    makeResult(madeProgress) {
        return;
    }
}
exports.Game = Game;
/**
 * Defines the actual content for the game: entity types, items, etc.
 * that collectively define the player experience.
 */
class Content {
    constructor() {
        this.baseClasses = [];
        this.backgrounds = [];
    }
}
exports.Content = Content;
/**
 * Each call to [Game.update()] will return a [GameResult] object that tells
 * the UI what happened during that update and what it needs to do.
 */
class GameResult {
}
/**
 * Describes a single "interesting" thing that occurred during a call to
 * [Game.update()]. In general, events correspond to things that a UI is likely
 * to want to display visually in some form.
 */
class Event {
}
/**
 * A kind of [Event] that has occurred.
 */
class EventType {
}
