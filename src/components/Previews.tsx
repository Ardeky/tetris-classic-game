import React from 'react';
import Preview from './Preview';
import { Tetromino } from '../utils/tetrominoes';

interface PreviewsProps {
  tetrominoes: Tetromino[];
}

const Previews: React.FC<PreviewsProps> = ({ tetrominoes }) => {
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();
  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);
