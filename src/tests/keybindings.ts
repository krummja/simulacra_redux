import * as ROT from 'rot-js';


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


class KeyBinding {
  constructor(
    public charCode: number
  ){}
}


export class KeyBindings<T>
{
  private _bindings = new Map<KeyBinding, T>();

  bind(input: T, keyCode: number): void
  {
    this._bindings.set(new KeyBinding(keyCode), input);
  }

  find (keyCode: number): T
  {
    let key: {[keyCode in keyof KeyBinding]: KeyBinding[keyCode]};
    let value: T;

    for ([key, value] of this._bindings.entries()) {
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


let test = new KeyBindings<Input>();

test.bind(Input.open, KeyCode.enter);

console.log(test);

let test2 = test.find(KeyCode.enter);
console.log(test2);

