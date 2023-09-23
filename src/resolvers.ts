import { db } from './db'
import { User } from './models/user'; // Import your User model if you have one

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
        return user;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },
  },
};

export default resolvers;
