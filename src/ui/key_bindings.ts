import * as ROT from 'rot-js'


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