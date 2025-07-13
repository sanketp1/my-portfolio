import express from 'express';
import { getProjects, getProjectById } from '../controllers/projectsController';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all active projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   shortDescription:
 *                     type: string
 *                   description:
 *                     type: string
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                   technologies:
 *                     type: array
 *                     items:
 *                       type: string
 *                   features:
 *                     type: array
 *                     items:
 *                       type: string
 *                   category:
 *                     type: string
 *                     enum: [web, mobile, desktop, api, other]
 *                   status:
 *                     type: string
 *                     enum: [completed, in-progress, planned]
 *                   liveUrl:
 *                     type: string
 *                   githubUrl:
 *                     type: string
 *                   thumbnailUrl:
 *                     type: string
 *                   isFeatured:
 *                     type: boolean
 *                   order:
 *                     type: number
 *                   views:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 description:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 technologies:
 *                   type: array
 *                   items:
 *                     type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 category:
 *                   type: string
 *                   enum: [web, mobile, desktop, api, other]
 *                 status:
 *                   type: string
 *                   enum: [completed, in-progress, planned]
 *                 liveUrl:
 *                   type: string
 *                 githubUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                 isFeatured:
 *                   type: boolean
 *                 order:
 *                   type: number
 *                 views:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Project not found
 */
router.get('/:id', getProjectById);

export default router; 