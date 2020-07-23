"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.Content = exports.Game = void 0;
const queue_1 = require("./queue");
const stage_1 = require("../stage/stage");
const container_1 = require("./container");
const player_1 = require("../player/player");
const map_1 = require("./map");
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
        this._actions = new queue_1.Queue(100);
        this._reactions = [];
        this._player = null;
        this._stage = new stage_1.Stage(width ? width : 100, height ? height : 48, this);
    }
    get stage() { return this._stage; }
    set stage(s) { this._stage = s; }
    get player() { return this._player; }
    set player(p) { this._player = p; }
    update() {
        let madeProgress = false;
        while (true) {
            //! While there are actions to process...
            while (!this._actions.isEmpty) {
                let action = this._actions.queue.shift();
                let result = action.perform();
                //! While there are reactions to process...
                while (this._reactions.length != 0) {
                    let reaction = this._reactions.pop();
                    let result = reaction.perform();
                }
                madeProgress = true;
                //! If result returned done...
                if (result.done) {
                    this._actions.queue.shift();
                    //! And was successful...
                    if (result.succeeded) {
                        //! Do this.
                        action.actor.finishTurn(action);
                        this.stage.advanceActor();
                    }
                    //! If the actor is the player, do this.
                    if (action.actor == this.player)
                        return this.makeResult(madeProgress);
                }
                if (this._events.length != 0)
                    return this.makeResult(madeProgress);
            }
            while (this._actions.isEmpty) {
                let actor = this.stage.currentActor;
                console.log(actor);
                if (actor.needsInput) {
                    return this.makeResult(madeProgress);
                }
                this._actions.enqueue(actor.getAction());
                this.stage.advanceActor();
                if (actor == this._player) {
                    // Implement later;
                }
            }
        }
    }
    initialize() {
        let playerPos = { x: 10, y: 10 };
        this.content.buildStage(this._stage, (pos) => { playerPos = pos; });
        // TODO: I'll have to have a way of getting the illumination value set to a variable later...
        // TODO: Really the Glyph config should be over in the UI anyway.
        this._player = new player_1.Player(this, playerPos, this.save, 10, {
            character: "@",
            foreground: "#f0f",
            background: map_1.Map.getBgTint(mapService.getCurrent(), playerPos, 1)
        });
        this._stage.addActor(this._player);
        // yield "Calculating Visibility";
        // this._stage.refresh();
    }
    makeResult(madeProgress) {
        console.log("Call to makeResult!");
        let result = new GameResult(madeProgress);
        for (let i = 0; i < this._events.length; i++) {
            result.events.push(this._events[i]);
        }
        this._events = [];
        return result;
    }
    addAction(action) {
        if (action.isImmediate) {
            this._reactions.push(action);
        }
        else {
            this._actions.enqueue(action);
        }
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
class GameResult {
    constructor(madeProgress) {
        this.madeProgress = madeProgress;
    }
    get needsRefresh() { return this.madeProgress || this.events.length > 0; }
}
class Event {
}
exports.Event = Event;
