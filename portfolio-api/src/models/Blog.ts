import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  redirectUrl?: string;
  tags: string[];
  category: string;
  readingTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  likes: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: String,
    redirectUrl: String,
    tags: [String],
    category: String,
    readingTime: Number,
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', BlogSchema); 