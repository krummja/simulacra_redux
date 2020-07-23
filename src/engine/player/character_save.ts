import { Background } from "./background";
import { BaseClass } from "./base_class";


export class CharacterSave
{
  id: number;
  name: string;
  background: {};
  baseClass: {};

  constructor(
    id: number, 
    name: string, 
    background: Background, 
    baseClass: BaseClass
  ) {
    this.id = id;
    this.name = name;
    this.background = background;
    this.baseClass = baseClass;
  }
}