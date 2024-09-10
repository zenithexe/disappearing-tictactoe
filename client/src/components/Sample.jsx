"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

function Square({ value }) {
  return (
    <button
      className="h-20 w-20 border rounded-lg shadow border-gray-300 bg-white text-4xl font-bold leading-9 m-1">
      {value}
    </button>
  )
}

function Board({ squares }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares.map((square, i) => (
        <Square key={i} value={square} />
      ))}
    </div>
  )
}

function TimerDisplay({ player, symbol, isCurrentPlayer, timer }) {
  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60

  return (
    <div className={`flex items-center space-x-3 p-2 rounded-md ${isCurrentPlayer ? 'bg-gray-700 text-white' : 'bg-secondary'}`}>
      <div className="flex items-center justify-center w-10 h-10 text-2xl font-bold border border-current rounded">
        {symbol}
      </div>
      <div className="flex flex-col">
        <span className="font-medium truncate max-w-[100px]">{player}</span>
        <div className="flex items-center text-sm">
          <Clock className="w-3 h-3 mr-1" />
          <span className="font-mono">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Sample() {

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] }
      }
    }
    return { winner: null, line: null }
  }


  let status
  if (winner) {
    status = `Winner: ${winner === "X" ? player1 : player2}`
  } else if (currentSquares.every(Boolean)) {
    status = "Draw!"
  } else {
    status = `Next player: ${currentPlayer === "X" ? player1 : player2}`
  }

  const [squares, setSquares] = useState(Array(9).fill(null))


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Room</h1>
        <div className="flex justify-between space-x-4 mb-4">
          <TimerDisplay symbol="X" />
          <TimerDisplay symbol="O" />
        </div>
        <Board squares={squares} />
      </div>
    </div>
  )
}