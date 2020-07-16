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
exports.main = exports.BaseScreen = exports.KeyCode = exports.KeyBindings = exports.KeyBinding = exports.Input = void 0;
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
        this.keyPress = new KeyBindings();
        this.screens = [];
    }
    get handlingInput() { return this._handlingInput; }
    set handlingInput(v) {
        if (v === this._handlingInput)
            return;
        if (v) {
            document.body.addEventListener("keydown", e => this.keyDown(e));
        }
    }
    push(screen) {
        screen.bind(this);
        this.screens.push(screen);
    }
    keyDown(event) {
        let keyCode = event.keyCode;
        let input = this.keyPress.find(keyCode);
        // Get reference to the last screen in the array.
        let screen = this.screens[this.screens.length - 1];
        if (input != null) {
            event.preventDefault();
            // If the screen already defines the input, return.
            if (screen.handleInput(input))
                return;
        }
        if (screen.keyDown(keyCode)) {
            event.preventDefault();
        }
    }
}
class TestScreen extends BaseScreen {
    constructor() {
        super();
    }
    handleInput(input) {
        switch (input) {
            case Input.n:
                console.log("key Input.n pressed in Main Menu!");
                // this._changeSelection(-1);
                return true;
            case Input.s:
                console.log("key Input.s pressed in Main Menu!");
                // this._changeSelection(1);
                return true;
        }
        return false;
    }
    keyDown(keyCode) {
        switch (keyCode) {
            case KeyCode.n:
                console.log("KeyCode.n logged in Main Menu!");
        }
        return false;
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
    ui.keyPress.bind(Input.n, KeyCode.n);
    ui.handlingInput = true;
    primary[0].drawText(10, 10, "Hello world!");
}
exports.main = main;
function _makeTerminal(width, height, props) {
    const display = new ROT.Display(Object.assign({ width, height }, props));
    const container = display.getContainer();
    return [display, container];
}
