"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorService = void 0;
class ActorService {
    constructor() {
        this.actors = [];
    }
    addActor(a) {
        if (this.actors.some((ao) => ao.id === a.id)) {
            throw new Error(`An Actor with ID ${a.id} already exists!`);
        }
        this.actors.push(a);
    }
    clearactors() {
        this.actors = [];
    }
    deleteActorById(id) {
        this.actors = this.actors.filter((e) => e.id !== id);
    }
    getActorById(id) {
        return this.actors.find((a) => a.id === id);
    }
    getActorAtPosition(pos) {
        return this.actors.filter((a) => a.pos.x === pos.x && a.pos.y === pos.y);
    }
    getMaxId() {
        if (this.actors.length === 0) {
            return 0;
        }
        return Math.max(...this.actors.map((e) => e.id));
    }
    newId() {
        let id = Math.floor(100000 + Math.random() * 900000);
        return id;
    }
}
exports.ActorService = ActorService;
