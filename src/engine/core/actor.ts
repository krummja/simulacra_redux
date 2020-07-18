import { IGlyph, RenderOrder } from '../../ui';
import { Entity } from './entity';


export class Actor implements Noun
{
  constructor(
    public name: string,
    public sightRadius: number,
    public renderOrder: RenderOrder,
    public glyphProps: IGlyph
  ) {
    
  }
}


export class Noun
{

}