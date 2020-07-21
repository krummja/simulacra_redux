"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.row = (x, y, size) => { return new Rect(x, y, size, 1); };
        this.column = (x, y, size) => { return new Rect(x, y, 1, size); };
        this.toString = () => { return `${this.pos}-${this.geom}`; };
        this.left = () => { return Math.min(this.x, this.x + this.w); };
        this.top = () => { return Math.min(this.y, this.y + this.h); };
        this.right = () => { return Math.max(this.x, this.x + this.w); };
        this.bottom = () => { return Math.max(this.y, this.y + this.h); };
        this.topLeft = () => { return { x: this.left(), y: this.top() }; };
        this.topRight = () => { return { x: this.right(), y: this.top() }; };
        this.bottomLeft = () => { return { x: this.left(), y: this.bottom() }; };
        this.bottomRight = () => { return { x: this.right(), y: this.bottom() }; };
        this.center = () => { return { x: this.left() + this.right() / 2, y: (this.top() + this.bottom()) / 2 }; };
        this.pos = { x: this.x, y: this.y };
        this.geom = { x: this.w, y: this.h };
    }
}
exports.Rect = Rect;
