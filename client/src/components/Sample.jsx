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

function TimerDisplay({ player='PlayerName', symbol='X', isCurrentPlayer='true' }) {

  return (
    <div className={`flex flex-col items-center p-4 ${isCurrentPlayer ? 'bg-blue-100' : 'bg-gray-200'} rounded-lg`}>
      <div className={`text-lg font-semibold ${isCurrentPlayer ? 'text-blue-600' : 'text-gray-600'}`}>
        {player} ({symbol})
      </div>
      <div className="flex items-center mt-2">
        <Clock className="w-4 h-4 mr-2" />
        <span className="text-xl font-mono">
          00:00
        </span>
      </div>
    </div>
  )
}

export default function Sample() {

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