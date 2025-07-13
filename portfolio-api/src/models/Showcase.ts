import mongoose, { Schema, Document } from 'mongoose';

export interface IShowcase extends Document {
  title: string;
  description: string;
  type: 'image' | 'video' | 'demo' | 'certificate';
  mediaUrl: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ShowcaseSchema = new Schema<IShowcase>(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['image', 'video', 'demo', 'certificate'], required: true },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: String,
    category: String,
    tags: [String],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IShowcase>('Showcase', ShowcaseSchema); 