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

  socket.on('create-notification', async (data) => {
    try {
      await db.notification.create({
        data: {
          type: data.type,
          message: data.message,
          fromAlumniId: data.fromAlumniId,
          toAlumniId: data.toAlumniId,
          read: false,
        },
      });
      
      // Emit to specific user's notification channel
      io.emit(`notifications:${data.toAlumniId}`, {
        type: data.type,
        message: data.message,
        fromAlumniId: data.fromAlumniId,
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

io.listen(3001); 