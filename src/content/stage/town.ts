import { Vec } from "../../engine/stage/array2d";
import { Stage } from "../../engine/stage/stage";
import { container } from "../../engine/core/container";
import { MapService } from "../../engine/core/services/map.service";
import { Map } from "../../engine/core/map";

const mapService = container.get<MapService>("MapService");


export class Town
{
  constructor(
    public stage: Stage
  ) {}

  buildStage(placePlayer: (arg0: Vec) => void): void
  {
    const newMapId = mapService.getMaxId();
    mapService.add(new Map({
      width: 200,
      height: 100,
      ratio: 0.45,
      iterations: 3
    }));

    mapService.setCurrent(newMapId);
    mapService.getCurrent().generate();
  }
}