// index.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import { db } from './db'; // Import the database connection

const app = express();

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

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Error starting the server:', error);
});
