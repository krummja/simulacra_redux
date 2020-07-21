"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const glyph_1 = require("./glyph");
const color_manager_1 = require("./color_manager");
class Tile {
    constructor(tileProps, glyphProps) {
        this.tileProps = tileProps;
        this.glyphProps = glyphProps;
        this.glyph = new glyph_1.Glyph(this.glyphProps);
        this.walkable = this.tileProps['walkable'];
        this.diggable = this.tileProps['diggable'];
        this.traversable = this.tileProps['traversable'];
        this.opaque = this.tileProps['opaque'];
    }
    static nullTile() {
        return new Tile({}, {});
    }
    static floorTile() {
        let colors = color_manager_1.ColorManager.Colors.CaveFloor;
        return new Tile({
            walkable: true,
            diggable: false,
            opaque: false
        }, {
            character: ' ',
            background: this.pickColor(colors)
        });
    }
    static wallTile() {
        let colors = color_manager_1.ColorManager.Colors.CaveWall;
        return new Tile({
            walkable: false,
            diggable: true,
            opaque: true
        }, {
            character: ' ',
            background: this.pickColor(colors)
        });
    }
}
exports.Tile = Tile;
Tile.pickColor = (colors) => {
    let index = Math.floor(Tile.random(0, colors.length));
    return colors[index];
};
Tile.random = (mn, mx) => {
    return Math.random() * (mx - mn) + mn;
};
