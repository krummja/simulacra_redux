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
  screens: BaseScreen<T>[] = [];

  constructor(public terminal: ROT.Display){}

  push(screen: BaseScreen<T>)
  {
    screen.bind(this);
    this.screens.push(screen);
  }
}


class TestScreen extends BaseScreen<Input>
{
  constructor(){
    super();
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

  primary[0].drawText(10, 10, "Hello world!");
}


function _makeTerminal(width: number, height: number, props: TerminalProps): [ROT.Display, HTMLElement]
{
  const display = new ROT.Display({width, height, ...props});
  const container = display.getContainer();

  return [display, container];
}