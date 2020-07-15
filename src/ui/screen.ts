import * as ROT from 'rot-js';
import { UserInterface } from './interface';


// Okay this is neat!
// the 'asserts' type operator ensures that the condition (following 'asserts') 
// must be true for the remainder of the remaining scope. That's cool as hell!
function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error(`value must be defined`);
  }
}


export class BaseScreen<T>
{
  // The [UserInterface] this screen is bound to.
  get ui() { return this._ui; }
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

  handleInput(input: T): boolean { return false; }

  keyDown(keyCode: number, shift?: boolean, alt?: boolean): boolean { return false; }

  keyUp(keyCode: number, shift?: boolean, alt?: boolean): boolean { return false; }

  activate(popped: BaseScreen<T>, result: {}): void {}

  update(): void {}

  render(terminal: ROT.Display): void {}
}
