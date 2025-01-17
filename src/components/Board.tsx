import React from 'react';
import BoardCell from './BoardCell'
import '../styles/Tetris.css'

export interface Cell {
  occupied: boolean,
  className: string
};

export type Row = Cell[];

export interface BoardProps {
  board: { rows: Row[],
    size: { rows: number,
      columns: number
    }; 
  };
}


const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className='board'>
      {board.rows.map((row: Row) =>
        row.map((cell: Cell, x: number) => (
          <BoardCell key={x * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
};

export default Board;
