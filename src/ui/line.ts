export interface lineOpts {
  colA    ?: number;
  colB    ?: number;
  frame   ?: string;
  padding ?: number;
  margin  ?: number;
}

/**
 * Representation of a single line in the UI.
 * 
 * @param width The line width.
 * @param icon  The prefix icon that represents the line item visually.
 * @param name  The name of the line item.
 * @param desc  The prose description of the line item.
 * @param opts  Any [lineOpts] configuration.
 */
export function Line(width: number, icon: string, name: string, desc: string, opts?: lineOpts): string
{
  /**
   * 
   *                 |- --- colA --- -| |- --- colB --- -|
   *      (1)        (2)    (3)         (4)                (5)               (7)
   *    | |-margin-| [icon] |-padding-| [name] |-padding-| [desc] |-margin-| |-append-| |
   *    | |                                                                |            |
   *    | |- - - - - - - - - - - - - (6) body - - - - - - - - - - - - - - -|            |
   *    |                                                                               |
   *    |-\\\\\\\\\\\\\\\\\\\\\\\\\\ total line length \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-|
   * 
   *    Padding should be padding value + (colAwidth - name.length).
   * 
   *    (1) margin:   extra spacing between frame and body
   *    (2) icon:     the glyph that represents something, e.g. an item, a spell, etc.
   *    (3) padding:  spacing that follows [icon] and [name] fields. Zero length if fields absent.
   *    (4) name:     the in-game name of the item, spell, or whatever it is.
   *    (5) desc:     the description of the thing.
   *    (6) body:     the entire calculated line minus the append and the frame edges.
   *    (7) append:   extra spacer that fills out the x dimension to make things nice and purty.
   *                  [append] = [total line length] - [body length]
   */

  let body: string;
  let bodyLength: number = 0;
  let _opts = opts || {};

  let colA     = _opts['colA']      || 0;
  let colB     = _opts['colB']      || 0;
  let frame    = _opts['frame']     || '';
  let margin   = _opts['margin']    || 0;
  let padding  = _opts['padding']   || 0;
  
  body = '';

  // IconField
  let iconField: string = '';
  if (icon.length > 0) {
    let iconFieldPadding = padding + (colA - icon.length);
    iconField = `${icon}` + ' '.repeat(iconFieldPadding);
    bodyLength += iconField.length;
  }

  // NameField
  let nameField: string = '';
  if (name.length > 0) {
    let nameFieldPadding = padding + (colB - name.length);
    nameField = `${name}` + ' '.repeat(nameFieldPadding);
    bodyLength += nameField.length;
  }

  // DescField
  let descField: string = '';
  if (desc.length > 0) {
    descField = `${desc}`;
    bodyLength += descField.length;
  }

  // Margin
  let marginField = ' '.repeat(margin);
  bodyLength += marginField.length;
  
  let append: string = '';
  if (width > bodyLength) {
    append = ' '.repeat(width - bodyLength);
  } else if (width < bodyLength) {
    append = '︱';
  }

  append = "%b{#000000}" + append;

  body = marginField + iconField + nameField + descField + marginField
  return frame + body + append + frame;
}