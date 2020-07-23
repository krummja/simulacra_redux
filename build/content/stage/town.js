"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Town = void 0;
const container_1 = require("../../engine/core/container");
const map_1 = require("../../engine/core/map");
const mapService = container_1.container.get("MapService");
class Town {
    constructor(stage) {
        this.stage = stage;
    }
    buildStage(placePlayer) {
        const newMapId = mapService.getMaxId();
        mapService.add(new map_1.Map({
            width: 200,
            height: 100,
            ratio: 0.45,
            iterations: 3
        }));
        mapService.setCurrent(newMapId);
        mapService.getCurrent().generate();
    }
}
exports.Town = Town;
