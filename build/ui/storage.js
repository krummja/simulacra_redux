"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
    constructor(content) {
        this.characters = [];
        this.content = content;
    }
    _load() {
        let storage = window.localStorage.getItem('characters');
        if (storage == null)
            return;
    }
    save() {
        let characterData = [];
        let character;
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
exports.Storage = Storage;
