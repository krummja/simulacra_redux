"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMenu = void 0;
const line_1 = require("../line");
class EntityMenu {
    constructor(_display, header, selection, config, focused) {
        this._display = _display;
        this.header = header;
        this.selection = selection;
        this.config = config;
        this.focused = focused;
        this.id = 0;
        this.menuList = [];
    }
    draw(x, y, w, h) {
        this._display.drawText(x, y, this.header);
        y += 2;
        let renderData = [];
        for (let entity of this.menuList) {
            let item = line_1.Line(w, `${entity.glyph.character}`, `${entity.name}`, '', this.config);
            renderData.push(item);
        }
        for (let i = 0; i < renderData.length; i++) {
            if (this.focused && i === this.selection) {
                renderData[i] = "%c{#fc5a03}" + renderData[i];
            }
            this._display.drawText(x, i + y, renderData[i], w);
        }
        y++;
    }
    saturate(target) {
        target.map((item) => { this.menuList.push(item); });
    }
}
exports.EntityMenu = EntityMenu;
