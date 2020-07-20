import { Container } from 'inversify';

import { ActorService } from './services/actor.service';
import { MapService } from './services/map.service';

export const container = new Container();

container.bind<ActorService>("ActorService").toConstantValue(new ActorService());
container.bind<MapService>("MapService").toConstantValue(new MapService());
