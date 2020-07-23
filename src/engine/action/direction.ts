import { Vec } from "../stage/array2d";


export class Direction
{
  static none = new Direction({x: 0, y: 0});
  static n = new Direction({x: 0, y: -1});
  static s =  new Direction({x: 0, y: 1});
  static e =  new Direction({x: 1, y: 0});
  static w =  new Direction({x: -1, y: 0});
  static ne = new Direction({x: 1, y: -1});
  static se = new Direction({x: 1, y: 1});
  static nw = new Direction({x: -1, y: -1});
  static sw = new Direction({x: -1, y: 1});

  dir: Vec;
  constructor(dir: Vec) { this.dir = dir; }
}