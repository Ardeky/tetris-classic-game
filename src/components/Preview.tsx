import React from 'react';
import BoardCell from './BoardCell';
import { createBoard } from '../utils/boardHelpers';
import { transferToBoard, Tetromino } from '../utils/tetrominoes';
import '../styles/Tetris.css';

interface PreviewsProps {
  tetromino: Tetromino;
  index: number;
}

const Preview: React.FC<PreviewsProps> = ({ tetromino, index }) => {
  const rows = 2;
  const columns = 4;

  const isOccupied = false;
  const position = { row: 0, column: 0 };
  const { shape, className } = tetromino;
  const board = createBoard(rows, columns);
  const style = { top: `${index}` };

  board.rows = transferToBoard(
    className,
    isOccupied,
    position,
    board.rows,
    shape
  );

  return (
    <div className="previews" style={style}>
      <div className="previewBoard">
        {board.rows.map((row) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(Preview);
