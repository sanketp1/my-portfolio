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
    // Debug: Log the incoming request body
    // console.log('Received body:', req.body);
    // console.log('Request body keys:', Object.keys(req.body));
    // console.log('Content-Type:', req.headers['content-type']);
    
    // Check if it's FormData (bracket notation) or JSON (nested objects)
    const isFormData = req.headers['content-type']?.includes('multipart/form-data');
    // console.log('Is FormData:', isFormData);
    
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

    // Process the request body - handle both bracket notation and nested objects
    const processedBody: any = {};
    
    // Helper function to get value from either format
    const getValue = (bracketKey: string, nestedPath: string) => {
      // First check bracket notation
      if (req.body[bracketKey]) {
        console.log(`Found bracket notation: ${bracketKey} =`, req.body[bracketKey]);
        return req.body[bracketKey];
      }
      
      // Then check nested object format
      const pathParts = nestedPath.split('.');
      let value = req.body;
      for (const part of pathParts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          return undefined;
        }
      }
      if (value) {
        console.log(`Found nested object: ${nestedPath} =`, value);
      }
      return value;
    };
    
    // Handle personalInfo - check both formats
    const hasPersonalInfo = req.body.personalInfo || 
      req.body['personalInfo[name]'] || 
      req.body['personalInfo[title]'] || 
      req.body['personalInfo[bio]'] || 
      req.body['personalInfo[location]'] || 
      req.body['personalInfo[email]'] || 
      req.body['personalInfo[phone]'] ||
      req.body['personalInfo[socialLinks][github]'] ||
      req.body['personalInfo[socialLinks][linkedin]'] ||
      req.body['personalInfo[socialLinks][twitter]'] ||
      req.body['personalInfo[socialLinks][website]'];
    
    console.log('Has personalInfo:', hasPersonalInfo);
    
    if (hasPersonalInfo) {
      processedBody.personalInfo = {
        ...(getValue('personalInfo[name]', 'personalInfo.name') && { name: getValue('personalInfo[name]', 'personalInfo.name') }),
        ...(getValue('personalInfo[title]', 'personalInfo.title') && { title: getValue('personalInfo[title]', 'personalInfo.title') }),
        ...(getValue('personalInfo[bio]', 'personalInfo.bio') && { bio: getValue('personalInfo[bio]', 'personalInfo.bio') }),
        ...(getValue('personalInfo[location]', 'personalInfo.location') && { location: getValue('personalInfo[location]', 'personalInfo.location') }),
        ...(getValue('personalInfo[email]', 'personalInfo.email') && { email: getValue('personalInfo[email]', 'personalInfo.email') }),
        ...(getValue('personalInfo[phone]', 'personalInfo.phone') && { phone: getValue('personalInfo[phone]', 'personalInfo.phone') }),
      };
      
      // Handle social links - check both formats
      const hasSocialLinks = req.body.personalInfo?.socialLinks || 
        req.body['personalInfo[socialLinks][github]'] ||
        req.body['personalInfo[socialLinks][linkedin]'] ||
        req.body['personalInfo[socialLinks][twitter]'] ||
        req.body['personalInfo[socialLinks][website]'];
      
      if (hasSocialLinks) {
        processedBody.personalInfo.socialLinks = {
          ...(getValue('personalInfo[socialLinks][github]', 'personalInfo.socialLinks.github') && { github: getValue('personalInfo[socialLinks][github]', 'personalInfo.socialLinks.github') }),
          ...(getValue('personalInfo[socialLinks][linkedin]', 'personalInfo.socialLinks.linkedin') && { linkedin: getValue('personalInfo[socialLinks][linkedin]', 'personalInfo.socialLinks.linkedin') }),
          ...(getValue('personalInfo[socialLinks][twitter]', 'personalInfo.socialLinks.twitter') && { twitter: getValue('personalInfo[socialLinks][twitter]', 'personalInfo.socialLinks.twitter') }),
          ...(getValue('personalInfo[socialLinks][website]', 'personalInfo.socialLinks.website') && { website: getValue('personalInfo[socialLinks][website]', 'personalInfo.socialLinks.website') }),
        };
      }
    }

    // Handle hero - check both formats
    const hasHero = req.body.hero || 
      req.body['hero[headline]'] || 
      req.body['hero[subheadline]'] || 
      req.body['hero[backgroundImage]'] || 
      req.body['hero[ctaText]'] || 
      req.body['hero[ctaLink]'];
    
    console.log('Has hero:', hasHero);
    
    if (hasHero) {
      processedBody.hero = {
        ...(getValue('hero[headline]', 'hero.headline') && { headline: getValue('hero[headline]', 'hero.headline') }),
        ...(getValue('hero[subheadline]', 'hero.subheadline') && { subheadline: getValue('hero[subheadline]', 'hero.subheadline') }),
        ...(getValue('hero[backgroundImage]', 'hero.backgroundImage') && { backgroundImage: getValue('hero[backgroundImage]', 'hero.backgroundImage') }),
        ...(getValue('hero[ctaText]', 'hero.ctaText') && { ctaText: getValue('hero[ctaText]', 'hero.ctaText') }),
        ...(getValue('hero[ctaLink]', 'hero.ctaLink') && { ctaLink: getValue('hero[ctaLink]', 'hero.ctaLink') }),
      };
    }

    // Handle about - check both formats
    const hasAbout = req.body.about || 
      req.body['about[description]'] || 
      req.body['about[images]'] || 
      req.body['about[highlights]'];
    
    console.log('Has about:', hasAbout);
    
    if (hasAbout) {
      processedBody.about = {
        ...(getValue('about[description]', 'about.description') && { description: getValue('about[description]', 'about.description') }),
        ...(getValue('about[images]', 'about.images') && { images: getValue('about[images]', 'about.images').split(',').map((img: string) => img.trim()) }),
        ...(getValue('about[highlights]', 'about.highlights') && { highlights: getValue('about[highlights]', 'about.highlights').split(',').map((highlight: string) => highlight.trim()) }),
      };
    }

    // Handle boolean field
    if (req.body.isActive !== undefined) {
      processedBody.isActive = req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : req.body.isActive;
    }

    // If avatar was uploaded, add it to personalInfo
    if (avatarUrl) {
      if (!processedBody.personalInfo) {
        processedBody.personalInfo = {};
      }
      processedBody.personalInfo.avatar = avatarUrl;
    }

    // Debug: Log the processed update object
    console.log('Processed body for update:', processedBody);

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