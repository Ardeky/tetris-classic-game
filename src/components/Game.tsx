import { useGameOver } from '../utils/gameHelpers';
import Tetris from './Tetris';
import Menu from './Menu';
import { useEffect } from 'react';
import musicFile from '../assets/Music/menuIntro.mp3';

interface GameProps {
  rows: number;
  columns: number;
}

const Game: React.FC<GameProps> = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  
  useEffect(() => { 
    const audio = new Audio(musicFile); 
    audio.loop = true;

    return () => {
      if (audio) {
      audio.pause(); 
      audio.currentTime = 0;
      } 
    }; 
  }, []);

  const start = () => {
    const audio = new Audio(musicFile);
    resetGameOver();
    audio.play();
    
  };

  return (
    <div className=''>
      {gameOver ? (
        <Menu onClick={start} />
      ) : (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default Game;
