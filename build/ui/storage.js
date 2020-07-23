"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
class Storage {
    constructor(content) {
        this.content = content;
        this.saveData = [];
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
            this.saveData.push(characterSave);
        }
    }
    save() {
        let characterData = [];
        for (let i = 0; i < this.saveData.length; i++) {
            characterData.push({
                id: this.saveData[i]['id'],
                name: this.saveData[i]['name'],
                background: this.saveData[i]['background'],
                baseClass: this.saveData[i]['baseClass']
            });
        }
        localStorage.setItem('characters', JSON.stringify(characterData));
    }
}
exports.Storage = Storage;
