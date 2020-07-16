"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCode = exports.KeyBindings = exports.Input = void 0;
const ROT = __importStar(require("rot-js"));
class Input {
    constructor(name) { this.name = name; }
}
exports.Input = Input;
Input.open = new Input("open");
Input.close = new Input("close");
Input.ok = new Input("ok");
Input.n = new Input("n");
Input.s = new Input("s");
Input.e = new Input("e");
Input.w = new Input("w");
class KeyBinding {
    constructor(charCode) {
        this.charCode = charCode;
    }
}
class KeyBindings {
    constructor() {
        this._bindings = new Map();
    }
    bind(input, keyCode) {
        this._bindings.set(new KeyBinding(keyCode), input);
    }
    find(keyCode) {
        let key;
        let value;
        for ([key, value] of this._bindings.entries()) {
            if (key.charCode === keyCode) {
                return value;
            }
        }
    }
}
exports.KeyBindings = KeyBindings;
class KeyCode {
}
exports.KeyCode = KeyCode;
KeyCode.enter = ROT.KEYS.VK_ENTER;
KeyCode.esc = ROT.KEYS.VK_ESCAPE;
KeyCode.n = ROT.KEYS.VK_UP;
KeyCode.s = ROT.KEYS.VK_DOWN;
KeyCode.e = ROT.KEYS.VK_RIGHT;
KeyCode.w = ROT.KEYS.VK_LEFT;
let test = new KeyBindings();
test.bind(Input.open, KeyCode.enter);
console.log(test);
let test2 = test.find(KeyCode.enter);
console.log(test2);
