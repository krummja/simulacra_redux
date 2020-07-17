"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseScreen = void 0;
// Okay this is neat!
// the 'asserts' type operator ensures that the condition (following 'asserts') 
// must be true for the remainder of the remaining scope. That's cool as hell!
function assert(value) {
    if (value === undefined) {
        throw new Error(`value must be defined`);
    }
}
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
    }
    // Unbinds this screen from the [ui] that owns it.
    unbind() {
        assert(this._ui != null);
        this._ui = null;
    }
    // If a keypress has a binding defined for it and is pressed, this will be called with the bound
    // input when this screen is active.
    //
    // IF this returns 'false' (default behavior), then the lower-level [keyDown] method will be called.
    handleInput(input) { return; }
    keyDown(keyCode, shift, alt) { return; }
    keyUp(keyCode, shift, alt) { return; }
    activate(popped, result) { }
    update() { }
    render(terminal) { }
}
exports.BaseScreen = BaseScreen;
