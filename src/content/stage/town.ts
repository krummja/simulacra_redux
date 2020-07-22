import { Vec } from "../../engine/stage/array2d";
import { Stage } from "../../engine/stage/stage";


export class Town
{
  constructor(
    public stage: Stage
  ) {}

  *buildStage(placePlayer: (arg0: Vec) => void): Iterable<string>
  {
    for (let x = 0; x < this.stage.width; x++) {
      for (let y = 0; y < this.stage.height; y++) {

      }
    }
  }
}