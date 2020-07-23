import { IGlyph } from "../../ui/glyph";
import { Actor } from "../core/actor";
import { Game } from "../core/game";
import { Map } from "../core/map";
import { Vec } from "../stage/array2d";
import { CharacterSave } from "./character_save";
import { MapService } from '../core/services/map.service';
import { container } from '../core/container';
import { Action } from "../action/action";
import { ActionBehavior } from './behavior';

const mapService = container.get<MapService>("MapService");

export class Player extends Actor
{
  name: string;

  maxLevel: number = 50;

  save: CharacterSave;

  sightRadius: number;

  glyphProps: IGlyph;

  // TODO: Fix this... >:(
  private _behavior: ActionBehavior = new ActionBehavior(null);

  get needsInput(): boolean {
    if (this._behavior != null && this._behavior.canPerform(this)) {
      this.waitForInput();
    }

    return this._behavior = null;
  }

  constructor(
    game: Game,
    pos: Vec, 
    save: CharacterSave,
    sightRadius: number, 
    glyphProps: IGlyph
  ) {
    super(sightRadius, glyphProps);

    this.pos = pos;
    this.save = save;
  }

  changePosition(from: Vec, to: Vec)
  {
    super.changePosition(from, to);
    // this.game.stage.visibilityChange();
  }

  setNextAction(action: Action): void
  {
    console.log("Setting behavior based on action.");

    this._behavior = new ActionBehavior(action);
  }

  waitForInput()
  {
    this._behavior = null;
  }

  onGetAction(): Action
  {
    console.log("Call to onGetAction()");
    return this._behavior.getAction(this);
  }
}