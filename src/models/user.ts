// models/user.ts

import mongoose, { Document, Schema } from 'mongoose';

// Define the User document interface
export interface UserDocument extends Document {
  name: string;
  email: string;
  // Add more fields as needed
}

// Define the User schema
const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add more fields as needed
});

// Create and export the User model
export const User = mongoose.model<UserDocument>('User', userSchema);
