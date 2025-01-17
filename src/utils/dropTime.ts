import { useState, useCallback, useEffect } from 'react';

const defaultDropTime = 1050;
const minDropTime = 50;
const speedIncrease = 50;

interface GameStats {
  level: number;
}

export const useDropTime = (gameStats: GameStats): [number | null, () => void, () => void] => {
  const [dropTime, setDropTime] = useState<number | null>(defaultDropTime);
  const [previousDropTime, setPreviousDropTime] = useState<number | null>(null);
  
  const resumeDropTime = useCallback(() => {
    if (previousDropTime !== null) {
      setDropTime(previousDropTime);
      setPreviousDropTime(null);
    }
  }, [previousDropTime]);
  
  const pauseDropTime = useCallback(() => {
    if (dropTime !== null) {
      setPreviousDropTime(dropTime);
      setDropTime(null);
    }
  }, [dropTime]);
  
  useEffect(() => {
    const speed = speedIncrease * gameStats.level;
    const newDropTime = Math.max(defaultDropTime - speed, minDropTime);
    setDropTime(newDropTime);
  }, [gameStats.level]);
  
  return [dropTime, pauseDropTime, resumeDropTime];
};
