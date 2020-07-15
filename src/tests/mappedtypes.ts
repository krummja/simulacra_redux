import * as ROT from 'rot-js';

interface Point {
  x: number; 
  y: number;
}


interface FrozenPoint {
  readonly x: number;
  readonly y: number;
}


function freezePoint(p: Point): FrozenPoint
{
  // lib.d.ts defines freeze as:
  // freeze<T>(o: T): Readonly<T>;
  // 'Readonly<T>' is a mapped type
  return Object.freeze(p);
}


const originPoint = freezePoint({ x: 0, y: 0});


type ReadonlyPoint = Readonly<Point>


/**
 * The type Readonly<T> is defined as follows:
 * 
 * type Readonly<T> = {
 *   readonly [P in keyof T]: T[P]
 * };
 * 
 * We can read this as:
 *  The type that takes in some T and returns a readonly variable for...
 *    each property P for each key of T, return T which maps P.
 */

/**
 * We can understand what's happening by substituting:
 * 
 *  We could, ostensibly, represent this as: λT.[Readonly<T>]
 * 
 * 1. type ReadonlyPoint = Readonly<T> <- (Point for T)
 * 
 * 2. type ReadonlyPoint = Readonly<Point>;
 * 
 * 3. type ReadonlyPoint = {
 *      readonly [P in keyof Point]: Point[P]
 *    }
 * 
 * 4. type ReadonlyPoint = {
 *      readonly [P in "x" | "y"]: Point[P]
 *    }
 * 
 * 5. type ReadonlyPoint = {
 *      readonly x: Point["x"];
 *      readonly y: Point["y"];
 *    }
 * 
 * 6. type ReadonlyPoint = {
 *      readonly x: number;
 *      readonly y: number;
 *    }
 */


// console.log(Input.t) = Input { name: 't' }
class InputA
{
  static t = new InputA("tA");
  static e = new InputA("e");
  static s = new InputA("s");

  constructor(
    public name: string
  ){}
}

class InputB
{
  static t = new InputB("tB");

  constructor(
    public name: string
  ){}
}


class KeyBindings<T> 
{
  // KeyBindings<Input>.bindings = [KeyBinding -> Input];
  bindings = new Map<KeyBinding, T>();

  bind(input: T, keyCode: number)
  {
    this.bindings.set(new KeyBinding(keyCode), input);
    console.log(this.bindings);
  }
}

class KeyBinding
{
  constructor(
    public charCode: number
  ){}
}

let T_Key = ROT.KEYS.VK_T;
let E_Key = ROT.KEYS.VK_E;
let S_Key = ROT.KEYS.VK_S;


let T_Bound = new KeyBinding(T_Key);
let E_Bound = new KeyBinding(E_Key);
let S_Bound = new KeyBinding(S_Key);


class KeyCode {
  static t = ROT.KEYS.VK_T;
}

class UserInterface<T>
{
  // Ah! variable keyPress is TYPE KeyBindings<T>! This is a mapped type!
  keyPress = new KeyBindings<T>();
}

let _uiA = new UserInterface<InputA>();
let _uiB = new UserInterface<InputB>();

// Returns as UserInterface { keyPress: KeyBindings { bindings: Map {} } }
console.log(_uiA);
console.log(_uiB);

let testA = _uiA.keyPress.bind(InputA.t, KeyCode.t);
let testB = _uiB.keyPress.bind(InputB.t, KeyCode.t);
// So this means that a single UserInterface object can wrap around DIFFERENT Input objects and therefore have DIFFERENT keybinding maps for different modal contexts! Neat!!



type TestType<T> = {[P in keyof T]: T[P]}


function testFunc<T>(v: T) 
{
  console.log(`${v} is of type ${typeof v}`);
}

let test = testFunc<string>('foo');
let test2 = testFunc<number>(12);

let testMap = new Map<string, string>();



