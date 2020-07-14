"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataMenu = void 0;
class DataMenu {
    constructor(display, header, focused) {
        this.display = display;
        this.header = header;
        this.focused = focused;
        this.id = 0;
        this._menuList = [];
    }
    get menuList() { return this._menuList; }
    draw(x, y, w, h) {
        this.display.drawText(x, y, this.header);
        y += 1;
        for (const line of this._menuList) {
            y += 1;
            this.display.drawText(x, y, line);
        }
    }
}
exports.DataMenu = DataMenu;
