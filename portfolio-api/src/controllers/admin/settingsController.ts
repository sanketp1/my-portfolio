import { Request, Response } from 'express';
import { Settings } from '../../models';
import { z } from 'zod';

const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().optional(),
  siteUrl: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  googleAnalytics: z.string().optional(),
  socialLinks: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
  }).optional(),
  contactEmail: z.string().email().optional(),
  maintenanceMode: z.boolean().optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
});

export const getSettings = async (_req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const data = settingsSchema.partial().parse(req.body);
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(data);
    } else {
      Object.assign(settings, data);
      await settings.save();
    }
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
}; 