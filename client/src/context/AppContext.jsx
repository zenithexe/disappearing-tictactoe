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
  const [roomId, setRoomId] = useState("");

  return (
    <AppContext.Provider
      value={{ socket, setSocket, board, setBoard, roomId, setRoomId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
