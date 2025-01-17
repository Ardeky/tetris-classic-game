import { useState, useEffect, useCallback, useRef } from 'react';
import Board from '../components/Board';
import { Tetromino } from './tetrominoes';
import { GameStats } from '../components/GameStats';

export interface Cell { 
  occupied: boolean, 
  className: string 
};

export interface Position {
  row: number;
  column: number;
};

export interface Player { 
  tetromino: Tetromino; 
  position: { row: number, column: number }, 
  collided: boolean,
  isFastDropping: boolean,
  tetrominoes: Tetromino[]
};

export interface Board { 
  rows: Cell[][], 
  size: { rows: number, columns: number }
};

export const Cell = {
  occupied: false, className: ""
};

type Callback = () => void;

export const useInterval = (
  callback: Callback,
  delay: number | null,
): void => {
  const savedCallback = useRef<Callback>();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useGameOver = (): [boolean, () => void, () => void] => {
  const [gameOver, setGameOver] = useState<boolean>(true);
  
  const resetGameOver = useCallback(() => {
    setGameOver(false);
  }, []);

  return [gameOver, () => setGameOver(true), resetGameOver];
};

export const createGameStats = () => ({
  level: 1, linesCompleted: 0, linesPerLevel: 10, points: 0,
});

export const useGameStats = (): [GameStats, (lines: number) => void] => {
  const [gameStats, setGameStats] = useState<GameStats>(createGameStats);
  
  const addLineClear = useCallback((lines: number) => {
    setGameStats((previous) =>{
      const points = previous.points + lines * (previous.level * 50);
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      
      const level = 
        newLinesCompleted >= linesPerLevel
        ? previous.level + 1 : previous.level;

      const linesCompleted = newLinesCompleted % linesPerLevel;
      
      return { level, linesCompleted, linesPerLevel, points};
    }, );
  }, []);
  
  return [gameStats, addLineClear];
}
