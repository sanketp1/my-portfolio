import { Request, Response } from 'express';
import { Showcase } from '../../models';
import { z } from 'zod';
import { uploadToCloudinary } from '../../utils/cloudinary';

const showcaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['image', 'video', 'demo', 'certificate']),
  mediaUrl: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const getShowcase = async (_req: Request, res: Response) => {
  try {
    const showcase = await Showcase.find()
      .select('title description type mediaUrl thumbnailUrl category tags isActive order createdAt updatedAt')
      .sort({ order: 1 });
    res.json(showcase);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createShowcase = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let thumbnailUrl: string | undefined;
    let mediaUrl: string | undefined;

    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file && req.file.fieldname === 'thumbnail') {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/showcase/thumbnails',
        resource_type: 'image',
      });
      thumbnailUrl = result.secure_url;
    }

    // Handle mediaUrl: if a file is uploaded (mediaUrl as file), upload to Cloudinary; if a string URL, use as is
    if (req.files && (req.files as any)['mediaUrl'] && (req.files as any)['mediaUrl'][0]) {
      const mediaFile = (req.files as any)['mediaUrl'][0];
      let resourceType: 'image' | 'video' | 'raw' = 'image';
      if (mediaFile.mimetype.startsWith('video/')) resourceType = 'video';
      if (mediaFile.mimetype === 'image/gif') resourceType = 'image'; // Cloudinary supports GIF as image
      // If you want to use 'raw' for GIFs, set resourceType = 'raw' here
      const result = await uploadToCloudinary(mediaFile.buffer, {
        folder: 'portfolio/showcase/media',
        resource_type: resourceType,
      });
      mediaUrl = result.secure_url;
    } else if (typeof req.body.mediaUrl === 'string' && isValidUrl(req.body.mediaUrl)) {
      mediaUrl = req.body.mediaUrl;
    }

    // Convert comma-separated strings to arrays, string booleans to actual booleans, and string numbers to actual numbers
    const processedBody = {
      ...req.body,
      mediaUrl: mediaUrl || req.body.mediaUrl,
      tags: req.body.tags ? req.body.tags.split(',').map((tag: string) => tag.trim()) : [],
      order: req.body.order ? parseInt(req.body.order, 10) : undefined,
      isActive: req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : undefined,
    };

    const data = showcaseSchema.parse(processedBody);
    const showcaseData = {
      ...data,
      tags: data.tags ?? [],
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
      ...(thumbnailUrl && { thumbnailUrl }),
    };
    const showcase = await Showcase.create(showcaseData);
    res.status(201).json(showcase);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const updateShowcase = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let thumbnailUrl: string | undefined;
    
    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/showcase/thumbnails',
        resource_type: 'image',
      });
      thumbnailUrl = result.secure_url;
    }

    // Convert comma-separated strings to arrays, string booleans to actual booleans, and string numbers to actual numbers
    const processedBody = {
      ...req.body,
      ...(req.body.tags && { tags: req.body.tags.split(',').map((tag: string) => tag.trim()) }),
      ...(req.body.order && { order: parseInt(req.body.order, 10) }),
      ...(req.body.isActive !== undefined && { isActive: req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : undefined }),
    };

    const data = showcaseSchema.partial().parse(processedBody);
    
    const showcaseData = {
      ...data,
      ...(data.tags !== undefined && { tags: data.tags ?? [] }),
      ...(data.isActive !== undefined && { isActive: data.isActive ?? true }),
      ...(data.order !== undefined && { order: data.order ?? 0 }),
      ...(thumbnailUrl && { thumbnailUrl }),
    };
    
    const showcase = await Showcase.findByIdAndUpdate(req.params.id, showcaseData, { new: true });
    if (!showcase) return res.status(404).json({ message: 'Showcase not found' });
    res.json(showcase);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteShowcase = async (req: Request, res: Response) => {
  try {
    const showcase = await Showcase.findByIdAndDelete(req.params.id);
    if (!showcase) return res.status(404).json({ message: 'Showcase not found' });
    res.json({ message: 'Showcase deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'portfolio/showcase/media',
      resource_type: 'image',
    });

    // Update the showcase item with the new media URL
    const showcase = await Showcase.findByIdAndUpdate(
      req.params.id,
      { mediaUrl: result.secure_url },
      { new: true }
    );

    if (!showcase) {
      return res.status(404).json({ message: 'Showcase item not found' });
    }

    res.json({ 
      message: 'Media uploaded and showcase item updated successfully',
      mediaUrl: result.secure_url,
      showcase
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadThumbnail = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No thumbnail file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'portfolio/showcase/thumbnails',
      resource_type: 'image',
    });

    // Update the showcase item with the new thumbnail URL
    const showcase = await Showcase.findByIdAndUpdate(
      req.params.id,
      { thumbnailUrl: result.secure_url },
      { new: true }
    );

    if (!showcase) {
      return res.status(404).json({ message: 'Showcase item not found' });
    }

    res.json({ 
      message: 'Thumbnail uploaded and showcase item updated successfully',
      thumbnailUrl: result.secure_url,
      showcase
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 