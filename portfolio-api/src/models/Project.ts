import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  isFeatured: boolean;
  isActive: boolean;
  order: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    images: [String],
    technologies: [String],
    features: [String],
    liveUrl: String,
    githubUrl: String,
    thumbnailUrl: String,
    category: { type: String, enum: ['web', 'mobile', 'desktop', 'api', 'other'], required: true },
    status: { type: String, enum: ['completed', 'in-progress', 'planned'], required: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema); 