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
        this._subject = null;
        this._stage = new stage_1.Stage(width ? width : 100, height ? height : 48, this);
    }
    get stage() { return this._stage; }
    set stage(s) { this._stage = s; }
    get subject() { return this._subject; }
    set subject(a) { this._subject = a; }
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
