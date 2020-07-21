"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameContent = exports.createContent = void 0;
const backgrounds_1 = require("./content/backgrounds");
const classes_1 = require("./content/classes");
const character_save_1 = require("./engine/character/character_save");
__exportStar(require("./content/backgrounds"), exports);
__exportStar(require("./content/classes"), exports);
function createContent() {
    return;
}
exports.createContent = createContent;
class GameContent {
    constructor() {
        this.baseClasses = [
            classes_1.BaseClasses.Default
        ];
        this.backgrounds = [
            backgrounds_1.Backgrounds.Default
        ];
    }
    // TODO: Implement stage, position
    buildStage() {
        return;
    }
    createPlayer(id, name, background, baseClass) {
        return new character_save_1.CharacterSave(id, name, background, baseClass);
    }
}
exports.GameContent = GameContent;
