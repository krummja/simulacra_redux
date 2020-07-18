import { Background } from '../engine/character/background';

export class Backgrounds
{
  static Default = _background('Default', 'Minnesota', 'poor', 'TODO');
}


function _background(
  name: string,
  home: string,
  upbringing: string,
  other?: string
): Background 
{
  return new Background(
    name, 
    home, 
    upbringing
  )
}