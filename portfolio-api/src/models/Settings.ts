import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  seoKeywords: string[];
  googleAnalytics?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  contactEmail: string;
  maintenanceMode: boolean;
  theme: 'light' | 'dark' | 'system';
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, required: true },
    siteDescription: String,
    siteUrl: String,
    seoKeywords: [String],
    googleAnalytics: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    },
    contactEmail: String,
    maintenanceMode: { type: Boolean, default: false },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', SettingsSchema); 