"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
class Input {
    constructor(name) { this.name = name; }
}
exports.Input = Input;
Input.ok = new Input("ok");
Input.cancel = new Input("cancel");
Input.open = new Input("open");
Input.close = new Input("close");
Input.n = new Input("n");
Input.s = new Input("s");
Input.e = new Input("e");
Input.w = new Input("w");
