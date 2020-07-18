import { Content } from './engine';
import { Background } from './engine/character/background';
import { Backgrounds } from './content/backgrounds';
import { BaseClass } from './engine/character/base_class';
import { BaseClasses } from './content/classes';
import { CharacterSave } from './engine/character/character_save';

export * from './content/backgrounds';
export * from './content/classes';

export function createContent(): Content
{
  return;
}


export class GameContent implements Content
{
  baseClasses: BaseClass[] = [
    BaseClasses.Default
  ];
  backgrounds: Background[] = [
    Backgrounds.Default
  ];
  
  // TODO: Implement stage, position
  buildStage(): Iterable<string>
  {
    return
  }

  createPlayer(id: number, name: string, background: Background, baseClass: BaseClass): CharacterSave
  {
    return new CharacterSave(id, name, background, baseClass);
  }
}