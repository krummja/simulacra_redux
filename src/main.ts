import 'reflect-metadata';

import * as ROT from 'rot-js';

import { createContent } from './content';
import { Debug } from './debug';
import { Actor, Content, Entity } from './engine';
import { TerminalProps } from './types';
import { BaseScreen, Input, UserInterface, KeyCode } from './ui';
import { MainMenuScreen } from './ui/main_menu_screen';

export type Terminal = {
  terminal: ROT.Display,
  container: HTMLElement,
  size: [number, number]
}

// Constants for the game terminal
const SCREEN = {
  WIDTH: 200,
  HEIGHT: 48
}


// Constants for the bottom UI terminal
const PANEL = {
  WIDTH: 200,
  HEIGHT: 16
}


let ui: UserInterface<Input> = null;


/**
 * The main game process. 
 * 
 * Initializes game content and terminals. 
 * Terminals get appended to the DOM. 
 * Also captures keyboard input.
 */
export function main()
{
  // Fire up the game content.
  let content = createContent();

  // Set up the primary terminal.
  let primary: Terminal = _makeTerminal(
    SCREEN.WIDTH, 
    SCREEN.HEIGHT, 
    {
      fontFamily: 'Fira Code',
      fontStyle: 'normal',
      fontSize: 13,
      spacing: 1.0
    }
  );

  // Set up the bottom terminal.
  let bottom: Terminal = _makeTerminal(
    PANEL.WIDTH, 
    PANEL.HEIGHT,
    {
      fontFamily: 'Fira Code',
      fontStyle: 'normal',
      fontSize: 13,
      spacing: 1.0
    }
  )
  
  // Append to DOM.
  document.getElementById('game')?.appendChild(primary['container']);
  document.getElementById('bottomPanel')?.appendChild(bottom['container']);
  
  // Set ui to a new UserInterface instance which is wrapped around an Input.
  // It takes in a terminal and renders to it.
  ui = new UserInterface<Input>(primary);
  ui.push(new MainMenuScreen(content));
  
  ui.keyPress.bind(Input.ok, KeyCode.enter);
  ui.keyPress.bind(Input.cancel, KeyCode.esc);
  
  ui.keyPress.bind(Input.n, KeyCode.up);
  ui.keyPress.bind(Input.s, KeyCode.down);
  ui.keyPress.bind(Input.e, KeyCode.right);
  ui.keyPress.bind(Input.w, KeyCode.left);
    
  ui.handlingInput = true;
}


/**
 * Makes a new [ROT.Display] object to render to.
 * 
 * @param width   Terminal width in tiles.
 * @param height  Terminal height in tiles.
 * @param props   Configuration properties.
 * @returns terminal 
 */
function _makeTerminal(width: number, height: number, props: TerminalProps): Terminal
{
  // let tileSet = document.createElement("img");
  // tileSet.src = "assets/LCD_Tileset.png";

  const display = new ROT.Display({ width, height, ...props });

  // const display = new ROT.Display({
  //   width: width,
  //   height: height,
  //   layout: "tile",
  //   bg: "transparent",
  //   tileWidth: 16,
  //   tileHeight: 16,
  //   tileSet: tileSet,
  //   tileMap: {
  //     " ": [0, 0],
  //     "@": [1, 0],
  //     "?": [15, 4],
  //     "a": [1, 6],
  //     "b": [2, 6],
  //     "c": [3, 6],
  //     "d": [4, 6],
  //     "e": [5, 6],
  //     "f": [6, 6],
  //     "g": [7, 6],
  //     "h": [8, 6],
  //     "i": [9, 6],
  //     "j": [10, 6],
  //     "k": [11, 6],
  //     "l": [12, 6],
  //     "m": [13, 6],
  //     "n": [14, 6],
  //     "o": [15, 6],
  //     "p": [0, 7],
  //     "q": [1, 7],
  //     "r": [3, 7],
  //     "s": [4, 7],
  //     "t": [5, 7],
  //     "u": [6, 7],
  //     "v": [7, 7],
  //     "w": [8, 7],
  //     "x": [9, 7],
  //     "y": [10, 7],
  //     "z": [11, 7],
  //   }
  // });
  const container = display.getContainer();

  if (Debug.enabled) {}

  return { terminal: display, container: container, size: [width, height] };
}