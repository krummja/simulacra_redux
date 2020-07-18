import { id } from "inversify";
import { Content } from "../engine";
import { CharacterSave } from "../engine/character/character_save";
import { Entity } from "../engine/core/entity";


export class Storage
{
  characters: CharacterSave[] = [];

  constructor(
    public content: Content
  ) {
    this.load();
  }

  load(): void
  {
    let storage = localStorage.getItem('characters');
    if (storage == null) return;

    let data: CharacterSave[] = JSON.parse(storage);

    for (let i = 0; i < data.length; i++) {
      let id         = data[i]['id'];
      let name       = data[i]['name'];
      let background = data[i]['background'];
      let baseClass  = data[i]['baseClass'];
      
      let characterSave: CharacterSave = {
        id: id,
        name: name,
        background: background,
        baseClass: baseClass
      }

      this.characters.push(characterSave);
    }
  }

  save(): void
  {
    let characterData = [];

    for (let i = 0; i < this.characters.length; i++) {
      characterData.push({
        id:         this.characters[i]['id'],
        name:       this.characters[i]['name'],
        background: this.characters[i]['background'],
        baseClass:  this.characters[i]['baseClass']
      })
    }

    localStorage.setItem('characters', JSON.stringify(characterData));
  }
}