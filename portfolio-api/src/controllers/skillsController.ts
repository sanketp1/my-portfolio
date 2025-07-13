import { Request, Response } from 'express';
import { Skill } from '../models';

export const getSkills = async (_req: Request, res: Response) => {
  try {
    // Check if MongoDB is connected
    if (require('mongoose').connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database not connected. Please check your MongoDB connection.',
        error: 'DATABASE_CONNECTION_ERROR'
      });
    }

    const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
    res.json(skills);
  } catch (err: any) {
    console.error('Failed to fetch skills');
    res.status(500).json({ message: err.message });
  }
}; 