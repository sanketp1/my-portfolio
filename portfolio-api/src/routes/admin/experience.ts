import express from 'express';
import { 
  getExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience,
  reorderExperience 
} from '../../controllers/admin/experienceController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/experience:
 *   get:
 *     summary: Get all work experience (admin)
 *     tags: [Admin - Experience]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Work experience retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getExperience);

/**
 * @swagger
 * /api/admin/experience:
 *   post:
 *     summary: Create new work experience
 *     tags: [Admin - Experience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *               - location
 *               - startDate
 *               - isCurrentJob
 *             properties:
 *               company:
 *                 type: string
 *                 minLength: 1
 *               position:
 *                 type: string
 *                 minLength: 1
 *               location:
 *                 type: string
 *                 minLength: 1
 *               startDate:
 *                 type: string
 *                 minLength: 1
 *               endDate:
 *                 type: string
 *               isCurrentJob:
 *                 type: boolean
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               companyLogo:
 *                 type: string
 *               companyUrl:
 *                 type: string
 *               order:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Work experience created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', createExperience);

/**
 * @swagger
 * /api/admin/experience/{id}:
 *   put:
 *     summary: Update work experience
 *     tags: [Admin - Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               location:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               isCurrentJob:
 *                 type: boolean
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               companyLogo:
 *                 type: string
 *               companyUrl:
 *                 type: string
 *               order:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Work experience updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Work experience not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', updateExperience);

/**
 * @swagger
 * /api/admin/experience/{id}:
 *   delete:
 *     summary: Delete work experience
 *     tags: [Admin - Experience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Work experience deleted successfully
 *       404:
 *         description: Work experience not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteExperience);

/**
 * @swagger
 * /api/admin/experience/reorder:
 *   post:
 *     summary: Reorder work experience
 *     tags: [Admin - Experience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order
 *             properties:
 *               order:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     order:
 *                       type: number
 *                 description: Array of objects with id and order
 *     responses:
 *       200:
 *         description: Work experience reordered successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/reorder', reorderExperience);

export default router; 