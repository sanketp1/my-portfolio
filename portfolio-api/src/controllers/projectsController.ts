import { Request, Response } from 'express';
import { Project } from '../models';

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find({ isActive: true })
      .select('title shortDescription description images technologies features liveUrl githubUrl thumbnailUrl category status isFeatured order views createdAt')
      .sort({ order: 1 });
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
      .select('title shortDescription description images technologies features liveUrl githubUrl thumbnailUrl category status isFeatured order views createdAt updatedAt');
    if (!project || !project.isActive) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}; 