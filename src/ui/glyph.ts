export interface IGlyph
{
  character  ?: string;
  font       ?: string;
  foreground ?: string;
  background ?: string;
}


export class Glyph
{
  public character: string;
  public font: string;
  public foreground: string;
  public background: string;
  
  constructor(
    properties: IGlyph
  ) { 
    this.character  = properties['character']   || ' ';
    this.font       = properties['font']        || ' ';
    this.foreground = properties['foreground']  || '#ffffff'
    this.background = properties['background']  || '#000000'
  }
}