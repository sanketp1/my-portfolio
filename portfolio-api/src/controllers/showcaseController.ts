import { Request, Response } from 'express';
import { Showcase } from '../models';

export const getShowcase = async (_req: Request, res: Response) => {
  try {
    const showcase = await Showcase.find({ isActive: true })
      .select('title description type mediaUrl thumbnailUrl category tags order createdAt')
      .sort({ order: 1 });
    res.json(showcase);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 