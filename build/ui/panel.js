"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = exports.FRAME = void 0;
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
/**
 * A basic rectangular UI object.
 *
 * A [Panel] displays a [UIModule] as its internal content.
 * The role of the [Panel] is to encapsulate the [UIModule] and render a frame around it.
 * It also calls [UIModule.draw()] on each render cycle of the main process.
 */
class Panel {
    constructor(display, x, y, width, height, module, focused) {
        this.display = display;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.module = module;
        this.focused = focused;
    }
    // The main render function.
    // The [Panel] frame and then the internal contents are rendered.
    draw() {
        this._box(this.x, this.y, this.width, this.height);
        this._content(this.module);
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
    _box(x, y, w, h) {
        w -= 1;
        h -= 1;
        this._horizontal(x, y, w, exports.FRAME.T_LEFT, exports.FRAME.T_RIGHT, exports.FRAME.HORIZONTAL);
        this._vertical(x, y, h, exports.FRAME.VERTICAL);
        this._vertical(x + w, y, h, exports.FRAME.VERTICAL);
        this._horizontal(x, y + h, w, exports.FRAME.B_LEFT, exports.FRAME.B_RIGHT, exports.FRAME.HORIZONTAL);
    }
    // The space within the [Panel] that can render substantive content.
    // The content itself is drawn from a [module] which gets drawn to the internal dimensions of [Panel].
    _content(module) {
        let x = this.x + 1;
        let y = this.y + 1;
        let w = this.width - 2;
        let h = this.height - 2;
        module.draw(x, y, w, h);
    }
}
exports.Panel = Panel;
