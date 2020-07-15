import * as ROT from 'rot-js'


export class KeyBinding
{
  constructor(
    public charCode: number
  ){}
}


export class KeyBindings<T>
{
  private _bindings = new Map<KeyBinding, T>();

  bind(input: T, keyCode: KeyBinding): void
  {
    this._bindings.set(keyCode, input);
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