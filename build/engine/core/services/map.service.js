"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapService = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
let MapService = class MapService {
    constructor() {
        this.maps = [];
        this.currentMapId = 1;
    }
    add(m) {
        this.maps.push(m);
    }
    clear() {
        this.maps = [];
    }
    getCurrent() {
        return this.maps.find((m) => m.id === this.currentMapId);
    }
    getCurrentId() {
        return this.currentMapId;
    }
    getMaxId() {
        if (this.maps.length === 0) {
            return 0;
        }
        return Math.max(...this.maps.map((m) => m.id));
    }
    setCurrent(id) {
        if (id < 0 || !this.maps.some((m) => m.id === id)) {
            throw new Error("Map ID out of range!");
        }
        else {
            this.currentMapId = id;
        }
    }
};
MapService = __decorate([
    inversify_1.injectable()
], MapService);
exports.MapService = MapService;
