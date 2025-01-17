import React from 'react';
import '../styles/Tetris.css';
import { Board, Player, useInterval } from '../utils/gameHelpers'
import { Action, actionKey, ActionType, Key, KeyMap, playerController } from '../utils/actionController';
import { GameStats } from './GameStats';
import { useDropTime } from '../utils/dropTime';

interface GameControllerProps {
  board: Board,
  gameStats: GameStats,
  player: Player,
  setPlayer: React.Dispatch<React.SetStateAction<Player>>,
  setGameOver: (gameOver: boolean) => void
}

const GameController: React.FC<GameControllerProps> = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime(gameStats);
  
  useInterval(() => {
    const action = Action.SlowDrop;
    handleInput(action);
  }, dropTime);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const code = event.code as keyof KeyMap;

    if (code in Key) {
      const action = actionKey(code);
      if (action) {
        if (action === Action.Quit) {
          setGameOver(true);
        } else if (action === Action.Pause) {
          if (dropTime) {
            pauseDropTime();
          } else {
            resumeDropTime();
          }
        } else {
          handleInput(action);
        }
      }
    }
  }

  function handleInput(action: ActionType) {
    const wrappedSetGameOver = () => setGameOver(true);
    playerController(action, board, player, setPlayer, wrappedSetGameOver);
  }

  return (
    <input
      className='GameController'
      type='text'
      onKeyDown={onKeyDown}
      autoFocus
    />
  );
};

export default GameController;
