"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = void 0;
class Panel {
    constructor(screen) {
        this.screen = screen;
    }
    render(terminal) {
        this.renderPanel(terminal);
    }
}
exports.Panel = Panel;
