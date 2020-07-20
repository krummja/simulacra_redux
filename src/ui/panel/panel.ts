import * as ROT from 'rot-js';

import { Rect } from "../../engine/stage/rect";
import { Terminal } from '../../main';
import { GameScreen } from "../game_screen";
import { Input } from "../input";
import { BaseScreen } from "../screen";


export abstract class Panel
{
  bounds: Rect;

  constructor(
    public screen: GameScreen
  ) {}

  render(terminal: Terminal)
  {
    this.renderPanel(terminal);
  }

  abstract renderPanel(terminal: Terminal): void;
}