import { Request, Response } from 'express';
import { WorkExperience } from '../models';

export const getExperience = async (_req: Request, res: Response) => {
  try {
    const experience = await WorkExperience.find({ isActive: true }).sort({ order: 1 });
    res.json(experience);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 