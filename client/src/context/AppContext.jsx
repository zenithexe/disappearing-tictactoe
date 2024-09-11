import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [board, setBoard] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  });
  const [matchStatus, setMatchStatus] = useState("OFF")
  const [roomId, setRoomId] = useState("N/A");
  const [players, setPlayers] = useState({
    pX: "Player1",
    pO: "Player2",
  });
  const [playerTurn, setPlayerTurn] = useState();
  const [isTimer1,setIsTimer1] = useState(true)
  const [isTimer2,setIsTimer2] = useState(true)

  const [timer1,setTimer1] = useState({
    min:5,
    sec:1,
  })

  const [timer2,setTimer2] = useState({
    min:5,
    sec:1,
  })

  return (
    <AppContext.Provider
      value={{
        socket,
        setSocket,

        board,
        setBoard,
        
        roomId,
        setRoomId,
        
        matchStatus,
        setMatchStatus,

        players,
        setPlayers,

        playerTurn,
        setPlayerTurn,

        isTimer1,
        setIsTimer1,

        timer1,
        setTimer1,

        timer2,
        setTimer2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
