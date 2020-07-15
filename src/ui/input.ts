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