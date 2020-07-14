"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = void 0;
const entity_1 = require("./entity");
class Actor extends entity_1.Entity {
    constructor(name, sightRadius, renderOrder, glyphProps) {
        super(name, sightRadius, renderOrder, glyphProps);
        this.name = name;
        this.sightRadius = sightRadius;
        this.renderOrder = renderOrder;
        this.glyphProps = glyphProps;
    }
}
exports.Actor = Actor;
