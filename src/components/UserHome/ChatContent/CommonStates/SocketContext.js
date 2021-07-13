import React, { useContext, useEffect, useState } from "react";
import io from "socketclient-4.1.2";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}
//connecting to the deployed heroku server
export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  const ENDPOINT = "https://piperchatserverfinal.herokuapp.com/";
  useEffect(() => {
    const newSocket = io(ENDPOINT, { query: { id } });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);

  //providing socket provider to all the component in the chat to communicate
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
