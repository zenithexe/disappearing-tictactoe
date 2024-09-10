import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [board, setBoard] = useState();
  const [roomId, setRoomId] = useState('');

  return (
    <AppContext.Provider value={{ socket, setSocket, board, setBoard }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
}
