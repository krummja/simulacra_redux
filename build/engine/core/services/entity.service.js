"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityService = void 0;
class EntityService {
    constructor() {
        this.entities = [];
    }
    addEntity(e) {
        if (this.entities.some((eo) => eo.id === e.id)) {
            throw new Error(`An entity with ID ${e.id} already exists!`);
        }
        this.entities.push(e);
    }
    clearEntities() {
        this.entities = [];
    }
    deleteEntityById(id) {
        this.entities = this.entities.filter((e) => e.id !== id);
    }
    getEntityById(id) {
        return this.entities.find((e) => e.id === id);
    }
    getEntityAtPosition(x, y) {
        return this.entities.filter((e) => e.x === x && e.y === y);
    }
    getMaxId() {
        if (this.entities.length === 0) {
            return 0;
        }
        return Math.max(...this.entities.map((e) => e.id));
    }
    newId() {
        let id = Math.floor(100000 + Math.random() * 900000);
        return id;
    }
}
exports.EntityService = EntityService;
