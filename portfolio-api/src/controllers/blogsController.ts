import { Request, Response } from 'express';
import { Blog } from '../models';

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .select('title slug excerpt content featuredImage redirectUrl tags category readingTime views likes publishedAt createdAt')
      .sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true })
      .select('title slug excerpt content featuredImage redirectUrl tags category readingTime views likes publishedAt createdAt updatedAt');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 