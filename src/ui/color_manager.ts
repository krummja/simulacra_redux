import * as ROT from 'rot-js';

export type Color = [number, number, number];

/**
 *  All colors must be converted to hex strings when they arrive at ROT.Display.
 *  The problem is that there are a number of operations on colors that require them to be
 *  arrays of numerical values.
 */

// ROT.Display.draw(x: number, y: number, ch: string, fg: string, bg: string)

export class ColorManager
{
  public static Colors: {[key: string]: string[]} = {
    CaveFloor: [
      ROT.Color.toRGB([41, 35, 28]),      // #29231c
      ROT.Color.toRGB([51, 45, 37]),      // #332d25
      ROT.Color.toRGB([37, 33, 29]),      // #25211d
      ROT.Color.toRGB([41, 32, 24]),      // #292018
    ],
    CaveWall: [
      ROT.Color.toRGB([154, 126, 97]),    // #9a7e61
      ROT.Color.toRGB([167, 138, 109]),   // #a78a6d
      ROT.Color.toRGB([160, 132, 103]),   // #a08467
      ROT.Color.toRGB([173, 145, 115]),   // #ad9173
    ]
  }

  public static darken(color: string, amount: number): string
  {
    if (amount < 0.0 || amount > 1.0) {
      throw new RangeError(`Value must be in range [0.0-1.0]! Got ${amount}`);
    }

    let factor = 255 * amount;
    let _color = ColorManager.rgbify(color);
    let darker = ROT.Color.multiply(_color, [factor, factor, factor]);
    return ROT.Color.toHex(darker);
  }

  public static pickColor(colors: Color[], floor?: number): Color {
    let max = colors.length;
    if (floor && floor > max) {
      throw new RangeError(`Randomization floor ${floor} is greater than max value ${max}!`);
    }
    let min = floor || 0;
    let index = Math.floor(Math.random() * (max - min) + min);
    return colors[index];
  }

  private static hexify(color: Color)
  {
    let hex = ROT.Color.toHex(color);
    return hex.toString();
  }

  private static rgbify(color: string)
  {
    let rgb = ROT.Color.fromString(color);
    return rgb as Color;
  }
}