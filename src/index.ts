import express from 'express';
import http from 'http'; // Import the http module
import { ApolloServer } from 'apollo-server-express';
import { Server } from 'socket.io'; // Import the Socket.IO library
import typeDefs from './schema';
import resolvers from './resolvers';
import { db } from './db'; // Import the database connection
import { authenticateToken } from './authMiddleware';
import { signMiddleware } from './signMiddleware'; // Import the signMiddleware


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


const crypto = require('crypto');// Generate the secret key here
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log("SecretKey", secretKey);

io.use((socket, next) => {
  signMiddleware(socket, secretKey, next); // Pass the secretKey to signMiddleware
});
io.use((socket, next) => {
  try {
    authenticateToken(socket, secretKey); // Use the authenticateToken function without (err, user) arguments
    next();
  } catch (error) {
    socket.disconnect();
  }
});


io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle WebSocket events here
    socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server asynchronously
async function startServer() {
  // Wait for the database connection to be established
  await db;

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});

export { io }; 