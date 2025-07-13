import { Request, Response } from 'express';
import { Project } from '../../models';
import { z } from 'zod';
import { uploadToCloudinary } from '../../utils/cloudinary';

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  images: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  category: z.enum(['web', 'mobile', 'desktop', 'api', 'other']),
  status: z.enum(['completed', 'in-progress', 'planned']),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .select('title shortDescription description images technologies features liveUrl githubUrl thumbnailUrl category status isFeatured isActive order views createdAt updatedAt')
      .sort({ order: 1 });
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let thumbnailUrl: string | undefined;
    
    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/projects/thumbnails',
        resource_type: 'image',
      });
      thumbnailUrl = result.secure_url;
    }

    // Convert comma-separated strings to arrays and string booleans to actual booleans
    const processedBody = {
      ...req.body,
      technologies: req.body.technologies ? req.body.technologies.split(',').map((tech: string) => tech.trim()) : [],
      features: req.body.features ? req.body.features.split(',').map((feature: string) => feature.trim()) : [],
      images: req.body.images ? req.body.images.split(',').map((img: string) => img.trim()) : [],
      isFeatured: req.body.isFeatured === 'true' ? true : req.body.isFeatured === 'false' ? false : undefined,
      isActive: req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : undefined,
    };

    const data = projectSchema.parse(processedBody);

    // Default arrays and optional fields
    const projectData = {
      ...data,
      images: data.images ?? [],
      technologies: data.technologies ?? [],
      features: data.features ?? [],
      isFeatured: data.isFeatured ?? false,
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
      ...(thumbnailUrl && { thumbnailUrl }),
    };
    
    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let thumbnailUrl: string | undefined;
    
    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/projects/thumbnails',
        resource_type: 'image',
      });
      thumbnailUrl = result.secure_url;
    }

    // Convert comma-separated strings to arrays and string booleans to actual booleans
    const processedBody = {
      ...req.body,
      ...(req.body.technologies && { technologies: req.body.technologies.split(',').map((tech: string) => tech.trim()) }),
      ...(req.body.features && { features: req.body.features.split(',').map((feature: string) => feature.trim()) }),
      ...(req.body.images && { images: req.body.images.split(',').map((img: string) => img.trim()) }),
      ...(req.body.isFeatured !== undefined && { isFeatured: req.body.isFeatured === 'true' ? true : req.body.isFeatured === 'false' ? false : undefined }),
      ...(req.body.isActive !== undefined && { isActive: req.body.isActive === 'true' ? true : req.body.isActive === 'false' ? false : undefined }),
    };

    const data = projectSchema.partial().parse(processedBody);

    // Default arrays and optional fields if present
    const projectData = {
      ...data,
      ...(data.images !== undefined && { images: data.images ?? [] }),
      ...(data.technologies !== undefined && { technologies: data.technologies ?? [] }),
      ...(data.features !== undefined && { features: data.features ?? [] }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured ?? false }),
      ...(data.isActive !== undefined && { isActive: data.isActive ?? true }),
      ...(data.order !== undefined && { order: data.order ?? 0 }),
      ...(thumbnailUrl && { thumbnailUrl }),
    };
    
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImages = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    const urls = [];
    for (const file of req.files as Express.Multer.File[]) {
      const result = await uploadToCloudinary(file.buffer, {
        folder: 'portfolio/projects/images',
        resource_type: 'image',
      });
      urls.push(result.secure_url);
    }
    res.json({ urls });
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
      folder: 'portfolio/projects/thumbnails',
      resource_type: 'image',
    });

    res.json({ 
      message: 'Thumbnail uploaded successfully',
      thumbnailUrl: result.secure_url 
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const reorderProjects = async (req: Request, res: Response) => {
  try {
    const { order } = req.body; // [{ id, order }, ...]
    if (!Array.isArray(order)) return res.status(400).json({ message: 'Invalid order array' });
    for (const item of order) {
      await Project.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ message: 'Projects reordered' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectByIdAdmin = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .select('title shortDescription description images technologies features liveUrl githubUrl thumbnailUrl category status isFeatured isActive order views createdAt updatedAt');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 