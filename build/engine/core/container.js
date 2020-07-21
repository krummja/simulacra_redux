"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const actor_service_1 = require("./services/actor.service");
const map_service_1 = require("./services/map.service");
exports.container = new inversify_1.Container();
exports.container.bind("ActorService").toConstantValue(new actor_service_1.ActorService());
exports.container.bind("MapService").toConstantValue(new map_service_1.MapService());
