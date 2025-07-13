import { Request, Response } from 'express';
import { WorkExperience } from '../../models';
import { z } from 'zod';

const experienceSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  location: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  isCurrentJob: z.boolean(),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  companyLogo: z.string().optional(),
  companyUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const getExperience = async (_req: Request, res: Response) => {
  try {
    const experience = await WorkExperience.find().sort({ order: 1 });
    res.json(experience);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const data = experienceSchema.parse(req.body);
    // Convert startDate and endDate to Date
    const experienceData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };
    const experience = await WorkExperience.create(experienceData);
    res.status(201).json(experience);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const data = experienceSchema.partial().parse(req.body);
    // Convert startDate and endDate to Date if present
    const experienceData = {
      ...data,
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.endDate && { endDate: new Date(data.endDate) }),
    };
    const experience = await WorkExperience.findByIdAndUpdate(req.params.id, experienceData, { new: true });
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const experience = await WorkExperience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const reorderExperience = async (req: Request, res: Response) => {
  try {
    const { order } = req.body; // [{ id, order }, ...]
    if (!Array.isArray(order)) return res.status(400).json({ message: 'Invalid order array' });
    for (const item of order) {
      await WorkExperience.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ message: 'Experience reordered' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 