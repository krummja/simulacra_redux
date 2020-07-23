"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalkAction = void 0;
const action_1 = require("./action");
const direction_1 = require("./direction");
const container_1 = require("../core/container");
const tile_1 = require("../../ui/tile");
const map_1 = require("../core/map");
const mapService = container_1.container.get("MapService");
class WalkAction extends action_1.Action {
    constructor(dir) {
        super();
        this.dir = dir;
    }
    onPerform() {
        if (this.dir == direction_1.Direction.none) {
            return;
        }
        let pos = {
            x: this.actor.pos.x + this.dir.dir.x,
            y: this.actor.pos.y + this.dir.dir.y
        };
        let tile = map_1.Map.getTile(mapService.getCurrent(), pos);
        if (tile.walkable) {
            this.actor.pos = pos;
            return this.succeed();
        }
        else if (tile.diggable) {
            mapService
                .getCurrent()
                .area
                .set(pos, tile_1.Tile.floorTile());
            return this.succeed();
        }
        else {
            return this.fail();
        }
    }
}
exports.WalkAction = WalkAction;
