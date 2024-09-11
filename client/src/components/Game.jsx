import React, { useEffect, useState } from "react";
import { Clock, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import CountdownTimer from "./CountdownTimer";
import { useToast } from "@/components/hooks/use-toast";
import { Input } from "./ui/input";
import Loading from "./Loading";
import Result from "./Result";

function Square({ index, value, isWinning }) {
  const { socket, roomId, matchStatus, timer1, timer2 } = useAppContext();

  function onSquareClick(index) {
    console.log(index);
    socket.emit("move", index, roomId, timer1, timer2);
  }

  return value || matchStatus != "ON" ? (
    <Button
      disabled
      className={`h-20 w-20 border rounded-lg shadow text-gray-950 border-gray-300 ${
        isWinning ? "bg-green-200" : "bg-white"
      } text-4xl font-bold leading-9 m-1`}
    >
      {value ? value : "-"}
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
  const { winningLine } = useAppContext();
  let squares = Object.values(boardState);

  return (
    <div className="grid grid-cols-3 gap-1">
      {squares?.map((square, i) => (
        <Square
          key={i}
          index={i}
          value={square}
          isWinning={
            winningLine ? winningLine.includes((i + 1).toString()) : false
          }
        />
      ))}
    </div>
  );
}

function TimerDisplay({ timerState, seTimerState, player, symbol, isActive }) {
  return (
    <div
      className={`flex space-x-3 py-2 px-3 rounded-md ${
        isActive ? "bg-white" : "bg-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center justify-center w-10 h-10 text-2xl font-bold border border-current rounded">
        {symbol}
      </div>
      <div className="flex flex-col">
        <span className="font-medium truncate max-w-[100px]">{player}</span>
        <div className="flex items-center text-sm">
          <Clock className="w-3 h-3 mr-1" />
          <span className="font-mono">
            <CountdownTimer
              timerState={timerState}
              setTimerState={seTimerState}
              isTimerEnable={isActive}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

function RoomCodeDisplay({ roomCode }) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode).then(
      () => {
        toast({
          title: "Room code copied!",
          description: "The room code has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="flex items-center mt-4 mb-2">
      <Input
        value={"Room: " + roomCode}
        readOnly
        className="w-32 text-center font-bold font-mono bg-white"
      />
      <Button variant="ghost" size="icon" onClick={copyToClipboard}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}

function Game() {
  const {
    socket,
    board,
    roomId,
    matchStatus,
    players,
    playerTurn,
    setPlayerTurn,
    isTimer1,
    setIsTimer1,

    timer1,
    setTimer1,

    timer2,
    setTimer2,
  } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
        <RoomCodeDisplay roomCode={roomId} />
        {matchStatus == "WAITING" ? (
          <div className="my-3">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-2 my-3">
            <TimerDisplay
              timerState={timer1}
              seTimerState={setTimer1}
              player={players.pX}
              symbol={"X"}
              isActive={playerTurn === "pX"}
            />
            <TimerDisplay
              timerState={timer2}
              seTimerState={setTimer2}
              player={players.pO}
              symbol={"O"}
              isActive={playerTurn === "pO"}
            />
          </div>
        )}
        <Board boardState={board} />
      </div>
      <Result />
    </div>
  );
}

export default Game;
