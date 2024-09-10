import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import CountdownTimer from "./CountdownTimer";

function Square({ index, value }) {
  const { socket, roomId } = useAppContext();

  function onSquareClick(index) {
    console.log(index);
    socket.emit("move", index, roomId);
  }
  return value ? (
    <Button
      disabled
      className="h-20 w-20 border rounded-lg shadow text-gray-950 border-gray-300 bg-white text-4xl font-bold leading-9 m-1"
    >
      {value}
    </Button>
  ) : (
    <Button
      variant="outline"
      onClick={() => {
        onSquareClick(index + 1);
      }}
      className="h-20 w-20 border rounded-lg shadow border-gray-300 bg-white font-bold text-gray-300 leading-9 m-1"
    >
      {index + 1}
    </Button>
  );
}

function Board({ boardState }) {
  let squares;

  squares = Object.values(boardState);
  
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares?.map((square, i) => (
        <Square key={i} index={i} value={square} />
      ))}
    </div>
  );
}

function TimerDisplay({ player, symbol, isActive, timer }) {
  return (
    <div className={`flex space-x-3 py-2 px-3 rounded-md ${isActive ? "bg-white":"bg-gray-200"} shadow-sm`}>
      <div className="flex items-center justify-center w-10 h-10 text-2xl font-bold border border-current rounded">
        {symbol}
      </div>
      <div className="flex flex-col">
        <span className="font-medium truncate max-w-[100px]">{player}</span>
        <div className="flex items-center text-sm">
          <Clock className="w-3 h-3 mr-1" />
          <span className="font-mono">
            <CountdownTimer/>
          </span>
        </div>
      </div>
    </div>
  )
}

function Game() {
  const { socket, board, roomId, players, playerTurn } = useAppContext();
  const [player, setPlayer] = useState();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
        <div className="flex gap-2 my-3">
          <TimerDisplay player={players.pX} symbol={"X"} isActive={playerTurn==='pX'}/>
          <TimerDisplay player={players.pO} symbol={"O"} isActive={playerTurn==='pO'}/>
        </div>
        <Board boardState={board} />
      </div>
      <Button 
        onClick={(e) => {
          socket.emit("clearBoard", roomId);
        }}

        className="mt-6"
      >
        Clear
      </Button>
    </div>
  );
}

export default Game;
