import { useState, useEffect } from "react";
import { Board, Player, Position, Cell } from "./gameHelpers";
import { transferToBoard } from "./tetrominoes";
import { movePlayer } from "./actionController";

export function createBoard (rows: number, columns: number) : Board {
  const createRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...Cell }))    
  );
  return {
    rows: createRows, size: { rows, columns },
  };
};

function findDropPosition(
  board: Board, 
  position: Position, 
  shape: number[][]
) {
  let max = board.size.rows -position.row + 1;
  let row = 0;
  for (let i = 0; i< max; i++) {
    const delta = {row: i, column: 0};
    const result = movePlayer (delta, position, shape, board);
    const {collided} = result;
    if (collided) {
      break;
    }
    row = position.row + i;
  }
  return { ...position, row };
};
export function nextBoard ( 
  board: Board, 
  player: Player, 
  resetPlayer: () => void, 
  addLineClear: (lines: number) => void 
): Board { 
  const { tetromino, position } = player; 
  const shape = tetromino.shape; 
  let rows = board.rows.map((row) => 
    row.map((cell) => (cell.occupied ? cell : { ...Cell })) 
  );
  const dropPosition = findDropPosition( board, position, shape );
  const className = `${tetromino.className} ${ 
    player.isFastDropping ? '' : 'ghost' }`
  ;
  rows = transferToBoard ( 
    className, 
    player.isFastDropping, 
    dropPosition, 
    rows, 
    shape 
  ); 
  
  if (!player.isFastDropping) { 
    rows = transferToBoard ( 
      tetromino.className, 
      player.collided, 
      position, 
      rows, 
      shape 
    ); 
  } 
  
  const blankRow = rows[0].map((_) => ({ ...Cell })); 
  let lineClear = 0; 
  
  rows = rows.reduce<Cell[][]>((acc, row) => {
    if (row.every((column) => column.occupied)) { 
      lineClear++; acc.unshift([...blankRow]); 
    } else { 
      acc.push(row); 
    } 
    
    return acc; 
  }, [])
  if (lineClear > 0) { 
    addLineClear(lineClear); 
  } 
  
  if (player.collided || player.isFastDropping) {
    resetPlayer(); 
  }
  return { rows, size: { ...board.size } }; 
};
export function useBoard ( 
  rows: number, 
  columns: number, 
  player: Player, 
  resetPlayer: () => void, 
  addLineClear: (lines: number) => void 
): [Board, React.Dispatch<React.SetStateAction<Board>>] { 
  const [board, setBoard] = useState(() => createBoard(rows, columns));
  
  useEffect(() => {
    if (player && player.tetromino) {
      setBoard((previousBoard) => 
        nextBoard ( 
          previousBoard, 
          player, 
          resetPlayer, 
          addLineClear 
        ) 
      ); 
    } 
  }, [player, resetPlayer, addLineClear]); 
  
  return [board, setBoard]; 
};

export function hasCollision ( 
    board: Board, 
    position: Position, 
    shape: number[][] 
) {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;
    
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
  
export const isWithinBoard = ( 
    board: Board, 
    position: Position, 
    shape: readonly number[][] 
) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];
        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
  