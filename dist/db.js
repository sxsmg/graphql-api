"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.db = void 0;
// db.ts
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/mydatabase' || process.env.MONGODB_URI;
mongoose_1.default.connect(MONGODB_URI);
const db = mongoose_1.default.connection;
exports.db = db;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
