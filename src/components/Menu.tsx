import React from 'react';
import '../styles/Tetris.css';
import '../styles/Animation.css';

interface MenuProps {
    onClick: () => void,
};

const Menu: React.FC<MenuProps> = ({ onClick }) => {
    return (
        <div className="menu">
            <h1 className="neon-text" data-text='Tetris'>Tetris</h1>
            <button className="" onClick={onClick}>
                Modo Clasico
            </button>
        </div>
    );
};

export default Menu;
