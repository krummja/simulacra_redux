"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = exports.BOX = exports.FRAME = void 0;
const glyph_1 = require("./glyph");
exports.FRAME = {
    T_LEFT: new glyph_1.Glyph({
        character: '╒',
        foreground: '#ffffff',
        background: '#000000'
    }),
    T_RIGHT: new glyph_1.Glyph({
        character: '╕',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_LEFT: new glyph_1.Glyph({
        character: '╘',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_RIGHT: new glyph_1.Glyph({
        character: '╛',
        foreground: '#ffffff',
        background: '#000000'
    }),
    VERTICAL: new glyph_1.Glyph({
        character: ' ',
        foreground: '#ffffff',
        background: '#000000'
    }),
    HORIZONTAL: new glyph_1.Glyph({
        character: '═',
        foreground: '#ffffff',
        background: '#000000'
    }),
    EMPTY: new glyph_1.Glyph({
        character: ' ',
        foreground: '#000000',
        background: '#000000'
    })
};
exports.BOX = {
    T_LEFT: new glyph_1.Glyph({
        character: '┌',
        foreground: '#ffffff',
        background: '#000000'
    }),
    T_RIGHT: new glyph_1.Glyph({
        character: '┐',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_LEFT: new glyph_1.Glyph({
        character: '└',
        foreground: '#ffffff',
        background: '#000000'
    }),
    B_RIGHT: new glyph_1.Glyph({
        character: '┘',
        foreground: '#ffffff',
        background: '#000000'
    }),
    VERTICAL: new glyph_1.Glyph({
        character: ' ',
        foreground: '#ffffff',
        background: '#000000'
    }),
    HORIZONTAL: new glyph_1.Glyph({
        character: ' ',
        foreground: '#ffffff',
        background: '#000000'
    }),
    EMPTY: new glyph_1.Glyph({
        character: ' ',
        foreground: '#000000',
        background: '#000000'
    })
};
/**
 * A basic rectangular UI object.
 *
 * A [Panel] displays a [UIModule] as its internal content.
 * The role of the [Panel] is to encapsulate the [UIModule] and render a frame around it.
 * It also calls [UIModule.draw()] on each render cycle of the main process.
 */
class Panel {
    constructor(display, x, y, width, height, focused) {
        this.display = display;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.focused = focused;
    }
    // Draw a single [Glyph] at position [x, y].
    _point(x, y, symbol) {
        this.display.draw(x, y, symbol.character, symbol.foreground, symbol.background);
    }
    // Draw a horizontal line from [x] to [x+w] on line [y].
    // [startSymbol] and [endSymbol] are the corner symbols.
    _horizontal(x, y, w, startSymbol, endSymbol, line) {
        this._point(x, y, startSymbol);
        for (let i = x + 1; i < w + x; i++) {
            this._point(i, y, line);
        }
        this._point(x + w, y, endSymbol);
    }
    // Draw a vertical line from [y] to [y+h] on column [x].
    _vertical(x, y, h, line) {
        for (let i = y + 1; i < h + y + 1; i++) {
            this._point(x, i, line);
        }
    }
    // Draw a box from [x,y] to [x+w, y+h].
    _frame() {
        let w = this.width -= 1;
        let h = this.height -= 1;
        this._horizontal(this.x, this.y, w, exports.FRAME.T_LEFT, exports.FRAME.T_RIGHT, exports.FRAME.HORIZONTAL);
        this._vertical(this.x, this.y, h, exports.FRAME.VERTICAL);
        this._vertical(this.x + w, this.y, h, exports.FRAME.VERTICAL);
        this._horizontal(this.x, this.y + h, w, exports.FRAME.B_LEFT, exports.FRAME.B_RIGHT, exports.FRAME.HORIZONTAL);
    }
    _box() {
        let w = this.width -= 1;
        let h = this.height -= 1;
        this._horizontal(this.x, this.y, w, exports.BOX.T_LEFT, exports.BOX.T_RIGHT, exports.BOX.HORIZONTAL);
        this._vertical(this.x, this.y, h, exports.BOX.VERTICAL);
        this._vertical(this.x + w, this.y, h, exports.BOX.VERTICAL);
        this._horizontal(this.x, this.y + h, w, exports.BOX.B_LEFT, exports.BOX.B_RIGHT, exports.BOX.HORIZONTAL);
    }
}
exports.Panel = Panel;
