// src/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

// Define a custom interface that extends Socket
interface CustomSocket extends Socket {
  user?: any; // Add the 'user' property
}

export function authenticateToken(
  socket: CustomSocket, // Use the custom interface here
  secretKey: string
) {
  const token = String(socket.handshake.query.token); // Cast token to string

  if (!token) {
    throw new Error('Authentication failed');
  }

  try {
    const user = jwt.verify(token, secretKey);

    // Attach the user to the socket for later use, if needed
    socket.user = user;
  } catch (err) {
    throw new Error('Authentication failed');
  }
}
