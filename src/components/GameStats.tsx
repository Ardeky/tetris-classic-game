import React from 'react';
import '../styles/Tetris.css';

export interface GameStats {
  level: number;
  points: number;
  linesCompleted: number;
  linesPerLevel: number;
}
interface GameStatsProps {
  gameStats: GameStats;
}
const GameStats: React.FC<GameStatsProps> = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;
  return (
    <ul className="gameStats gameStatsRight">
      <li>Nivel</li>
      <li className="value">{level}</li>
      <li>Proximo Nivel</li>
      <li className="value">{linesToLevel}</li>
      <li>Puntos</li>
      <li className="value">{points}</li>
    </ul>
  );
};
export default React.memo(GameStats);
