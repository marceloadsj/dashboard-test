import React from "react";
import socketIoClient from "socket.io-client";

import SocketContext from "./SocketContext";

const socket = socketIoClient(process.env.REACT_APP_BACKEND_URL, {
  autoConnect: false
});

export default function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
