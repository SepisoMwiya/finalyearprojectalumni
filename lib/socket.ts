import { Server } from 'socket.io';
import { db } from '@/lib/prisma';

export const io = new Server({
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL,
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('join-chat', (chatId: string) => {
    socket.join(`chat:${chatId}`);
  });

  socket.on('leave-chat', (chatId: string) => {
    socket.leave(`chat:${chatId}`);
  });

  socket.on('join-notifications', (userId: string) => {
    socket.join(`notifications:${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

io.listen(3001); 