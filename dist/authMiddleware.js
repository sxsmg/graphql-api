"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
// src/authMiddleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(socket, // Use the custom interface here
secretKey) {
    const token = String(socket.handshake.query.token); // Cast token to string
    if (!token) {
        throw new Error('Authentication failed');
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, secretKey);
        // Attach the user to the socket for later use, if needed
        socket.user = user;
    }
    catch (err) {
        throw new Error('Authentication failed');
    }
}
