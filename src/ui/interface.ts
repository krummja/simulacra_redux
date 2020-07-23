import * as ROT from 'rot-js';
import { BaseScreen } from './screen';
import { KeyCode, KeyBindings, KeyBinding } from './key_bindings';
import { Terminal } from '../main';


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
export class UserInterface<T>
{
  // The terminal that will render this specific UI.
  display: ROT.Display;

  // Define the game's set of valid keybindings.
  keyPress: KeyBindings<T> = new KeyBindings<T>();

  // The current set of screens bound to this [UserInterface].
  screens: BaseScreen<T>[] = [];

  // If the UI is dirty, re-render
  private _dirty: boolean = true;
  
  private _handlingInput: boolean;
  
  get handlingInput() { return this._handlingInput; }

  set handlingInput(v: boolean) { 
    if (v === this._handlingInput) return;
    if (v) {
      document.body.addEventListener("keydown", e => this.keyDown(e));
      document.body.addEventListener("keyup", e => this.keyUp(e));
    }
  }

  constructor(public terminal: Terminal) {
    this.display = terminal['terminal'];
  }

  dirty(): void { this._dirty = true; }

  goTo(screen: BaseScreen<T>)
  {
    let old = this.screens.pop();
    old.unbind();

    screen.bind(this);
    this.screens.push(screen);
    this.render();
  }

  pop(result?: {}) 
  {
    let screen = this.screens.pop();
    screen.unbind();
    this.screens[this.screens.length - 1].activate(screen, result);
    this.render();
  }

  push(screen: BaseScreen<T>)
  {
    screen.bind(this);
    this.screens.push(screen);
    this.render()
  }

  /**
   * Function for handling keydown events.
   * @param event 
   */
  keyDown(event: KeyboardEvent)
  {
    let keyCode = event.keyCode;

    let input = this.keyPress.find(keyCode);

    // Get reference to the last screen in the array.
    let screen = this.screens[this.screens.length - 1];
    
    if (input != null) {
      event.preventDefault();
      if (screen.handleInput(input)) return;
    }

    if (screen.keyDown(keyCode, event.shiftKey, event.altKey)) {
      event.preventDefault();
    }
  }

  /**
   * Function for handling keyup events.
   * @param event 
   */
  keyUp(event: KeyboardEvent)
  {
    let keyCode = event.keyCode;

    // Get reference to the last screen in the array.
    let screen = this.screens[this.screens.length - 1];
    
    if (screen.keyUp(keyCode)) {
      event.preventDefault();
    }
  }

  refresh()
  {
    console.log("Call to refresh()");
    for (let i = 0; i < this.screens.length; i++) {
      this.screens[i].update();
    }
    if (this._dirty) this.render();
  }

  render(): void
  {
    // If the UI isn't bound to a terminal, do nothing.
    if (this.terminal == null) return;

    // Clear the terminal each frame.
    this.display.clear();

    // Then, for every screen bound to this terminal, draw that screen to the terminal.
    for (let i = 0; i < this.screens.length; i++) {
      this.screens[i].render(this.terminal);
    }
  }
}