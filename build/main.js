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
exports.main = exports.BaseScreen = exports.Input = void 0;
const ROT = __importStar(require("rot-js"));
function assert(value) {
    if (value === undefined) {
        throw new Error(`value must be defined`);
    }
}
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
class BaseScreen {
    constructor() {
        this.isTransparent = false;
    }
    // The [UserInterface] this screen is bound to.
    get ui() {
        return this._ui;
    }
    // Binds this screen to [ui].
    bind(ui) {
        assert(this._ui == null);
        this._ui = ui;
        console.log(this._ui);
    }
    // Unbinds this screen from the [ui] that owns it.
    unbind() {
        assert(this._ui != null);
        this._ui = null;
    }
    handleInput(input) { return; }
    keyDown(keyCode) { return; }
    keyUp(keyCode) { return; }
    activate(popped, result) { }
    update() { }
    render(terminal) { }
}
exports.BaseScreen = BaseScreen;
class UserInterface {
    constructor(terminal) {
        this.terminal = terminal;
        this.screens = [];
    }
    push(screen) {
        screen.bind(this);
        this.screens.push(screen);
    }
}
class TestScreen extends BaseScreen {
    constructor() {
        super();
    }
}
function main() {
    var _a;
    let primary = _makeTerminal(100, 48, {
        fontFamily: 'simulacra',
        fontStyle: 'normal',
        fontSize: 13,
        spacing: 1.0,
        forceSquareRatio: true
    });
    (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(primary[1]);
    let ui = new UserInterface(primary[0]);
    ui.push(new TestScreen());
    primary[0].drawText(10, 10, "Hello world!");
}
exports.main = main;
function _makeTerminal(width, height, props) {
    const display = new ROT.Display(Object.assign({ width, height }, props));
    const container = display.getContainer();
    return [display, container];
}
