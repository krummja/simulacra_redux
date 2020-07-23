"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = void 0;
class Direction {
    constructor(dir) { this.dir = dir; }
}
exports.Direction = Direction;
Direction.none = new Direction({ x: 0, y: 0 });
Direction.n = new Direction({ x: 0, y: -1 });
Direction.s = new Direction({ x: 0, y: 1 });
Direction.e = new Direction({ x: 1, y: 0 });
Direction.w = new Direction({ x: -1, y: 0 });
Direction.ne = new Direction({ x: 1, y: -1 });
Direction.se = new Direction({ x: 1, y: 1 });
Direction.nw = new Direction({ x: -1, y: -1 });
Direction.sw = new Direction({ x: -1, y: 1 });
