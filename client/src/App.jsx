import { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Welcome from "./components/Welcome";
import Sample from "./components/Sample";
import Game from "./components/Game";
import { useAppContext } from "./context/AppContext";
import { Button } from "./components/ui/button";

function App() {
  const {setSocket, setBoard} = useAppContext();

  const socket = useMemo(() => io("http://localhost:8000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("This Client is connected.");
      console.log(socket.id)
      setSocket(socket)
      
      socket.on("boardInit", (data) => {
        setBoard(data);
      });

      socket.on('boardUpdate', (data) =>{
        setBoard(data)
      })

    });
  }, []);


  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Welcome/>
      </div>
      <Game/>
      <div>
      </div>
    </>
  );
}

export default App;
