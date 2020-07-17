export class Input
{
  static ok = new Input("ok");
  static cancel = new Input("cancel");

  static open = new Input("open");
  static close = new Input("close");
  
  static n = new Input("n");
  static s = new Input("s");
  static e = new Input("e");
  static w = new Input("w");
  
  name: string;
  constructor(name: string) { this.name = name; }
}