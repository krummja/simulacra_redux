"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicMenu = void 0;
class BasicMenu {
    constructor(_display, header) {
        this._display = _display;
        this.header = header;
        this.id = 0;
    }
    draw(x, y, w, h) {
        this._display.drawText(x, y, this.header);
        y += 1;
        this._display.drawText(x, y, "This is some test text");
        y += 1;
        this._display.drawText(x, y, "intended to test UIModules.");
    }
}
exports.BasicMenu = BasicMenu;
