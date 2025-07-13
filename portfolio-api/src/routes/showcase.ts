import express from 'express';
import { getShowcase } from '../controllers/showcaseController';

const router = express.Router();

/**
 * @swagger
 * /api/showcase:
 *   get:
 *     summary: Get all active showcase items
 *     tags: [Showcase]
 *     responses:
 *       200:
 *         description: Showcase items retrieved successfully
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
 *                   description:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [image, video, demo, certificate]
 *                   mediaUrl:
 *                     type: string
 *                   thumbnailUrl:
 *                     type: string
 *                   category:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   order:
 *                     type: number
 */
router.get('/', getShowcase);

export default router; 