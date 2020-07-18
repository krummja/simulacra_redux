import * as ROT from 'rot-js'


export class KeyBinding
{
  constructor(
    public charCode: number,
    public shift?: boolean,
    public alt?: boolean
  ){}
}


export class KeyBindings<T>
{
  get bindings() { return this._bindings; }
  set bindings(v: Map<KeyBinding, T>) { this._bindings = v; }
  private _bindings = new Map<KeyBinding, T>();

  constructor(){}

  bind(input: T, keyCode: number, shift?: boolean, alt?: boolean): void
  {
    this.bindings.set(new KeyBinding(keyCode, shift, alt), input);
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
  static shift  = ROT.KEYS.VK_SHIFT;
  static alt    = ROT.KEYS.VK_ALT;
  static space  = ROT.KEYS.VK_SPACE;
  static delete = ROT.KEYS.VK_DELETE;
  static back   = ROT.KEYS.VK_BACK_SPACE;
  static tab    = ROT.KEYS.VK_TAB;

  static enter = 13;
  static esc   = ROT.KEYS.VK_ESCAPE;
  static a     = ROT.KEYS.VK_A;
  static b     = ROT.KEYS.VK_B;
  static c     = ROT.KEYS.VK_C;
  static d     = ROT.KEYS.VK_D;
  static e     = ROT.KEYS.VK_E;
  static f     = ROT.KEYS.VK_F;
  static g     = ROT.KEYS.VK_G;
  static h     = ROT.KEYS.VK_H;
  static i     = ROT.KEYS.VK_I;
  static j     = ROT.KEYS.VK_J;
  static k     = ROT.KEYS.VK_K;
  static l     = ROT.KEYS.VK_L;
  static m     = ROT.KEYS.VK_M;
  static n     = ROT.KEYS.VK_N;
  static o     = ROT.KEYS.VK_O;
  static p     = ROT.KEYS.VK_P;
  static q     = ROT.KEYS.VK_Q;
  static r     = ROT.KEYS.VK_R;
  static s     = ROT.KEYS.VK_S;
  static t     = ROT.KEYS.VK_T;
  static u     = ROT.KEYS.VK_U;
  static v     = ROT.KEYS.VK_V;
  static w     = ROT.KEYS.VK_W;
  static x     = ROT.KEYS.VK_X;
  static y     = ROT.KEYS.VK_Y;
  static z     = ROT.KEYS.VK_Z;

  static up    = ROT.KEYS.VK_UP;
  static down  = ROT.KEYS.VK_DOWN;
  static left  = ROT.KEYS.VK_LEFT;
  static right = ROT.KEYS.VK_RIGHT;
}