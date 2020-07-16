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
exports.KeyCode = exports.KeyBindings = exports.KeyBinding = void 0;
const ROT = __importStar(require("rot-js"));
class KeyBinding {
    constructor(charCode) {
        this.charCode = charCode;
    }
}
exports.KeyBinding = KeyBinding;
class KeyBindings {
    constructor() {
        this._bindings = new Map();
    }
    get bindings() { return this._bindings; }
    set bindings(v) { this._bindings = v; }
    bind(input, keyCode) {
        this.bindings.set(new KeyBinding(keyCode), input);
    }
    find(keyCode) {
        let key;
        let value;
        for ([key, value] of this.bindings.entries()) {
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
