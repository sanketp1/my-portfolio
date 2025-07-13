import express from 'express';
import { 
  getOverview,
  getBlogViewsAnalytics,
  getProjectViewsAnalytics,
  getRecentActivity
} from '../../controllers/admin/analyticsController';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get overall analytics
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Time period for analytics
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: number
 *                 projects:
 *                   type: number
 *                 blogs:
 *                   type: number
 *                 views:
 *                   type: number
 *                 messages:
 *                   type: number
 *       401:
 *         description: Unauthorized
 */
router.get('/', getOverview);

/**
 * @swagger
 * /api/admin/analytics/blog-views:
 *   get:
 *     summary: Get blog view analytics
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Time period for analytics
 *     responses:
 *       200:
 *         description: Blog analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalViews:
 *                   type: number
 *                 topBlogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       views:
 *                         type: number
 *                       slug:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/blog-views', getBlogViewsAnalytics);

/**
 * @swagger
 * /api/admin/analytics/project-views:
 *   get:
 *     summary: Get project view analytics
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [day, week, month, year]
 *           default: month
 *         description: Time period for analytics
 *     responses:
 *       200:
 *         description: Project analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalViews:
 *                   type: number
 *                 topProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       views:
 *                         type: number
 *                       id:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/project-views', getProjectViewsAnalytics);

/**
 * @swagger
 * /api/admin/analytics/recent-activity:
 *   get:
 *     summary: Get recent activity
 *     tags: [Admin - Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recentBlogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                       views:
 *                         type: number
 *                       type:
 *                         type: string
 *                 recentProjects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       status:
 *                         type: string
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       views:
 *                         type: number
 *                       type:
 *                         type: string
 *                 recentMessages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       message:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       type:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/recent-activity', getRecentActivity);


export default router; 