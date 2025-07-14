import { Request, Response } from 'express';
import { Project } from '../models';
import mongoose from 'mongoose';

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
    console.log('--- getProjectById called ---');
    console.log('Request params:', req.params);
    const id = mongoose.Types.ObjectId.isValid(req.params.id) ? new mongoose.Types.ObjectId(req.params.id) : req.params.id;
    console.log('Parsed ID:', id);
    const project = await Project.findById(id)
      .select('title shortDescription description images technologies features liveUrl githubUrl thumbnailUrl category status isFeatured order views createdAt updatedAt isActive');
    console.log('Fetched project:', project);
    if (project) {
      console.log('project.isActive:', project.isActive);
    }
    if (!project || !project.isActive) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err: any) {
    console.error('Error in getProjectById:', err);
    res.status(500).json({ message: err.message });
  }
}; 