import { Request, Response } from 'express';
import { Blog } from '../../models';
import { z } from 'zod';
import { uploadToCloudinary } from '../../utils/cloudinary';

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  redirectUrl: z.string().optional(),
  tags: z.array(z.string()),
  category: z.string().min(1),
  readingTime: z.number(),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  views: z.number().optional(),
  likes: z.number().optional(),
  publishedAt: z.string().optional(),
});

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
      .select('title slug excerpt content featuredImage redirectUrl tags category readingTime isPublished isFeatured views likes publishedAt createdAt updatedAt')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let featuredImage: string | undefined;
    
    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/blogs/thumbnails',
        resource_type: 'image',
      });
      featuredImage = result.secure_url;
    }

    // Convert comma-separated strings to arrays, string booleans to actual booleans, and string numbers to actual numbers
    const processedBody = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',').map((tag: string) => tag.trim()) : [],
      readingTime: req.body.readingTime ? parseInt(req.body.readingTime, 10) : undefined,
      views: req.body.views ? parseInt(req.body.views, 10) : undefined,
      likes: req.body.likes ? parseInt(req.body.likes, 10) : undefined,
      isPublished: req.body.isPublished === 'true' ? true : req.body.isPublished === 'false' ? false : undefined,
      isFeatured: req.body.isFeatured === 'true' ? true : req.body.isFeatured === 'false' ? false : undefined,
    };

    const data = blogSchema.parse(processedBody);
    
    const blogData = {
      ...data,
      tags: data.tags ?? [],
      isPublished: data.isPublished ?? false,
      isFeatured: data.isFeatured ?? false,
      views: data.views ?? 0,
      likes: data.likes ?? 0,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      ...(featuredImage && { featuredImage }),
    };
    
    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    // Handle multipart form data for thumbnail upload
    let featuredImage: string | undefined;
    
    // If thumbnail file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: 'portfolio/blogs/thumbnails',
        resource_type: 'image',
      });
      featuredImage = result.secure_url;
    }

    // Convert comma-separated strings to arrays, string booleans to actual booleans, and string numbers to actual numbers
    const processedBody = {
      ...req.body,
      ...(req.body.tags && { tags: req.body.tags.split(',').map((tag: string) => tag.trim()) }),
      ...(req.body.readingTime && { readingTime: parseInt(req.body.readingTime, 10) }),
      ...(req.body.views && { views: parseInt(req.body.views, 10) }),
      ...(req.body.likes && { likes: parseInt(req.body.likes, 10) }),
      ...(req.body.isPublished !== undefined && { isPublished: req.body.isPublished === 'true' ? true : req.body.isPublished === 'false' ? false : undefined }),
      ...(req.body.isFeatured !== undefined && { isFeatured: req.body.isFeatured === 'true' ? true : req.body.isFeatured === 'false' ? false : undefined }),
    };

    const data = blogSchema.partial().parse(processedBody);
    
    const blogData = {
      ...data,
      ...(data.tags !== undefined && { tags: data.tags ?? [] }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished ?? false }),
      ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured ?? false }),
      ...(data.views !== undefined && { views: data.views ?? 0 }),
      ...(data.likes !== undefined && { likes: data.likes ?? 0 }),
      ...(data.publishedAt && { publishedAt: new Date(data.publishedAt) }),
      ...(featuredImage && { featuredImage }),
    };
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'portfolio/blogs/images',
      resource_type: 'image',
    });
    res.json({ url: result.secure_url });
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
      folder: 'portfolio/blogs/thumbnails',
      resource_type: 'image',
    });

    res.json({ 
      message: 'Thumbnail uploaded successfully',
      featuredImage: result.secure_url 
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const publishBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { isPublished: true, publishedAt: new Date() }, { new: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 