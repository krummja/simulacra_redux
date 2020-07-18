import * as ROT from 'rot-js';
import { IGlyph, Glyph } from './glyph';
import { ColorManager } from './color_manager';


export interface ITile
{
  x ?: number;
  y ?: number;
  z ?: number;

  glyphProps ?: IGlyph;
  walkable ?: boolean;
  diggable ?: boolean;
  traversable ?: boolean;
  opaque ?: boolean;
}


export class Tile
{
  glyph: Glyph;

  walkable: boolean;
  diggable: boolean;
  traversable: boolean;
  opaque: boolean;

  constructor(
    public tileProps: ITile,
    public glyphProps: IGlyph
  ) {
    this.glyph = new Glyph(this.glyphProps);

    this.walkable = this.tileProps['walkable'];
    this.diggable = this.tileProps['diggable'];
    this.traversable = this.tileProps['traversable'];
    this.opaque = this.tileProps['opaque'];
  }

  static nullTile(): Tile
  {
    return new Tile({}, {});
  }

  public static floorTile(): Tile
  {
    let colors = ColorManager.Colors.CaveFloor;
    return new Tile({
      walkable: true,
      diggable: false,
      opaque: false
    }, {
      character: ' ',
      background: this.pickColor(colors)
    });
  }

  public static wallTile(): Tile
  {
    let colors = ColorManager.Colors.CaveWall;
    return new Tile({
      walkable: false,
      diggable: true,
      opaque: true
    }, {
      character: ' ',
      background: this.pickColor(colors)
    });
  }

  static pickColor: Function = (colors: string[]): string => {
    let index = Math.floor(Tile.random(0, colors.length));
    return colors[index];
  }

  static random: Function = (mn: number, mx: number): number => {
    return Math.random() * (mx - mn) + mn;
  }
}