"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signMiddleware = signMiddleware;
// src/signMiddleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signMiddleware(socket, secretKey, next) {
    const token = socket.handshake.query.token;
    if (!token) {
        console.log("NOT TOKEN");
        // If the user doesn't have a token, generate and sign a new one
        const user = { id: socket.id }; // Customize this as needed
        const newToken = jsonwebtoken_1.default.sign(user, secretKey);
        console.log("NEW TOKEN", newToken);
        // Send the new token to the client
        socket.emit('newToken', newToken);
        // Attach the user to the socket for later use, if needed
        socket.user = user;
    }
    next();
}
