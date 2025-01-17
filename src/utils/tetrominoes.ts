import { Cell, Position } from "./gameHelpers";

const className = 'tetromino';

export const TETROMINOES = {
  I: {
    shape: [
      [1, 1, 1, 1]
    ],
    className: `${className} ${className}__i`
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    className: `${className} ${className}__j`
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    className: `${className} ${className}__l`
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    className: `${className} ${className}__o`
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    className: `${className} ${className}__s`
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    className: `${className} ${className}__t`
  },
  
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    className: `${className} ${className}__z`
  }
};

export type TetrominoType = keyof typeof TETROMINOES; 

export type Tetromino = {
  shape: number[][],
  className: string
};

export const randomTetromino = (): Tetromino => {
  const tetrominoKeys: TetrominoType[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const index = Math.floor(Math.random() * tetrominoKeys.length);
  const key = tetrominoKeys[index];
  
  return TETROMINOES[key]; 
};

export const rotate = ({ piece, direction }: { 
    piece: number[][],
    direction: number 
}): number[][] => {
  const rows = piece.length;
  const columns = piece[0].length;
  const newPiece = Array.from({ length: columns }, () => Array(rows).fill(0));
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (direction > 0) {
        newPiece[col][rows - 1 - row] = piece[row][col];
      }
    }
  }

  return newPiece;
};

export function transferToBoard(
  className: string,
  isOccupied: boolean, 
  position: Position, 
  rows: Cell[][], 
  shape: number[][]) : Cell[][] {
  shape.forEach((row, y) => {
    row.forEach((cell, x) =>{
      if(cell){
        const occupied = isOccupied;
        const _y = y + position.row;
        const _x = x + position.column;
        rows[_y][_x] = { occupied, className }
      }
    });
  });

  return rows;
};
