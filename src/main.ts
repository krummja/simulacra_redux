import 'reflect-metadata';

import * as ROT from 'rot-js';

import { createContent } from './content';
import { Debug } from './debug';
import { Actor, Content, Entity } from './engine';
import { TerminalProps } from './types';
import { BaseScreen, Input, UserInterface, KeyCode } from './ui';
import { MainMenuScreen } from './ui/main_menu_screen';
import { Vec } from './engine/stage/array2d';

export type Terminal = {
  terminal: ROT.Display,
  container: HTMLElement,
  size: Vec
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
  const display = new ROT.Display({ width, height, ...props });

  const container = display.getContainer();

  if (Debug.enabled) {}

  return { terminal: display, container: container, size: {x: width, y: height} };
}