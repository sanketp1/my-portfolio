import express from 'express';
import { getBlogs, getBlogBySlug } from '../controllers/blogsController';

const router = express.Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all published blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
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
 *                   slug:
 *                     type: string
 *                   excerpt:
 *                     type: string
 *                   featuredImage:
 *                     type: string
 *                   redirectUrl:
 *                     type: string
 *                     description: URL to redirect to external blog platform
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *                   category:
 *                     type: string
 *                   readingTime:
 *                     type: number
 *                   isFeatured:
 *                     type: boolean
 *                   views:
 *                     type: number
 *                   likes:
 *                     type: number
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getBlogs);

/**
 * @swagger
 * /api/blogs/{slug}:
 *   get:
 *     summary: Get blog by slug
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog slug
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 excerpt:
 *                   type: string
 *                 content:
 *                   type: string
 *                 featuredImage:
 *                   type: string
 *                 redirectUrl:
 *                   type: string
 *                   description: URL to redirect to external blog platform
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 category:
 *                   type: string
 *                 readingTime:
 *                   type: number
 *                 views:
 *                   type: number
 *                 likes:
 *                   type: number
 *                 publishedAt:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Blog not found
 */
router.get('/:slug', getBlogBySlug);

export default router; 