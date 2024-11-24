import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export function useWebSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001');
    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);

  return socket;
} 