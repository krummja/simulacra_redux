"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = void 0;
const ROT = __importStar(require("rot-js"));
const color_manager_1 = require("../../ui/color_manager");
const tile_1 = require("../../ui/tile");
const array2d_1 = require("../stage/array2d");
class Map {
    constructor(config) {
        this.id = 0;
        this.width = config['width'];
        this.height = config['height'];
        this.ratio = config['ratio'];
        this.iterations = config['iterations'];
        this.area = new array2d_1.Array2D(this.width, this.height, tile_1.Tile.nullTile());
        this.explored = new array2d_1.Array2D(this.width, this.height, false);
    }
    generate() {
        let generator = new ROT.Map.Cellular(this.width, this.height);
        let iterations = this.iterations;
        generator.randomize(this.ratio);
        for (let i = 0; i < iterations - 1; i++) {
            generator.create();
        }
        generator.create((x, y, v) => {
            if (v === 1) {
                this.area.set({ x: x, y: y }, tile_1.Tile.floorTile());
            }
            else {
                this.area.set({ x: x, y: y }, tile_1.Tile.wallTile());
            }
        });
    }
    static getTile(map, pos) {
        if (pos.x < 0 || pos.x >= map.width || pos.y < 0 || pos.y >= map.height) {
            return tile_1.Tile.nullTile();
        }
        return map.area.get(pos) || tile_1.Tile.nullTile();
    }
    static getBgTint(map, pos, illumination) {
        let tile = Map.getTile(map, pos);
        let color = tile.glyph.background;
        let bg = color_manager_1.ColorManager.darken(color, illumination);
        return bg;
    }
    getRandomFloorPosition(map) {
        let x = 0;
        let y = 0;
        while (Map.getTile(map, { x: x, y: y }).walkable === false) {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);
        }
        return { x: x, y: y };
    }
    addActorAtRandomPosition(map, actor) {
        let position = this.getRandomFloorPosition(map);
        actor.pos.x = position.x;
        actor.pos.y = position.y;
    }
}
exports.Map = Map;
