import { IGlyph, RenderOrder } from '../../ui';
import { Glyph } from '../../ui/glyph';
import { Action } from '../action/action';
import { Vec } from '../stage/array2d';
import { Game } from './game';


export class Actor implements Noun
{
  game: Game;

  glyph: Glyph;
  
  id: number;

  name: string;

  private _pos: Vec = {x: 0, y: 0};

  get needsInput(): boolean { return false; }

  get pos() { return this._pos; }

  set pos(v: Vec) { this._pos = v; }

  constructor(
    public sightRadius: number,
    public glyphProps: IGlyph
  ) {
    this.glyph = new Glyph(glyphProps);
  }
  
  changePosition(from: Vec, to: Vec)
  {
    this.game.stage.moveActor(from, to);
  }

  finishTurn(action: Action)
  {
    this.onFinishTurn(action);
  }

  onFinishTurn(action: Action): void
  {
    // Do nothing
  }

  getAction(): Action {
    console.log("Call to getAction()");
    
    let action = this.onGetAction();
    if (action != null) action.bind(this);
    return action;
  }

  onGetAction(): Action { return; }
}


export class Noun
{

}