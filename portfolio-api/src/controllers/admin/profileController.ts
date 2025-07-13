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
    
    // Process personalInfo fields
    if (req.body['personalInfo[name]'] || req.body['personalInfo[title]'] || req.body['personalInfo[bio]'] || 
        req.body['personalInfo[location]'] || req.body['personalInfo[email]'] || req.body['personalInfo[phone]'] ||
        req.body['personalInfo[socialLinks][github]'] || req.body['personalInfo[socialLinks][linkedin]'] || 
        req.body['personalInfo[socialLinks][twitter]'] || req.body['personalInfo[socialLinks][website]']) {
      
      processedBody.personalInfo = {
        ...(req.body['personalInfo[name]'] && { name: req.body['personalInfo[name]'] }),
        ...(req.body['personalInfo[title]'] && { title: req.body['personalInfo[title]'] }),
        ...(req.body['personalInfo[bio]'] && { bio: req.body['personalInfo[bio]'] }),
        ...(req.body['personalInfo[location]'] && { location: req.body['personalInfo[location]'] }),
        ...(req.body['personalInfo[email]'] && { email: req.body['personalInfo[email]'] }),
        ...(req.body['personalInfo[phone]'] && { phone: req.body['personalInfo[phone]'] }),
      };

      // Process social links
      if (req.body['personalInfo[socialLinks][github]'] || req.body['personalInfo[socialLinks][linkedin]'] || 
          req.body['personalInfo[socialLinks][twitter]'] || req.body['personalInfo[socialLinks][website]']) {
        processedBody.personalInfo.socialLinks = {
          ...(req.body['personalInfo[socialLinks][github]'] && { github: req.body['personalInfo[socialLinks][github]'] }),
          ...(req.body['personalInfo[socialLinks][linkedin]'] && { linkedin: req.body['personalInfo[socialLinks][linkedin]'] }),
          ...(req.body['personalInfo[socialLinks][twitter]'] && { twitter: req.body['personalInfo[socialLinks][twitter]'] }),
          ...(req.body['personalInfo[socialLinks][website]'] && { website: req.body['personalInfo[socialLinks][website]'] }),
        };
      }
    }

    // Process hero fields
    if (req.body['hero[headline]'] || req.body['hero[subheadline]'] || req.body['hero[backgroundImage]'] || 
        req.body['hero[ctaText]'] || req.body['hero[ctaLink]']) {
      processedBody.hero = {
        ...(req.body['hero[headline]'] && { headline: req.body['hero[headline]'] }),
        ...(req.body['hero[subheadline]'] && { subheadline: req.body['hero[subheadline]'] }),
        ...(req.body['hero[backgroundImage]'] && { backgroundImage: req.body['hero[backgroundImage]'] }),
        ...(req.body['hero[ctaText]'] && { ctaText: req.body['hero[ctaText]'] }),
        ...(req.body['hero[ctaLink]'] && { ctaLink: req.body['hero[ctaLink]'] }),
      };
    }

    // Process about fields
    if (req.body['about[description]'] || req.body['about[images]'] || req.body['about[highlights]']) {
      processedBody.about = {
        ...(req.body['about[description]'] && { description: req.body['about[description]'] }),
        ...(req.body['about[images]'] && { images: req.body['about[images]'].split(',').map((img: string) => img.trim()) }),
        ...(req.body['about[highlights]'] && { highlights: req.body['about[highlights]'].split(',').map((highlight: string) => highlight.trim()) }),
      };
    }

    // Process boolean field
    if (req.body.isActive !== undefined) {
      processedBody.isActive = req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : undefined;
    }

    // If avatar was uploaded, add it to personalInfo
    if (avatarUrl) {
      if (!processedBody.personalInfo) {
        processedBody.personalInfo = {};
      }
      processedBody.personalInfo.avatar = avatarUrl;
    }

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