"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backgrounds = void 0;
const background_1 = require("../engine/character/background");
class Backgrounds {
}
exports.Backgrounds = Backgrounds;
Backgrounds.Default = _background('Default', 'Minnesota', 'poor', 'TODO');
function _background(name, home, upbringing, other) {
    return new background_1.Background(name, home, upbringing);
}
