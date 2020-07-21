import * as ROT from 'rot-js';

import { Actor, Content, Game } from '../engine';
import { CharacterSave } from '../engine/character/character_save';
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

  subject: Actor = null;
  
  private _targetActor: Actor;
  
  private _target: [number, number];

  private _stagePanel: StagePanel;

  constructor(game: Game, storage: Storage)
  {
    super()
    this.game = game;
    this.storage = storage;

    this._stagePanel = new StagePanel(this, 50, 0, 100, 48);
    this.subject = this.game.subject;
  }

  drawStageGlyph(terminal: Terminal, x: number, y: number, glyph: Glyph)
  {
    this._stagePanel.drawStageGlyph(terminal, x, y, glyph);
  }

  handleInput(input: Input): boolean
  {
    switch (input) {
      case Input.ok:
        console.log("Enter pressed in Game Screen!");
        this.ui.dirty();
        this.ui.refresh();
    }
    return false;
  } 

  keyDown(keyCode: number): boolean { return false; }
  keyUp(keyCode: number): boolean { return false; }

  render(terminal: Terminal): void
  {
    let display = terminal['terminal']
    display.clear();

    this._stagePanel.render(terminal);
  }

  static initialize(storage: Storage, content: Content, save: CharacterSave) 
  {
    let game = new Game(content, save, 100, 48);
    return new GameScreen(game, storage);
  }
}