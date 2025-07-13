import { Request, Response } from 'express';
import { Profile } from '../models';

export const getProfile = async (_req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const downloadResume = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    if (!profile || !profile.personalInfo.resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const resumeUrl = profile.personalInfo.resume;
    const fileName = profile.personalInfo.resumeFileName || 'resume.pdf';
    const fileType = profile.personalInfo.resumeFileType || 'application/pdf';

    // Set proper headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', fileType);
    res.setHeader('Cache-Control', 'no-cache');

    // Redirect to Cloudinary URL for download
    res.redirect(resumeUrl);
  } catch (error: any) {
    console.error('Download resume failed');
    res.status(500).json({ message: 'Failed to download resume' });
  }
}; 