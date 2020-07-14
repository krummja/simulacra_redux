import { Glyph, IGlyph, RenderOrder } from '../../ui';

export class Entity
{
  mapId: number;
  glyph: Glyph;
  x: number;
  y: number;
  active: boolean = true;

  get id(): number { return this._id; }
  set id(v: number) { this._id = v; }
  private _id: number;

  constructor(
    public name: string, 
    public sightRadius: number, 
    public renderOrder: RenderOrder, 
    public glyphProps: IGlyph = new Glyph(glyphProps)
  ) { }

  static move(entity: Entity, x: number, y: number): void  
  {
    entity.x = x;
    entity.y = y;
  }

  static distanceTo(from: Entity, to: Entity): number
  {
    return Entity.distanceToPos(from.x, from.y, to.x, to.y);
  }

  static distanceToPos(fromX: number, fromY: number, toX: number, toY: number): number
  {
    const dx = toX - fromX;
    const dy = toY - fromY;

    return Math.sqrt(dx * dx + dy * dy);
  }
}