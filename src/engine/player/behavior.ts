import { Action } from "../action/action";
import { Player } from "./player";


abstract class Behavior
{
  abstract canPerform(player: Player): boolean;
  abstract getAction(player: Player): Action;
}


export class ActionBehavior extends Behavior
{
  constructor(public action: Action)
  {
    super();
  }

  canPerform(player: Player): boolean 
  { 
    console.log("Call to Behavior.canPerform()");
    return true;
  }

  getAction(player: Player): Action 
  { 
    console.log("Call to Behavior.getAction()");
    player.waitForInput();
    return this.action; 
  }
}