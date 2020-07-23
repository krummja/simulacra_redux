import * as ROT from 'rot-js';

import { Action, Actor, Content, Direction, Game, Player, WalkAction } from '../engine';
import { CharacterSave } from '../engine/player/character_save';
import { Terminal } from '../main';
import { Glyph } from './glyph';
import { Input } from './input';
import { StagePanel } from './panel/stagepanel';
import { BaseScreen } from './screen';
import { Storage } from './storage';

export class GameScreen extends BaseScreen<Input>
{
  game: Game;
  
  storage: Storage;

  player: Player = null;

  private _stagePanel: StagePanel;

  constructor(game: Game, storage: Storage)
  {
    super();

    this.game = game;
    this.storage = storage;
    this.player = this.game.player;

    this._stagePanel = new StagePanel(this, 50, 0, 100, 48);
  }

  drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph)
  {
    this._stagePanel.drawStageGlyph(terminal, x, y, glyph);
  }

  handleInput(input: Input): boolean
  {
    let action: Action;

    switch (input) {
      case Input.n:
        console.log("Input detected!");
        action = new WalkAction(Direction.n);
        break;
      case Input.s:
        console.log("Input detected!");
        action = new WalkAction(Direction.s);
        break;
      case Input.e:
        console.log("Input detected!");
        action = new WalkAction(Direction.e);
        break;
      case Input.w:
        console.log("Input detected!");
        action = new WalkAction(Direction.w);
        break;
    }

    if (action != null) {
      console.log("Setting next action");
      this.game.player.setNextAction(action);
      this.ui.refresh();
    }

    return true;
  } 

  keyDown(keyCode: number): boolean { return false; }

  keyUp(keyCode: number): boolean { return false; }

  render(terminal: Terminal): void
  {
    let display = terminal['terminal']
    display.clear();

    this._stagePanel.render(terminal);
    for (const actor of this.game.stage.actors) {
      this.drawStageGlyph(
        terminal,
        actor.pos.x,
        actor.pos.y,
        actor.glyph
      )
    }
  }

  update()
  {
    console.log("Call to GameScreen.update()!");

    let result = this.game.update();

    if (this._stagePanel.update(result.events)) this.ui.dirty();

    if (result.needsRefresh) this.ui.dirty();

    this.ui.refresh();
  }

  static initialize(storage: Storage, content: Content, save: CharacterSave) 
  {
    let game = new Game(content, save, 100, 48);

    game.initialize();

    return new GameScreen(game, storage);
  }
}