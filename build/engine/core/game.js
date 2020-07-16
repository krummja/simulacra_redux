"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = exports.Game = void 0;
/**
 * Root class for the game engine. All game state is contained in this.
 */
class Game {
    constructor(content, width, height) {
        this.content = content;
        this.width = width;
        this.height = height;
    }
    // Set up the map and instantiate the player's character.
    // Yield to FOV calculations
    generate() {
        return;
    }
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
