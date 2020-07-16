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
exports.main = void 0;
require("reflect-metadata");
const ROT = __importStar(require("rot-js"));
const content_1 = require("./content");
const debug_1 = require("./debug");
const ui_1 = require("./ui");
const main_menu_screen_1 = require("./ui/main_menu_screen");
// Constants for the game terminal
const SCREEN = {
    WIDTH: 100,
    HEIGHT: 48
};
// Constants for the bottom UI terminal
const PANEL = {
    WIDTH: 100,
    height: 16
};
let ui = null;
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
    // Set ui to a new UserInterface instance which is wrapped around an Input.
    // It takes in a terminal and renders to it.
    ui = new ui_1.UserInterface(primary[0]);
    ui.push(new main_menu_screen_1.MainMenuScreen(content));
    console.log(ui.screens.entries());
    ui.keyPress.bind(ui_1.Input.open, ui_1.KeyCode.enter);
    ui.keyPress.bind(ui_1.Input.close, ui_1.KeyCode.esc);
    ui.keyPress.bind(ui_1.Input.n, ui_1.KeyCode.n);
    ui.keyPress.bind(ui_1.Input.s, ui_1.KeyCode.s);
    ui.keyPress.bind(ui_1.Input.e, ui_1.KeyCode.e);
    ui.keyPress.bind(ui_1.Input.w, ui_1.KeyCode.w);
    window.onkeydown = ui.keyDown;
    window.onkeyup = ui.keyUp;
    ui.render();
    // ui.handlingInput = true;
}
exports.main = main;
/**
 * Makes a new [ROT.Display] object to render to.
 *
 * @param width   Terminal width in tiles.
 * @param height  Terminal height in tiles.
 * @param props   Configuration properties.
 * @returns terminal
 */
function _makeTerminal(width, height, props) {
    const display = new ROT.Display(Object.assign({ width, height }, props));
    const container = display.getContainer();
    if (debug_1.Debug.enabled) { }
    return [display, container];
}
