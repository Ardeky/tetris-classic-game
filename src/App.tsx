import React from 'react';
import Game from './components/Game';
import './App.css'

const App: React.FC = () => (
  <div className="App">
    <Game rows={20} columns={10} />
  </div>
);

export default App;
