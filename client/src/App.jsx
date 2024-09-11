import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Welcome from "./components/Welcome";
import Sample from "./components/Sample";
import Game from "./components/Game";
import { useAppContext } from "./context/AppContext";
import { Button } from "./components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"

function App() {
  const { 
    setSocket,
    setBoard,
    roomId,
    setRoomId,
    setMatchStatus,
    setPlayers,
    setPlayerTurn,
    setTimer1,
    setTimer2, 
  } = useAppContext();

  const { toast } = useToast();

  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("This Client is connected.");
      console.log(socket.id);
      setSocket(socket);

      socket.on("room-created", (roomId,duration) => {
        setRoomId(roomId);
        setMatchStatus("WAITING");
        setTimer1({
          min:duration,
          sec:1
        })
        setTimer2({
          min:duration,
          sec:0
        })
        console.log("Room Created");
      });

      socket.on("board-init", (board) => {
        setBoard(board);
      });

      socket.on("board-update", (board) => {
        console.log("Board Updated");
        setBoard(board);
      });

      socket.on("start-match", (pX, pO, playerTurn,duration) => {
        setPlayers({pX,pO});
        setPlayerTurn(playerTurn);
        setMatchStatus("ON");
        setTimer1({
          min:duration,
          sec:1
        })
        setTimer2({
          min:duration,
          sec:0
        })
      });

      socket.on("turn-update", (turn) => {
        setPlayerTurn(turn);
      });

      socket.on("toast", (error, title, message)=>{
        toast({
          variant: (error && 'destructive'),
          title: title,
          description: message,
        })
      })
      
    });
  }, []);

  useEffect(() => {
    console.log("Room Id ::", roomId);
  }, [roomId]);

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Welcome />
      </div>
      <Game />
      <Toaster/>
    </>
  );
}

export default App;
