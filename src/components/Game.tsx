import { useGameOver } from '../utils/gameHelpers';
import Tetris from './Tetris';
import Menu from './Menu';
import { useEffect, useRef } from 'react';
import musicFile from '../assets/Music/menuIntro.mp3';

interface GameProps {
  rows: number;
  columns: number;
}

const Game: React.FC<GameProps> = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const audioRef = useRef<HTMLAudioElement | null>(null); 
  
  useEffect(() => {
    audioRef.current = new Audio(musicFile);
    audioRef.current.loop = true; 
    audioRef.current.play();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } 
    }; 
  }, []); 
  
  const start = () => {
    resetGameOver(); 
    if (audioRef.current) {
      audioRef.current.play(); 
    } 
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
