import { Content } from './engine';
import { Background } from './engine/player/background';
import { Backgrounds } from './content/backgrounds';
import { BaseClass } from './engine/player/base_class';
import { BaseClasses } from './content/classes';
import { CharacterSave } from './engine/player/character_save';
import { Stage } from './engine/stage/stage';
import { Vec } from './engine/stage/array2d';
import { Town } from './content/stage/town';

export * from './content/backgrounds';
export * from './content/classes';
export * from './content/stage/town';

export function createContent(): Content
{
  // TODO: Implement this!!
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
  buildStage(stage: Stage, placePlayer: (arg0: Vec) => void): void
  {
    new Town(stage).buildStage(placePlayer);
  }

  createPlayer(id: number, name: string, background: Background, baseClass: BaseClass): CharacterSave
  {
    return new CharacterSave(id, name, background, baseClass);
  }
}