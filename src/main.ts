import * as ROT from 'rot-js';


export interface TerminalProps {
  fontFamily       ?: string;
  fontStyle        ?: string;
  fontSize         ?: number;
  spacing          ?: number;
  forceSquareRatio ?: boolean;
}

function assert(value: unknown): asserts value {
  if (value === undefined) {
    throw new Error(`value must be defined`);
  }
}

export class Input
{
  static open = new Input("open");
  static close = new Input("close");
  static ok = new Input("ok");
  static n = new Input("n");
  static s = new Input("s");
  static e = new Input("e");
  static w = new Input("w");
  
  name: string;
  constructor(name: string) { this.name = name; }
}

export class KeyBinding
{
  constructor(
    public charCode: number
  ){}
}

export class KeyBindings<T>
{
  get bindings() { return this._bindings; }
  set bindings(v: Map<KeyBinding, T>) { this._bindings = v; }
  private _bindings = new Map<KeyBinding, T>();

  constructor(){}

  bind(input: T, keyCode: number): void
  {
    this.bindings.set(new KeyBinding(keyCode), input);
  }

  find (keyCode: number): T
  {
    let key: {[keyCode in keyof KeyBinding]: KeyBinding[keyCode]};
    let value: T;

    for ([key, value] of this.bindings.entries()) {
      if (key.charCode === keyCode) {
        return value;
      }
    }
  }
}

export class KeyCode
{
  static enter = ROT.KEYS.VK_ENTER;
  static esc   = ROT.KEYS.VK_ESCAPE;
  static n     = ROT.KEYS.VK_UP;
  static s     = ROT.KEYS.VK_DOWN;
  static e     = ROT.KEYS.VK_RIGHT;
  static w     = ROT.KEYS.VK_LEFT;
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
    console.log(this._ui);
  }

  // Unbinds this screen from the [ui] that owns it.
  unbind(): void
  {
    assert(this._ui != null);
    this._ui = null;
  }

  handleInput(input: T): boolean {return}

  keyDown(keyCode: number): boolean {return}

  keyUp(keyCode: number): boolean {return}

  activate(popped: BaseScreen<T>, result: {}): void {}

  update(): void {}

  render(terminal: ROT.Display): void {}
}

class UserInterface<T>
{
  keyPress: KeyBindings<T> = new KeyBindings<T>();
  screens: BaseScreen<T>[] = [];

  constructor(public terminal: ROT.Display){}

  get handlingInput() { return this._handlingInput; }
  set handlingInput(v: boolean) { 
    if (v === this._handlingInput) return;
    if (v) {
      document.body.addEventListener("keydown", e => this.keyDown(e))
    }
  }
  private _handlingInput: boolean;

  push(screen: BaseScreen<T>)
  {
    screen.bind(this);
    this.screens.push(screen);
  }

  keyDown(event: KeyboardEvent)
  {
    let keyCode = event.keyCode;

    let input = this.keyPress.find(keyCode);

    // Get reference to the last screen in the array.
    let screen = this.screens[this.screens.length - 1];
    
    if (input != null) {
      event.preventDefault();
      // If the screen already defines the input, return.
      if (screen.handleInput(input)) return;
    }

    if (screen.keyDown(keyCode)) {
      event.preventDefault();
    }
  }
}


class TestScreen extends BaseScreen<Input>
{
  constructor(){
    super();
  }

  handleInput(input: Input): boolean
  {
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

  keyDown(keyCode: number): boolean
  {
    switch (keyCode) {
      case KeyCode.n:
        console.log("KeyCode.n logged in Main Menu!");
    }
    return false;
  }
}



export function main()
{
  let primary: [ROT.Display, HTMLElement] = _makeTerminal(
    100, 48, {
      fontFamily: 'simulacra',
      fontStyle: 'normal',
      fontSize: 13,
      spacing: 1.0,
      forceSquareRatio: true   
    }
  );

  document.getElementById('game')?.appendChild(primary[1]);

  let ui = new UserInterface<Input>(primary[0]);
  ui.push(new TestScreen() as BaseScreen<Input>);

  ui.keyPress.bind(Input.n, KeyCode.n);

  ui.handlingInput = true;

  primary[0].drawText(10, 10, "Hello world!");
}


function _makeTerminal(width: number, height: number, props: TerminalProps): [ROT.Display, HTMLElement]
{
  const display = new ROT.Display({width, height, ...props});
  const container = display.getContainer();

  return [display, container];
}