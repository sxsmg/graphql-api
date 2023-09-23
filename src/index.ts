import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Server } from 'socket.io';
import typeDefs from './schema';
import resolvers from './resolvers';
import { db } from './db';
import { authenticateToken } from './authMiddleware';
import { signMiddleware } from './signMiddleware';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log('SecretKey', secretKey);

io.use((socket, next) => {
  signMiddleware(socket, secretKey, next);
});
io.use((socket, next) => {
  try {
    authenticateToken(socket, secretKey);
    next();
  } catch (error) {
    socket.disconnect();
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

interface MyContext {
  authScope?: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }: ExpressContext): Promise<MyContext> => {
    const authScope = await getScope(req.headers.authorization);
    return {
      authScope,
    };
  },
  plugins: [
    {
      async requestDidStart({ context }) {
        // Access the contextValue
        console.log(context.authScope);
      },
    },
  ],
});


async function startServer() {
  await db;
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

async function getScope(authorizationHeader: string | undefined): Promise<string | undefined> {
  // Implement your authorization logic here, e.g., decode JWT
  return authorizationHeader ? 'ADMIN' : undefined;
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});

export { io };
