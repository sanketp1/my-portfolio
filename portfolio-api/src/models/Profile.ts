import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProfile extends Document {
  userId: Types.ObjectId;
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    resume: string;
    resumeDownloadUrl?: string;
    resumeFileName?: string;
    resumeFileType?: string;
    location: string;
    email: string;
    phone: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage?: string;
    ctaText: string;
    ctaLink: string;
  };
  about: {
    description: string;
    images: string[];
    highlights: string[];
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
      name: String,
      title: String,
      bio: String,
      avatar: String,
      resume: String,
      resumeDownloadUrl: String,
      resumeFileName: String,
      resumeFileType: String,
      location: String,
      email: String,
      phone: String,
      socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        website: String,
      },
    },
    hero: {
      headline: String,
      subheadline: String,
      backgroundImage: String,
      ctaText: String,
      ctaLink: String,
    },
    about: {
      description: String,
      images: [String],
      highlights: [String],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>('Profile', ProfileSchema); 