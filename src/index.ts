import 'reflect-metadata';
import * as ROT from 'rot-js';

import { Debug } from './debug';
import { Entity, Actor } from './engine';
import { createContent } from './content';
import { TerminalProps } from './types';
import { UserInterface, Input, BaseScreen } from './ui';


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


// The [subject] of the [controller] object.
let subject: Entity;
let _ui: UserInterface<Input>;

/**
 * Draws the primary game view.
 * 
 * @param display A [ROT.Display] instance.
 * @param target  The current [subject] of the [controller] usually.
 */
// function drawPrimary(display: ROT.Display, target: Entity): void
// {
//   let screenWidth = SCREEN.WIDTH;
//   let screenHeight = SCREEN.HEIGHT;

//   display.clear();
// }


/**
 * Draws the UI [Panel] underneath the primary UI [Panel].
 * 
 * @param display A [ROT.Display] instance.
 * @param target  The current [subject] of the [controller] usually.
 */
// function drawBottomPanel(display: ROT.Display, target: Entity)
// {
//   display.clear();
//   drawMessageLog();
// }


/**
 * Compose all draw functions above to render all at once.
 * 
 * @param primary The [ROT.Display] that will act as the primary game view terminal.
 * @param target  The same [target] as tracked by [primary].
 */
// function draw(primary: ROT.Display, bottom: ROT.Display, target: Entity): void
// {
//   drawPrimary(primary, target);
//   drawBottomPanel(bottom, target);
// }


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