import { IGlyph, RenderOrder } from '../../ui';
import { Vec } from '../stage/array2d';
import { Entity } from './entity';
import { Game } from './game';


export class Actor implements Noun
{
  public id: number;
  
  game: Game;

  get pos() { return this._pos; }
  set pos(v: Vec) { this._pos = v; }
  private _pos: Vec = {x: 0, y: 0};

  constructor(
    public name: string,
    public sightRadius: number,
    public renderOrder: RenderOrder,
    public glyphProps: IGlyph
  ) {}
  
  changePosition(from: Vec, to: Vec)
  {
    this.game.stage.moveActor(from, to);
  }
}


export class Noun
{

}