
import { useState } from 'react';

function Tictactoe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
    
    // setGameHistory([...gameHistory, { board: [...newBoard], player: isXNext ? 'X' : 'O' }]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    // setGameHistory([]);
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`w-20 h-20 text-2xl font-bold m-1 border-2 border-gray-300 rounded-md bg-white hover:bg-gray-100 transition-colors
          ${board[index] === 'X' ? 'text-blue-600' : 'text-red-600'}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (board.every(square => square !== null)) {
      return 'Game ended in a draw!';
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Tic Tac Toe</h1>
        
        <div className="text-xl font-semibold mb-4 text-gray-700">
          {getStatus()}
        </div>
        
        <div className="inline-block mb-6">
          <div className="flex">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="flex">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="flex">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        
        <button
          className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-colors mb-6"
          onClick={resetGame}
        >
          Reset Game
        </button>
        
        <div className="text-left max-h-40 overflow-y-auto p-4 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-2 text-gray-700">Game History</h3>
          {gameHistory.length === 0 ? (
            <p className="text-gray-500">No moves yet</p>
          ) : (
            gameHistory.map((move, index) => (
              <div key={index} className="text-sm mb-1">
                Move {index + 1}: Player {move.player} played
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Tictactoe;