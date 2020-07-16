"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterface = void 0;
const key_bindings_1 = require("./key_bindings");
/**
 * A simple modal user interface layer.
 *
 * It maintains a stack of screens. All screens in the stack update.
 * Screens may indicate if they are opaque or transparent. Transparent
 * screens allow the screen under them to render.
 *
 * In addition, the interface can define a number of global [KeyBindings]
 * which screens can use to map raw keypresses to something higher-level.
 */
class UserInterface {
    // get handlingInput() { return this._handlingInput; }
    // set handlingInput(v: boolean) { 
    //   if (v === this._handlingInput) return;
    //   if (v) {
    //     window.onkeydown = this.keyDown;
    //     window.onkeyup = this.keyUp;
    //   }
    // }
    // private _handlingInput: boolean;
    constructor(terminal) {
        this._terminal = terminal;
        this.screens = [];
        this.keyPress = new key_bindings_1.KeyBindings();
    }
    // get screens() { return this.screens; }
    // private screens: Array<BaseScreen<T>> = new Array<BaseScreen<T>>();
    // The terminal this [UserInterface] is set to render to.
    set terminal(terminal) { this._terminal = terminal; }
    goTo(screen) {
        let old = this.screens.pop();
        old.unbind();
        screen.bind(this);
        this.screens.push(screen);
        this.render();
    }
    refresh() {
        for (let i = 0; i < this.screens.length; i++) {
            this.screens[i].update();
        }
    }
    render() {
        // If the UI isn't bound to a terminal, do nothing.
        if (this._terminal == null)
            return;
        // Clear the terminal each frame.
        this._terminal.clear();
        // Then, for every screen bound to this terminal, draw that screen to the terminal.
        for (let i = 0; i < this.screens.length; i++) {
            this.screens[i].render(this._terminal);
        }
    }
    push(screen) {
        screen.bind(this);
        this.screens.push(screen);
        console.log(this.screens);
        this.render();
    }
    /**
     * Function for handling keydown events.
     * @param event
     */
    keyDown(event) {
        let keyCode = event.keyCode;
        let input = this.keyPress.find(keyCode);
        // Get reference to the last screen in the array.
        let screen = this.screens[this.screens.length - 1];
        if (input != null) {
            event.preventDefault();
            if (screen.handleInput(input))
                return;
        }
        if (screen.keyDown(keyCode)) {
            event.preventDefault();
        }
    }
    /**
     * Function for handling keyup events.
     * @param event
     */
    keyUp(event) {
        let keyCode = event.keyCode;
        // Get reference to the last screen in the array.
        let screen = this.screens[this.screens.length - 1];
        if (screen.keyUp(keyCode)) {
            event.preventDefault();
        }
    }
}
exports.UserInterface = UserInterface;
