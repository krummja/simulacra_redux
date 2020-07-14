"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const ui_1 = require("../../ui");
class Entity {
    constructor(name, sightRadius, renderOrder, glyphProps = new ui_1.Glyph(glyphProps)) {
        this.name = name;
        this.sightRadius = sightRadius;
        this.renderOrder = renderOrder;
        this.glyphProps = glyphProps;
        this.active = true;
    }
    get id() { return this._id; }
    set id(v) { this._id = v; }
    static move(entity, x, y) {
        entity.x = x;
        entity.y = y;
    }
    static distanceTo(from, to) {
        return Entity.distanceToPos(from.x, from.y, to.x, to.y);
    }
    static distanceToPos(fromX, fromY, toX, toY) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
exports.Entity = Entity;
