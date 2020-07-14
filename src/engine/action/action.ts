

export type Action = EnterAction 
                   | ExitAction
                   | MoveAction




export interface EnterAction {
  type: 'enter';
}

export interface ExitAction {
  type: 'exit';
}

export interface MoveAction {
  type: 'move';
  dir: [number, number];
}
