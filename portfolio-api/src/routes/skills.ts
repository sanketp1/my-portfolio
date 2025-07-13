import express from 'express';
import { getSkills } from '../controllers/skillsController';

const router = express.Router();

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all active skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                     enum: [frontend, backend, database, devops, tools, soft]
 *                   level:
 *                     type: string
 *                     enum: [beginner, intermediate, advanced, expert]
 *                   icon:
 *                     type: string
 *                   description:
 *                     type: string
 *                   yearsOfExperience:
 *                     type: number
 *                   order:
 *                     type: number
 */
router.get('/', getSkills);

export default router; 