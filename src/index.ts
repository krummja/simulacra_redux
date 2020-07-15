import 'reflect-metadata';
import * as ROT from 'rot-js';

import { Debug } from './debug';
import { Entity, Actor } from './engine';
import { createContent } from './content';
import { TerminalProps } from './types';
import { UserInterface, Input, BaseScreen } from './ui';
import { MainMenuScreen } from './ui/main_menu_screen';
import { Content } from './engine';


// Constants for the game terminal
const SCREEN = {
  WIDTH: 100,
  HEIGHT: 48
}

// Constants for the bottom UI terminal
const PANEL = {
  WIDTH: 100,
  height: 16
}


let _ui: UserInterface<Input>;


/**
 * The main game process. 
 * 
 * Initializes game content and terminals. 
 * Terminals get appended to the DOM. 
 * Also captures keyboard input.
 */
function main()
{
  // Fire up the game content.
  let content = createContent();

  // Set up the primary terminal.
  let primary: [ROT.Display, HTMLElement] = _makeTerminal(
    SCREEN.WIDTH, 
    SCREEN.HEIGHT, 
    {
      fontFamily: 'simulacra',
      fontStyle: 'normal',
      fontSize: 13,
      spacing: 1.0,
      forceSquareRatio: true
    }
  );

  // Set up the bottom terminal.
  let bottom: [ROT.Display, HTMLElement] = _makeTerminal(
    10, 10,
    {
      fontFamily: 'simulacra',
      fontStyle: 'normal',
      fontSize: 13,
      spacing: 1.0,
      forceSquareRatio: true   
    }
  )
  
  // Append to DOM.
  document.getElementById('game')?.appendChild(primary[1]);
  document.getElementById('bottomPanel')?.appendChild(bottom[1]);
  
  // Set _ui to a new UserInterface instance which is wrapped around an Input.
  // It takes in a terminal and renders to it.
  _ui = new UserInterface<Input>(primary[0]);


  _ui.push(new MainMenuScreen(content));

  // Capture key input.
  // window.onkeydown = Input.onKeyDown;

  // Aaaaand draw!
  // draw(primary[0], bottom[0], subject);
}





/**
 * Makes a new [ROT.Display] object to render to.
 * 
 * @param width   Terminal width in tiles.
 * @param height  Terminal height in tiles.
 * @param props   Configuration properties.
 * @returns terminal 
 */
function _makeTerminal(width: number, height: number, props: TerminalProps): [ROT.Display, HTMLElement]
{
  const display = new ROT.Display({width, height, ...props});
  const container = display.getContainer();

  if (Debug.enabled) {}

  return [display, container];
}



// Let 'er rip!
window.onload = () => { main(); }