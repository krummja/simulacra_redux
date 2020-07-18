"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
    constructor(content) {
        this.content = content;
        this.characters = [];
        this.load();
    }
    load() {
        let storage = localStorage.getItem('characters');
        if (storage == null)
            return;
        let data = JSON.parse(storage);
        for (let i = 0; i < data.length; i++) {
            let id = data[i]['id'];
            let name = data[i]['name'];
            let background = data[i]['background'];
            let baseClass = data[i]['baseClass'];
            let characterSave = {
                id: id,
                name: name,
                background: background,
                baseClass: baseClass
            };
            this.characters.push(characterSave);
        }
    }
    save() {
        let characterData = [];
        for (let i = 0; i < this.characters.length; i++) {
            characterData.push({
                id: this.characters[i]['id'],
                name: this.characters[i]['name'],
                background: this.characters[i]['background'],
                baseClass: this.characters[i]['baseClass']
            });
        }
        localStorage.setItem('characters', JSON.stringify(characterData));
    }
}
exports.Storage = Storage;
