"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = exports.FRAME = void 0;
const glyph_1 = require("./glyph");
exports.FRAME = {
    T_LEFT: new glyph_1.Glyph({
        character: '◤',
        foreground: '#ffffff',
        background: '#000000'
    }),
    T_RIGHT: new glyph_1.Glyph({
        character: '◥',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_LEFT: new glyph_1.Glyph({
        character: '◣',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_RIGHT: new glyph_1.Glyph({
        character: '◢',
        foreground: '#ffffff',
        background: '#000000'
    }),
    VERTICAL: new glyph_1.Glyph({
        character: '∙',
        foreground: '#ffffff',
        background: '#000000'
    }),
    HORIZONTAL: new glyph_1.Glyph({
        character: '∙',
        foreground: '#ffffff',
        background: '#000000'
    }),
    EMPTY: new glyph_1.Glyph({
        character: ' ',
        foreground: '#000000',
        background: '#000000'
    })
};
class Interface {
    constructor(display, width, height, focused) {
        this.display = display;
        this.width = width;
        this.height = height;
        this.focused = focused;
    }
    _point(x, y, symbol) {
        this.display.draw(x, y, symbol.character, symbol.foreground, symbol.background);
    }
    _horizontal(x, y, w, startSymbol, endSymbol, line) {
        this._point(x, y, startSymbol);
        for (let i = x + 1; i < w + x; i++) {
            this._point(i, y, line);
        }
        this._point(x + w, y, endSymbol);
    }
    _vertical(x, y, h, line) {
        for (let i = y + 1; i < h + y + 1; i++) {
            this._point(x, i, line);
        }
    }
    box(x, y, w, h) {
        w -= 1;
        h -= 1;
        this._horizontal(x, y, w, exports.FRAME.T_LEFT, exports.FRAME.T_RIGHT, exports.FRAME.HORIZONTAL);
        this._vertical(x, y, h, exports.FRAME.VERTICAL);
        this._vertical(x + w, y, h, exports.FRAME.VERTICAL);
        this._horizontal(x, y + h, w, exports.FRAME.B_LEFT, exports.FRAME.B_RIGHT, exports.FRAME.HORIZONTAL);
    }
    draw() {
        this.box(0, 0, this.width, this.height);
    }
}
exports.Interface = Interface;
