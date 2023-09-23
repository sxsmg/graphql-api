// src/signMiddleware.ts
import jwt from 'jsonwebtoken';



export function signMiddleware(socket: any, secretKey: string, next: any) {
    const token = socket.handshake.query.token;
  
    if (!token) {
      console.log("NOT TOKEN");
      // If the user doesn't have a token, generate and sign a new one
      const user = { id: socket.id }; // Customize this as needed
      const newToken = jwt.sign(user, secretKey);
      
      console.log("NEW TOKEN", newToken);
      // Send the new token to the client
      socket.emit('newToken', newToken);
        
      // Attach the user to the socket for later use, if needed
      socket.user = user;
    }
  
    next();
  }
  