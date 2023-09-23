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
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = 'mongodb://127.0.0.1:27017'; // Use IPv4 address
        const client = new mongodb_1.MongoClient(uri);
        try {
            yield client.connect();
            console.log('Database Connected Successfully.');
            return client.db('mydatabase'); // Replace with your database name
        }
        catch (error) {
            console.error('Error Connecting to the Database:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    });
}
exports.connectToDatabase = connectToDatabase;
