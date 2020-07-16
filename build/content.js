"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContent = void 0;
const engine_1 = require("./engine");
class ConcreteContent extends engine_1.Content {
    doNothing() { console.log("Nothing happens!"); }
}
function createContent() {
    return new ConcreteContent();
}
exports.createContent = createContent;
class GameContent {
}
