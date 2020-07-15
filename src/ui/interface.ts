import * as ROT from 'rot-js';
import { BaseScreen } from './screen';
import { KeyCode, KeyBindings, KeyBinding } from './key_bindings';


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
  keyPress = new KeyBindings<T>();

  // The current set of screens bound to this [UserInterface].
  private _screens: Array<BaseScreen<T>> = [];
  
  // The terminal this [UserInterface] is set to render to.
  set terminal(terminal: ROT.Display) { this._terminal = terminal; }
  private _terminal: ROT.Display;

  goTo(screen: BaseScreen<T>)
  {
    let old = this._screens.pop();
    old.unbind();

    screen.bind(this);
    this._screens.push(screen);
    this.render();
  }

  refresh()
  {
    for (let i = 0; i < this._screens.length; i++) {
      this._screens[i].update();
    }
  }

  render(): void
  {
    // If the UI isn't bound to a terminal, do nothing.
    if (this._terminal == null) return;

    // Clear the terminal each frame.
    this._terminal.clear();

    // Then, for every screen bound to this terminal, draw that screen to the terminal.
    for (let i = 0; i < this._screens.length; i++) {
      this._screens[i].render(this._terminal);
    }
  }

  push(screen: BaseScreen<T>)
  {
    screen.bind(this);
    this._screens.push(screen);
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
    let screen = this._screens[this._screens.length - 1];
    
    if (input != null) {
      event.preventDefault();
      if (screen.handleInput(input)) return;
    }

    if (screen.keyDown(keyCode)) {
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
    let screen = this._screens[this._screens.length - 1];
    
    if (screen.keyUp(keyCode, event.shiftKey, event.altKey)) {
      event.preventDefault();
    }
  }

  constructor(terminal: ROT.Display) 
  { 
    this._terminal = terminal;
  }
}