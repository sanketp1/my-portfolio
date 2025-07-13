import express from 'express';
import { getProfile, downloadResume } from '../controllers/profileController';

const router = express.Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get public profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       404:
 *         description: Profile not found
 */
router.get('/', getProfile);

/**
 * @swagger
 * /api/profile/resume/download:
 *   get:
 *     summary: Download public resume
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: Resume file download
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Resume not found
 *       500:
 *         description: Server error
 */
router.get('/resume/download', downloadResume);

export default router; 