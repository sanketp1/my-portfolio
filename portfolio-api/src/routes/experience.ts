import express from 'express';
import { getExperience } from '../controllers/experienceController';

const router = express.Router();

/**
 * @swagger
 * /api/experience:
 *   get:
 *     summary: Get all active work experience
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: Work experience retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   company:
 *                     type: string
 *                   position:
 *                     type: string
 *                   location:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date
 *                   endDate:
 *                     type: string
 *                     format: date
 *                   isCurrentJob:
 *                     type: boolean
 *                   description:
 *                     type: string
 *                   responsibilities:
 *                     type: array
 *                     items:
 *                       type: string
 *                   achievements:
 *                     type: array
 *                     items:
 *                       type: string
 *                   technologies:
 *                     type: array
 *                     items:
 *                       type: string
 *                   companyLogo:
 *                     type: string
 *                   companyUrl:
 *                     type: string
 *                   order:
 *                     type: number
 */
router.get('/', getExperience);

export default router; 