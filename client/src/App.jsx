import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import Welcome from "./components/Welcome";
import Game from "./components/Game";
import { useAppContext } from "./context/AppContext";
import { useToast } from "@/components/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "./components/ui/button";

const gameServerURL = import.meta.env.VITE_API_URL;


function App() {
  const {
    setSocket,
    setBoard,
    roomId,
    setRoomId,
    matchStatus,
    setMatchStatus,
    setPlayers,
    setPlayerTurn,
    setTimer1,
    setTimer2,
    setMessage,
    setWinner,
    setWinningLine,
  } = useAppContext();

  const { toast } = useToast();
  const [isGameServerActive, setIsGameServerActive] = useState(false);
  const [isMount, setMount] = useState(true)
 


  async function startServer() {
    try {
      if (!isGameServerActive) {
        const res = await fetch(gameServerURL);
        if (res.ok) {
          setIsGameServerActive(true);
        }
      }
    } catch (e) {
      console.log(e);
      if (!isGameServerActive) {
        setTimeout(startServer, 3000);
      }
    }
  }

  useEffect(() => {
    startServer();
  }, []);

  useEffect(()=>{
    if(isMount){
      setMount(false)
      return
    }

    connectWebSocket();
  },[isGameServerActive])

  function connectWebSocket() {
    const socket = io(gameServerURL);
    
    socket.on("connect", () => {
      console.log("This Client is connected.");
      console.log(socket.id);
      setSocket(socket);

      socket.on("room-created", (roomId, duration) => {
        setRoomId(roomId);
        setMatchStatus("WAITING");
        setTimer1({
          min: duration,
          sec: 0,
        });
        setTimer2({
          min: duration,
          sec: 0,
        });

        setMessage("Invite a Player")
        console.log("Room Created");
      });

      socket.on("board-init", (board) => {
        setBoard(board);
      });

      socket.on("board-update", (board, message) => {
        console.log("Board Updated");
        setBoard(board);

        if(message){
          setMessage(message)
        }
      });

      socket.on("start-match", (pX, pO, playerTurn, duration) => {
        setPlayers({ pX, pO });
        setPlayerTurn(playerTurn);
        setMatchStatus("ON");
        setTimer1({
          min: duration,
          sec: 0,
        });
        setTimer2({
          min: duration,
          sec: 0,
        });
        setMessage(null);
      });

      socket.on("turn-update", (turn) => {
        setPlayerTurn(turn);
      });

      socket.on("game-over-by-timeout", (winnerId, timeoutPlayer) => {
        setMessage(`${timeoutPlayer}'s Time Up.`);
        setWinner(winnerId);
        setMatchStatus("END");
      });

      socket.on("game-over-by-disconnect", (winnerId,disconnectedPlayer)=>{
        setMessage(`${disconnectedPlayer} disconnected.`)
        setWinner(winnerId);
        setMatchStatus("END")
      })

      socket.on("game-over-by-move", (winner, winningLine, board, winnerName) => {
        console.log("Disconnect")
        setWinner(winner);
        setWinningLine(winningLine);
        setBoard(board);
        setMessage(`${winnerName} Wins`)
        setMatchStatus("END");
      });
      
      socket.on("game-draw",(board)=>{
        setMatchStatus('DRAW');
        setBoard(board);
      })


      socket.on("toast", (error, title, message) => {
        toast({
          variant: error && "destructive",
          title: title,
          description: message,
        });
      });
    });

    return () => {
      socket.emit("disconnect");
    };
  }



  return (
    <>
      {matchStatus == "OFF" ? (
        <div className="h-screen flex justify-center items-center">
          <Welcome connectWebSocket={connectWebSocket} isGameServerActive={isGameServerActive} />
        </div>
      ) : (
        <Game />
      )}
      <Toaster />
    </>
  );
}

export default App;
