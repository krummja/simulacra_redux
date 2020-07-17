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
    constructor(charCode, shift, alt) {
        this.charCode = charCode;
        this.shift = shift;
        this.alt = alt;
    }
}
exports.KeyBinding = KeyBinding;
class KeyBindings {
    constructor() {
        this._bindings = new Map();
    }
    get bindings() { return this._bindings; }
    set bindings(v) { this._bindings = v; }
    bind(input, keyCode, shift, alt) {
        this.bindings.set(new KeyBinding(keyCode, shift, alt), input);
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
KeyCode.shift = ROT.KEYS.VK_SHIFT;
KeyCode.alt = ROT.KEYS.VK_ALT;
KeyCode.space = ROT.KEYS.VK_SPACE;
KeyCode.delete = ROT.KEYS.VK_DELETE;
KeyCode.back = ROT.KEYS.VK_BACK_SPACE;
KeyCode.tab = ROT.KEYS.VK_TAB;
KeyCode.enter = ROT.KEYS.VK_ENTER;
KeyCode.esc = ROT.KEYS.VK_ESCAPE;
KeyCode.a = ROT.KEYS.VK_A;
KeyCode.b = ROT.KEYS.VK_B;
KeyCode.c = ROT.KEYS.VK_C;
KeyCode.d = ROT.KEYS.VK_D;
KeyCode.e = ROT.KEYS.VK_E;
KeyCode.f = ROT.KEYS.VK_F;
KeyCode.g = ROT.KEYS.VK_G;
KeyCode.h = ROT.KEYS.VK_H;
KeyCode.i = ROT.KEYS.VK_I;
KeyCode.j = ROT.KEYS.VK_J;
KeyCode.k = ROT.KEYS.VK_K;
KeyCode.l = ROT.KEYS.VK_L;
KeyCode.m = ROT.KEYS.VK_M;
KeyCode.n = ROT.KEYS.VK_N;
KeyCode.o = ROT.KEYS.VK_O;
KeyCode.p = ROT.KEYS.VK_P;
KeyCode.q = ROT.KEYS.VK_Q;
KeyCode.r = ROT.KEYS.VK_R;
KeyCode.s = ROT.KEYS.VK_S;
KeyCode.t = ROT.KEYS.VK_T;
KeyCode.u = ROT.KEYS.VK_U;
KeyCode.v = ROT.KEYS.VK_V;
KeyCode.w = ROT.KEYS.VK_W;
KeyCode.x = ROT.KEYS.VK_X;
KeyCode.y = ROT.KEYS.VK_Y;
KeyCode.z = ROT.KEYS.VK_Z;
KeyCode.up = ROT.KEYS.VK_UP;
KeyCode.down = ROT.KEYS.VK_DOWN;
KeyCode.left = ROT.KEYS.VK_LEFT;
KeyCode.right = ROT.KEYS.VK_RIGHT;
