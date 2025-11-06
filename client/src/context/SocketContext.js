import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth(); // Get logged in user

  useEffect(() => {
    if (user) {
      // Connect to the socket server
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      // We can add a 'userConnected' event here if needed
      // newSocket.emit('userConnected', user._id);

      // Disconnect when component unmounts
      return () => newSocket.close();
    } else {
      // If no user, disconnect
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};