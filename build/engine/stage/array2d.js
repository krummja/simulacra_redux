"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2D = void 0;
class Array2D {
    constructor(width, height, value) {
        this.width = width;
        this.height = height;
        this._elements = [];
        for (let x = 0; x < this.width; x++) {
            this._elements[x] = [];
            for (let y = 0; y < this.height; y++) {
                this._elements[x][y] = value;
            }
        }
    }
    get(pos) {
        return this._elements[pos.x][pos.y];
    }
    set(pos, value) {
        this._elements[pos.x][pos.y] = value;
    }
}
exports.Array2D = Array2D;
