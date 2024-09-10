import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Welcome from "./components/Welcome";
import Sample from "./components/Sample";
import Game from "./components/Game";
import { useAppContext } from "./context/AppContext";
import { Button } from "./components/ui/button";

function App() {
  const { setSocket, setBoard, roomId, setRoomId, setPlayers, setPlayerTurn } =
    useAppContext();

  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("This Client is connected.");
      console.log(socket.id);
      setSocket(socket);

      socket.on("room-created", (roomId) => {
        setRoomId(roomId);
        console.log("Room Created");
      });

      socket.on("board-init", (data) => {
        setBoard(data);
      });

      socket.on("board-update", (data) => {
        console.log("Update");
        setBoard(data);
      });

      socket.on("player-update", (pX, pO, turn) => {
        setPlayers({ pX, pO });
        setPlayerTurn(turn)
      });

      socket.on('update-turn', (turn)=>{
        setPlayerTurn(turn)
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
      <div></div>
    </>
  );
}

export default App;
