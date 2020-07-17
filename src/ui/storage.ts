import { Content } from "../engine";
import { CharacterSave } from "../engine/character/character_save";
import { Entity } from "../engine/core/entity";


export interface ICharacterSave {
  name: string;
  race: string;
  class: string;
}

export class Storage
{
  content: Content;
  characters: ICharacterSave[] = [];

  constructor(content: Content)
  {
    this.content = content;
  }

  private _load(): void
  {
    let storage = window.localStorage.getItem('characters');
    if (storage == null) return;
  }

  save()
  {
    let characterData = [];

    let character: any;
    for (character in this.characters) {
      const NAME = character.name;
      const RACE = character.race;
      const CLASS = character.class;

      characterData.push(character);
    }

    let data = JSON.stringify(characterData);
    window.localStorage.setItem('characters', data);
  }
}