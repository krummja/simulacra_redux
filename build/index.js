"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ROT = __importStar(require("rot-js"));
const debug_1 = require("./debug");
const engine_1 = require("./engine");
const content_1 = require("./content");
// ! TEST MODULES //////////////////////////////////////////////////////////////////////////////////////////////////////
const ui_1 = require("./ui");
// ! ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Constants for the game terminal
const SCREEN = {
    WIDTH: 100,
    HEIGHT: 48
};
const PANEL = {
    WIDTH: 100,
    height: 16
};
// The [subject] of the [controller] object.
let subject;
/**
 * Draws the primary game view.
 *
 * @param display A [ROT.Display] instance.
 * @param target  The current [subject] of the [controller] usually.
 */
function drawPrimary(display, target) {
    let screenWidth = SCREEN.WIDTH;
    let screenHeight = SCREEN.HEIGHT;
    display.clear();
    // ! TEST MODULES ////////////////////////////////////////////////////////////////////////////////////////////////////
    let testModule = new ui_1.BasicMenu(display, "Test Menu");
    let testPanel = new ui_1.Panel(display, 0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, testModule);
    testPanel.draw();
    // ! /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
/**
 * Draws the UI [Panel] underneath the primary UI [Panel].
 *
 * @param display A [ROT.Display] instance.
 * @param target  The current [subject] of the [controller] usually.
 */
function drawBottomPanel(display, target) {
    display.clear();
    // drawMessageLog();
}
/**
 * Compose all draw functions above to render all at once.
 *
 * @param primary The [ROT.Display] that will act as the primary game view terminal.
 * @param target  The same [target] as tracked by [primary].
 */
function draw(primary, bottom, target) {
    drawPrimary(primary, target);
    drawBottomPanel(bottom, target);
}
/**
 * The main game process.
 *
 * Initializes game content and terminals.
 * Terminals get appended to the DOM.
 * Also captures keyboard input.
 */
function main() {
    var _a, _b;
    // Fire up the game content.
    let content = content_1.createContent();
    // Set up the primary terminal.
    let primary = _makeTerminal(SCREEN.WIDTH, SCREEN.HEIGHT, {
        fontFamily: 'simulacra',
        fontStyle: 'normal',
        fontSize: 13,
        spacing: 1.0,
        forceSquareRatio: true
    });
    // Set up the bottom terminal.
    let bottom = _makeTerminal(10, 10, {
        fontFamily: 'simulacra',
        fontStyle: 'normal',
        fontSize: 13,
        spacing: 1.0,
        forceSquareRatio: true
    });
    // Append to DOM.
    (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(primary[1]);
    (_b = document.getElementById('bottomPanel')) === null || _b === void 0 ? void 0 : _b.appendChild(bottom[1]);
    // Capture key input.
    window.onkeydown = engine_1.Input.onKeyDown;
    // Aaaaand draw!
    draw(primary[0], bottom[0], subject);
}
function _makeTerminal(width, height, props) {
    const display = new ROT.Display(Object.assign({ width, height }, props));
    const container = display.getContainer();
    if (debug_1.Debug.enabled) { }
    return [display, container];
}
window.onload = () => { main(); };
