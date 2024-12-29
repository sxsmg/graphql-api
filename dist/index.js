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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const socket_io_1 = require("socket.io");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const db_1 = require("./db");
const authMiddleware_1 = require("./authMiddleware");
const signMiddleware_1 = require("./signMiddleware");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer);
exports.io = io;
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
console.log('SecretKey', secretKey);
io.use((socket, next) => {
    (0, signMiddleware_1.signMiddleware)(socket, secretKey, next);
});
io.use((socket, next) => {
    try {
        (0, authMiddleware_1.authenticateToken)(socket, secretKey);
        next();
    }
    catch (error) {
        socket.disconnect();
    }
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
const server = new server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    plugins: [
        {
            requestDidStart(_a) {
                return __awaiter(this, arguments, void 0, function* ({ contextValue }) {
                    // Access the contextValue
                    console.log(contextValue === null || contextValue === void 0 ? void 0 : contextValue.authScope);
                });
            },
        },
    ],
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db;
        yield server.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const authScope = yield getScope(req.headers.authorization);
                return { authScope };
            }),
        }));
        const PORT = process.env.PORT || 4000;
        httpServer.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    });
}
function getScope(authorizationHeader) {
    return __awaiter(this, void 0, void 0, function* () {
        return authorizationHeader ? 'ADMIN' : undefined;
    });
}
startServer().catch((error) => {
    console.error('Error starting the server:', error);
});
