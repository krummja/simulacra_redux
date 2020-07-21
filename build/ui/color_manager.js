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
exports.ColorManager = void 0;
const ROT = __importStar(require("rot-js"));
/**
 *  All colors must be converted to hex strings when they arrive at ROT.Display.
 *  The problem is that there are a number of operations on colors that require them to be
 *  arrays of numerical values.
 */
// ROT.Display.draw(x: number, y: number, ch: string, fg: string, bg: string)
class ColorManager {
    static darken(color, amount) {
        if (amount < 0.0 || amount > 1.0) {
            throw new RangeError(`Value must be in range [0.0-1.0]! Got ${amount}`);
        }
        let factor = 255 * amount;
        let _color = ColorManager.rgbify(color);
        let darker = ROT.Color.multiply(_color, [factor, factor, factor]);
        return ROT.Color.toHex(darker);
    }
    static pickColor(colors, floor) {
        let max = colors.length;
        if (floor && floor > max) {
            throw new RangeError(`Randomization floor ${floor} is greater than max value ${max}!`);
        }
        let min = floor || 0;
        let index = Math.floor(Math.random() * (max - min) + min);
        return colors[index];
    }
    static hexify(color) {
        let hex = ROT.Color.toHex(color);
        return hex.toString();
    }
    static rgbify(color) {
        let rgb = ROT.Color.fromString(color);
        return rgb;
    }
}
exports.ColorManager = ColorManager;
ColorManager.Colors = {
    CaveFloor: [
        ROT.Color.toRGB([41, 35, 28]),
        ROT.Color.toRGB([51, 45, 37]),
        ROT.Color.toRGB([37, 33, 29]),
        ROT.Color.toRGB([41, 32, 24]),
    ],
    CaveWall: [
        ROT.Color.toRGB([154, 126, 97]),
        ROT.Color.toRGB([167, 138, 109]),
        ROT.Color.toRGB([160, 132, 103]),
        ROT.Color.toRGB([173, 145, 115]),
    ]
};
