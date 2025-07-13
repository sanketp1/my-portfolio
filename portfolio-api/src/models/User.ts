import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
  profile: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profile: {
      name: { type: String, required: true },
      avatar: String,
      bio: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema); 