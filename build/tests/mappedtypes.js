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
const ROT = __importStar(require("rot-js"));
function freezePoint(p) {
    // lib.d.ts defines freeze as:
    // freeze<T>(o: T): Readonly<T>;
    // 'Readonly<T>' is a mapped type
    return Object.freeze(p);
}
const originPoint = freezePoint({ x: 0, y: 0 });
/**
 * The type Readonly<T> is defined as follows:
 *
 * type Readonly<T> = {
 *   readonly [P in keyof T]: T[P]
 * };
 *
 * We can read this as:
 *  The type that takes in some T and returns a readonly variable for...
 *    each property P for each key of T, return T which maps P.
 */
/**
 * We can understand what's happening by substituting:
 *
 *  We could, ostensibly, represent this as: λT.[Readonly<T>]
 *
 * 1. type ReadonlyPoint = Readonly<T> <- (Point for T)
 *
 * 2. type ReadonlyPoint = Readonly<Point>;
 *
 * 3. type ReadonlyPoint = {
 *      readonly [P in keyof Point]: Point[P]
 *    }
 *
 * 4. type ReadonlyPoint = {
 *      readonly [P in "x" | "y"]: Point[P]
 *    }
 *
 * 5. type ReadonlyPoint = {
 *      readonly x: Point["x"];
 *      readonly y: Point["y"];
 *    }
 *
 * 6. type ReadonlyPoint = {
 *      readonly x: number;
 *      readonly y: number;
 *    }
 */
// console.log(Input.t) = Input { name: 't' }
class InputA {
    constructor(name) {
        this.name = name;
    }
}
InputA.t = new InputA("tA");
InputA.e = new InputA("e");
InputA.s = new InputA("s");
class InputB {
    constructor(name) {
        this.name = name;
    }
}
InputB.t = new InputB("tB");
class KeyBindings {
    constructor() {
        // KeyBindings<Input>.bindings = [KeyBinding -> Input];
        this.bindings = new Map();
    }
    bind(input, keyCode) {
        this.bindings.set(new KeyBinding(keyCode), input);
        console.log(this.bindings);
    }
}
class KeyBinding {
    constructor(charCode) {
        this.charCode = charCode;
    }
}
let T_Key = ROT.KEYS.VK_T;
let E_Key = ROT.KEYS.VK_E;
let S_Key = ROT.KEYS.VK_S;
let T_Bound = new KeyBinding(T_Key);
let E_Bound = new KeyBinding(E_Key);
let S_Bound = new KeyBinding(S_Key);
class KeyCode {
}
KeyCode.t = ROT.KEYS.VK_T;
class UserInterface {
    constructor() {
        // Ah! variable keyPress is TYPE KeyBindings<T>! This is a mapped type!
        this.keyPress = new KeyBindings();
    }
}
let _uiA = new UserInterface();
let _uiB = new UserInterface();
// Returns as UserInterface { keyPress: KeyBindings { bindings: Map {} } }
console.log(_uiA);
console.log(_uiB);
let testA = _uiA.keyPress.bind(InputA.t, KeyCode.t);
let testB = _uiB.keyPress.bind(InputB.t, KeyCode.t);
function testFunc(v) {
    console.log(`${v} is of type ${typeof v}`);
}
let test = testFunc('foo');
let test2 = testFunc(12);
let testMap = new Map();
