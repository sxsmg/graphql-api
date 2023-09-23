"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./models/user"); // Import your User model if you have one
const index_1 = require("./index"); // Import the Socket.IO instance
const resolvers = {
    Query: {
        hello: () => 'Hello, World!',
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Fetch the list of users from your database (replace with your database logic)
                const users = yield user_1.User.find();
                return users;
            }
            catch (error) {
                throw new Error('Failed to fetch users');
            }
        }),
    },
    Mutation: {
        sayHello: (_, { name }) => `Hello, ${name}!`,
        createUser: (_, { name, email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Create a new user in your database (replace with your database logic)
                const user = new user_1.User({ name, email });
                yield user.save();
                // Emit a WebSocket event to notify clients about the new user
                index_1.io.emit('userCreated', user); // Emit the 'userCreated' event with the user data
                return user;
            }
            catch (error) {
                throw new Error('Failed to create user');
            }
        }),
    },
};
exports.default = resolvers;
