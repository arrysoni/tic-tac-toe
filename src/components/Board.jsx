import React, { useState } from 'react';
import Square from './Square';

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;   // Ignore the click if the square is filled and when the winner is already declared

    const nextSquares = [...squares];                     // Create a copy of the board
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
    
  // Function to calculate the winner
  function calculateWinner(squares) {
    const lines = [                     // All possible combinations of a winner
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of lines) {    // Here, [a,b,c] represents the positions in the matrix square
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const isTie = !winner && squares.every(square => square !== null);


  // Displaying the status
  let status;
  if (winner) {
    status = `🎉 Winner: ${winner}`;
  } else if (isTie) {
    status = `🤝 It's a Tie!`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }


  // Resetting the game
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map(i => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

/*
It’s like saying:

For each index i in [0, 1, 2], create a <Square> component, and tell it:
What to display (X/O/empty)

What to do when clicked (mark this square)

*/
export default Board;
