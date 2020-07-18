import { BaseClass } from "../engine/character/base_class";


export class BaseClasses
{
  static Default = _class("Default", "TODO");
}


function _class(name: string, description: string): BaseClass
{
  return new BaseClass(name, description);
}