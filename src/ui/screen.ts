import * as ROT from 'rot-js';
import { Terminal } from '../main';
import { UserInterface } from './interface';


// Okay this is neat!
// the 'asserts' type operator ensures that the condition (following 'asserts') 
// must be true for the remainder of the remaining scope. That's cool as hell!
function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error(`value must be defined`);
  }
}


export abstract class BaseScreen<T>
{
  // The [UserInterface] this screen is bound to.
  get ui() {
    return this._ui; 
  }
  private _ui: UserInterface<T>;

  isTransparent: boolean = false;

  // Binds this screen to [ui].
  bind(ui: UserInterface<T>): void
  {
    assert(this._ui == null);
    this._ui = ui;
  }

  // Unbinds this screen from the [ui] that owns it.
  unbind(): void
  {
    assert(this._ui != null);
    this._ui = null;
  }
  
  // If a keypress has a binding defined for it and is pressed, this will be called with the bound
  // input when this screen is active.
  //
  // IF this returns 'false' (default behavior), then the lower-level [keyDown] method will be called.
  handleInput(input: T): boolean {return}

  keyDown(keyCode: number, shift?: boolean, alt?: boolean): boolean {return}
  
  keyUp(keyCode: number, shift?: boolean, alt?: boolean): boolean {return}

  activate(popped: BaseScreen<T>, result: {}): void {}

  abstract update(): void;

  render(terminal: Terminal): void {}
}
