import * as ROT from 'rot-js';
import { ColorManager } from '../../ui/color_manager';
import { Tile } from '../../ui/tile';
import { Array2D, Vec } from '../stage/array2d';
import { Actor } from './actor';

export interface MapConfig {
  width: number;
  height: number;
  ratio: number;
  iterations: number;
}


export class Map
{
  id: number = 0;
  area: Array2D<Tile>;
  explored: Array2D<boolean>;

  width: number;
  height: number;
  ratio: number;
  iterations: number;

  constructor(
    config: MapConfig
  ) {
    this.width = config['width'];
    this.height = config['height'];
    this.ratio = config['ratio'];
    this.iterations = config['iterations'];

    this.area = new Array2D<Tile>(this.width, this.height, Tile.nullTile());
    this.explored = new Array2D<boolean>(this.width, this.height, false);
  }

  generate()
  {
    let generator = new ROT.Map.Cellular(this.width, this.height);
    let iterations = this.iterations;

    generator.randomize(this.ratio);

    for (let i = 0; i < iterations - 1; i++) {
      generator.create()
    }

    generator.create((x: number, y: number, v: number): void => {
      if (v === 1) {
        this.area.set({x: x, y: y}, Tile.floorTile());
      } else {
        this.area.set({x: x, y: y}, Tile.wallTile());
      }
    })
  }

  static getTile(map: Map, pos: Vec): Tile
  {
    if (pos.x < 0 || pos.x >= map.width || pos.y < 0 || pos.y >= map.height) {
      return Tile.nullTile();
    }
    return map.area.get(pos) || Tile.nullTile();
  }

  static getBgTint(map: Map, pos: Vec, illumination: number): string
  {
    let tile = Map.getTile(map, pos);
    let color = tile.glyph.background;
    let bg = ColorManager.darken(color, illumination);
    return bg;
  }

  getRandomFloorPosition(map: Map): Vec 
  {
    let x = 0;
    let y = 0;

    while (Map.getTile(map, {x: x, y: y}).walkable === false) {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);
    }

    return { x: x, y: y }
  }

  addActorAtRandomPosition(map: Map, actor: Actor): void
  {
    let position = this.getRandomFloorPosition(map);

    actor.pos.x = position.x;
    actor.pos.y = position.y;
  }
}