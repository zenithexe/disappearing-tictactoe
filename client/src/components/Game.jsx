import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";

function Square({ index, value }) {
  const { socket } = useAppContext();

  function onSquareClick(index) {
    console.log(index);
    socket.emit("move", index);
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
  if (boardState) {
    squares = Object.values(boardState);
  }
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares?.map((square, i) => (
        <Square key={i} index={i} value={square} />
      ))}
    </div>
  );
}

// function TimerDisplay({ player='PlayerName', symbol='X', isCurrentPlayer='true' }) {

//   return (
//     <div className={`flex flex-col items-center p-4 ${isCurrentPlayer ? 'bg-blue-100' : 'bg-gray-200'} rounded-lg`}>
//       <div className={`text-lg font-semibold ${isCurrentPlayer ? 'text-blue-600' : 'text-gray-600'}`}>
//         {player} ({symbol})
//       </div>
//       <div className="flex items-center mt-2">
//         <Clock className="w-4 h-4 mr-2" />
//         <span className="text-xl font-mono">
//           00:00
//         </span>
//       </div>
//     </div>
//   )
// }

function Game() {
  const { socket, board } = useAppContext();
  const [player, setPlayer] = useState();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
      <Button 
        onClick={(e) => {
            socket.emit('join-room','12345');
        }}

        className="mb-6"
      >
        Join
      </Button>
        <h1 className="text-4xl font-bold mb-8">Room</h1>
        <Board boardState={board} />
      </div>
      <Button 
        onClick={(e) => {
          socket.emit("clearBoard");
        }}

        className="mt-6"
      >
        Clear
      </Button>
    </div>
  );
}

export default Game;
