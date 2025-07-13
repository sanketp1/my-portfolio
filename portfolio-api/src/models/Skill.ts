import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'soft';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  icon?: string;
  description?: string;
  yearsOfExperience?: number;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft'], required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'], required: true },
    icon: String,
    description: String,
    yearsOfExperience: Number,
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', SkillSchema); 