import { Request, Response } from 'express';
import { Skill } from '../../models';
import { z } from 'zod';

const skillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['frontend', 'backend', 'database', 'devops', 'tools', 'soft']),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  icon: z.string().optional(),
  description: z.string().optional(),
  yearsOfExperience: z.number().optional(),
  isActive: z.boolean().optional(),
  order: z.number().optional(),
});

export const getSkills = async (_req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const data = skillSchema.parse(req.body);
    const skillData = {
      ...data,
      isActive: data.isActive ?? true,
      order: data.order ?? 0,
    };
    const skill = await Skill.create(skillData);
    res.status(201).json(skill);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const data = skillSchema.partial().parse(req.body);
    const skillData = {
      ...data,
      ...(data.isActive !== undefined && { isActive: data.isActive ?? true }),
      ...(data.order !== undefined && { order: data.order ?? 0 }),
    };
    const skill = await Skill.findByIdAndUpdate(req.params.id, skillData, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err: any) {
    res.status(400).json({ message: err.errors?.[0]?.message || err.message });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const reorderSkills = async (req: Request, res: Response) => {
  try {
    const { order } = req.body; // [{ id, order }, ...]
    if (!Array.isArray(order)) return res.status(400).json({ message: 'Invalid order array' });
    for (const item of order) {
      await Skill.findByIdAndUpdate(item.id, { order: item.order });
    }
    res.json({ message: 'Skills reordered' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 