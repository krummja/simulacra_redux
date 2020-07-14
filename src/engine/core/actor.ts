import { IGlyph, RenderOrder } from '../../ui';
import { Entity } from './entity';


export class Actor extends Entity
{
  constructor(
    public name: string,
    public sightRadius: number,
    public renderOrder: RenderOrder,
    public glyphProps: IGlyph
  ) {
    super(name, sightRadius, renderOrder, glyphProps);
  }
}