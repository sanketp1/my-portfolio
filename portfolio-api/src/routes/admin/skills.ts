import express from 'express';
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill,
  reorderSkills 
} from '../../controllers/admin/skillsController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/skills:
 *   get:
 *     summary: Get all skills (admin)
 *     tags: [Admin - Skills]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', getSkills);

/**
 * @swagger
 * /api/admin/skills:
 *   post:
 *     summary: Create new skill
 *     tags: [Admin - Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - level
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, database, devops, tools, soft]
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced, expert]
 *               icon:
 *                 type: string
 *               description:
 *                 type: string
 *               yearsOfExperience:
 *                 type: number
 *               order:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Skill created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/', createSkill);

/**
 * @swagger
 * /api/admin/skills/{id}:
 *   put:
 *     summary: Update skill
 *     tags: [Admin - Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [frontend, backend, database, devops, tools, soft]
 *               level:
 *                 type: string
 *                 enum: [beginner, intermediate, advanced, expert]
 *               icon:
 *                 type: string
 *               description:
 *                 type: string
 *               yearsOfExperience:
 *                 type: number
 *               order:
 *                 type: number
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Skill not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.put('/:id', updateSkill);

/**
 * @swagger
 * /api/admin/skills/{id}:
 *   delete:
 *     summary: Delete skill
 *     tags: [Admin - Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *       404:
 *         description: Skill not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.delete('/:id', deleteSkill);

/**
 * @swagger
 * /api/admin/skills/reorder:
 *   post:
 *     summary: Reorder skills
 *     tags: [Admin - Skills]
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
 *         description: Skills reordered successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/reorder', reorderSkills);

export default router; 