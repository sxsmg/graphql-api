// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/mydatabase'||process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

export { db, mongoose };
