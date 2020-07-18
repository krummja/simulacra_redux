"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClasses = void 0;
const base_class_1 = require("../engine/character/base_class");
class BaseClasses {
}
exports.BaseClasses = BaseClasses;
BaseClasses.Default = _class("Default", "TODO");
function _class(name, description) {
    return new base_class_1.BaseClass(name, description);
}
