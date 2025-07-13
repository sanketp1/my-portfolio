import express from 'express';
import { 
  getSettings, 
  updateSettings
} from '../../controllers/admin/settingsController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/settings:
 *   get:
 *     summary: Get site settings
 *     tags: [Admin - Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Settings retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getSettings);

/**
 * @swagger
 * /api/admin/settings:
 *   put:
 *     summary: Update site settings
 *     tags: [Admin - Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               siteName:
 *                 type: string
 *                 minLength: 1
 *               siteDescription:
 *                 type: string
 *               siteUrl:
 *                 type: string
 *               seoKeywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               googleAnalytics:
 *                 type: string
 *               socialLinks:
 *                 type: object
 *                 properties:
 *                   github:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *                   twitter:
 *                     type: string
 *                   instagram:
 *                     type: string
 *               contactEmail:
 *                 type: string
 *                 format: email
 *               maintenanceMode:
 *                 type: boolean
 *               theme:
 *                 type: string
 *                 enum: [light, dark, system]
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.put('/', updateSettings);

export default router; 