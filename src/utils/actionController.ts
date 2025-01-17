import { Board, Player, Position } from "./gameHelpers";
import { isWithinBoard, hasCollision } from "./boardHelpers";
import {  rotate } from "./tetrominoes";

export const Action = {
  Left: "Left",
  FastDrop: "FastDrop",
  Pause: "Pause",
  Quit: "Quit",
  Right: "Right",
  Rotate: "Rotate",
  SlowDrop: "SlowDrop"
} as const;

export type ActionType = typeof Action[keyof typeof Action];

export interface KeyMap { 
  ArrowUp: ActionType; 
  ArrowDown: ActionType; 
  ArrowLeft: ActionType; 
  ArrowRight: ActionType; 
  Escape: ActionType; 
  KeyP: ActionType; 
  Space: ActionType; 
};

export const Key: KeyMap = { 
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  Escape: Action.Quit,
  KeyP: Action.Pause,
  Space: Action.FastDrop
};
export const actionKey = (keyCode: keyof KeyMap): ActionType | undefined => Key[keyCode];

export function attemptRotation ( board: Board, player: Player, setPlayer: (player: Player) => void ) {
  const shape = rotate({ 
    piece: player.tetromino.shape,
    direction: 1
  });

  const position = player.position;
  const isValidRotation = 
    isWithinBoard( board, position, shape ) &&
    !hasCollision( board, position, shape );

  if ( isValidRotation ) {
    setPlayer ({
      ...player,
      tetromino: { ...player.tetromino, shape: shape as number[][] }
    });
  } else {
    return false;
  }
};

export function movePlayer ( 
  delta: Position, 
  position: Position,
  shape: number[][],
  board: Board
): { collided: boolean, nextPosition: Position }{  
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column
  };
  const collided = hasCollision ( board, desiredNextPosition, shape );
  const isOnBoard = isWithinBoard( board, desiredNextPosition, shape );

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position: desiredNextPosition;
  
  const moveDown = delta.row > 0;
  const isHitted = moveDown && (collided || !isOnBoard);
  
  return {collided: isHitted, nextPosition}
};

export function attemptMovement (
  action: ActionType,
  board: Board,
  player: Player,
  setPlayer: (player: Player) => void,
  setgameOver: (isGameOver: boolean) => void
) : void {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row++ ;
  } else if (action === Action.Left) {
    delta.column-- ;
  } else if (action === Action.Right) {
    delta.column++ ;
  }

  player.position;
  player.tetromino.shape;

  const { collided, nextPosition } = movePlayer (
    delta,
    player.position,
    player.tetromino.shape,
    board
  );
  
  const isGameOver = collided && player.position.row === 0;
  
  if (isGameOver) {
    setgameOver(true);
  }

  setPlayer({ ...player, collided, isFastDropping, position: nextPosition });
};

export function playerController (
  action: ActionType, 
  board: Board, 
  player: Player, 
  setPlayer: (player: Player) => void, 
  setgameOver: ()=> void
): void {
  if(!action){ return };

  if (action === Action.Rotate) {
    attemptRotation( board, player, setPlayer );
  } else {
    attemptMovement( action, board, player, setPlayer, setgameOver);
  }
};
