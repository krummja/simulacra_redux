import { Content } from './engine';

class ConcreteContent extends Content
{
  doNothing(): void { console.log("Nothing happens!") }
}

export function createContent(): Content
{
  return new ConcreteContent();
}


class GameContent
{

}