import { db } from './db'
import { User } from './models/user'; // Import your User model if you have one
import { io } from './index'; // Import the Socket.IO instance

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    users: async () => {
      try {
        // Fetch the list of users from your database (replace with your database logic)
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
  Mutation: {
    sayHello: (_: any, { name }: any) => `Hello, ${name}!`,
    createUser: async (_: any, { name, email }: any) => {
      try {
        // Create a new user in your database (replace with your database logic)
        const user = new User({ name, email });
        await user.save();
        // Emit a WebSocket event to notify clients about the new user
        io.emit('userCreated', user); // Emit the 'userCreated' event with the user data
        return user;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
  },
};

export default resolvers;
