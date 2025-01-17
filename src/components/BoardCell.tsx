import '../styles/Tetris.css'

interface BoardCellProps {
   cell: {
    occupied: boolean,
    className: string
  }; 
};

const BoardCell: React.FC<BoardCellProps> = ({ cell }) => {
    return (
        <div className={`boardCell ${cell.className}`}>
            <div className='sparkle'></div>
        </div>
    )
}

export default BoardCell;
