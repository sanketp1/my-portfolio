import { Request, Response } from 'express';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import Profile from '../../models/Profile';

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  url: string;
  etag: string;
  version: number;
  signature: string;
  created_at: string;
  tags: string[];
  pages?: number;
  [key: string]: any;
}

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Get file extension from original filename
    const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
    const isPdf = fileExtension === 'pdf';
    
    // Alternative approach: Use cloudinary.uploader.upload directly for better PDF handling
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/resumes',
          resource_type: 'raw',
          // Preserve original filename with extension for proper file identification
          public_id: `resume_${Date.now()}.${fileExtension}`,
          // Add flags to improve compatibility and preserve file type
          flags: 'attachment',
          // Add format hint for better handling
          ...(isPdf && { format: 'pdf' }),
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed: No result returned'));
          resolve(result as CloudinaryUploadResult);
        }
      ).end(req.file!.buffer);
    });

    // Ensure result has secure_url property
    if (!result || !result.secure_url) {
      return res.status(500).json({ message: 'Failed to upload file to Cloudinary' });
    }

    // Create a download URL using Cloudinary's delivery URL with proper parameters
    const baseUrl = result.secure_url.split('/upload/')[0];
    const publicId = result.public_id;
    const downloadUrl = `${baseUrl}/upload/fl_attachment,fl_force_download/${publicId}`;

    // Update profile with new resume URL
    const profile = await Profile.findOneAndUpdate(
      {},
      { 
        'personalInfo.resume': result.secure_url,
        'personalInfo.resumeDownloadUrl': downloadUrl,
        'personalInfo.resumeFileName': req.file.originalname,
        'personalInfo.resumeFileType': req.file.mimetype
      },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Resume uploaded successfully',
      resumeUrl: result.secure_url,
      downloadUrl: downloadUrl,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      profile
    });
  } catch (error: any) {
    console.error('Resume upload failed');
    res.status(500).json({ message: 'Failed to upload resume' });
  }
};

export const downloadResume = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
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

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error: any) {
    console.error('Get profile failed');
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for avatar upload
    let avatarUrl: string | undefined;
    
    // If avatar file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/profile/avatars',
        resource_type: 'image',
      });
      avatarUrl = result.secure_url;
    }

    // Process form data to build nested objects
    const processedBody: any = {};
    
    // Always set all personalInfo fields, using empty string if not present
    processedBody.personalInfo = {
      name: req.body['personalInfo[name]'] || '',
      title: req.body['personalInfo[title]'] || '',
      bio: req.body['personalInfo[bio]'] || '',
      location: req.body['personalInfo[location]'] || '',
      email: req.body['personalInfo[email]'] || '',
      phone: req.body['personalInfo[phone]'] || '',
      avatar: undefined, // will be set below if avatarUrl exists
      socialLinks: {
        github: req.body['personalInfo[socialLinks][github]'] || '',
        linkedin: req.body['personalInfo[socialLinks][linkedin]'] || '',
        twitter: req.body['personalInfo[socialLinks][twitter]'] || '',
        website: req.body['personalInfo[socialLinks][website]'] || '',
      }
    };

    // If avatar was uploaded, add it to personalInfo
    if (avatarUrl) {
      processedBody.personalInfo.avatar = avatarUrl;
    } else {
      // If not uploading new avatar, keep previous value by not setting avatar
      delete processedBody.personalInfo.avatar;
    }

    // Always set all hero fields
    processedBody.hero = {
      headline: req.body['hero[headline]'] || '',
      subheadline: req.body['hero[subheadline]'] || '',
      backgroundImage: req.body['hero[backgroundImage]'] || '',
      ctaText: req.body['hero[ctaText]'] || '',
      ctaLink: req.body['hero[ctaLink]'] || '',
    };

    // Always set all about fields
    processedBody.about = {
      description: req.body['about[description]'] || '',
      images: req.body['about[images]'] ? req.body['about[images]'].split(',').map((img: string) => img.trim()) : [],
      highlights: req.body['about[highlights]'] ? req.body['about[highlights]'].split(',').map((highlight: string) => highlight.trim()) : [],
    };

    // Always set isActive (default to true if not provided)
    processedBody.isActive = req.body.isActive === 'false' ? false : true;

    const profile = await Profile.findOneAndUpdate({}, processedBody, {
      new: true,
      upsert: true,
    });
    
    res.json(profile);
  } catch (error: any) {
    console.error('Update profile failed');
    res.status(500).json({ message: 'Failed to update profile' });
  }
}; 