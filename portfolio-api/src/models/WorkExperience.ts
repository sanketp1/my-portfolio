import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkExperience extends Document {
  company: string;
  position: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  isCurrentJob: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyLogo?: string;
  companyUrl?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    isCurrentJob: { type: Boolean, required: true, default: false },
    description: String,
    responsibilities: [String],
    achievements: [String],
    technologies: [String],
    companyLogo: String,
    companyUrl: String,
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkExperience>('WorkExperience', WorkExperienceSchema); 