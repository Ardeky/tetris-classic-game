import { useState, useCallback } from 'react';
import { randomTetromino, Tetromino } from './tetrominoes';
import { Player } from './gameHelpers';

export function createPlayer(previous: Player | null = null): Player {
  let tetrominoes: Tetromino[];
  
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(6)
      .fill(0)
      .map(() => randomTetromino());
  }
  
  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 3 },
    tetrominoes,
    tetromino: tetrominoes.pop()!
  };
}
  
export const usePlayer = () => {
  const [player, setPlayer] = useState(() => createPlayer());
  const resetPlayer = useCallback(() => {
    setPlayer((prev) => createPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer] as const;
};
