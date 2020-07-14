"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = void 0;
class Glyph {
    constructor(properties) {
        this.character = properties['character'] || ' ';
        this.font = properties['font'] || ' ';
        this.foreground = properties['foreground'] || '#ffffff';
        this.background = properties['background'] || '#000000';
    }
}
exports.Glyph = Glyph;
