import React from 'react';
import Board from './Board';
import GameStats from './GameStats';
import Previews from './Previews';
import GameController from './GameController';
import { usePlayer } from '../utils/playerHelpers';
import { useGameStats } from '../utils/gameHelpers';
import { useBoard } from '../utils/boardHelpers';
import '../styles/Tetris.css';

interface TetrisProps {
  rows: number;
  columns: number;
  setGameOver: (gameOver: boolean) => void;
}

const Tetris: React.FC<TetrisProps> = ({ rows, columns, setGameOver }) => {
  const [gameStats, addLineClear] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard(
    rows, columns, player, resetPlayer, addLineClear
  );

  return (
    <div className="tetris">
      <Board board={board} />
      <div className='statsAndPreviews'>
        <Previews tetrominoes={player.tetrominoes} />
        <GameStats gameStats={gameStats} />
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
