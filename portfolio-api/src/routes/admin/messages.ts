import express from 'express';
import { 
  getMessages, 
  deleteMessage,
  markAsRead,
  replyMessage 
} from '../../controllers/admin/messagesController';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/messages:
 *   get:
 *     summary: Get all messages (admin)
 *     tags: [Admin - Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of messages per page
 *       - in: query
 *         name: read
 *         schema:
 *           type: boolean
 *         description: Filter by read status
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getMessages);

/**
 * @swagger
 * /api/admin/messages/{id}:
 *   delete:
 *     summary: Delete message
 *     tags: [Admin - Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteMessage);

/**
 * @swagger
 * /api/admin/messages/{id}/read:
 *   post:
 *     summary: Mark message as read
 *     tags: [Admin - Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message marked as read
 *       404:
 *         description: Message not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/read', markAsRead);

/**
 * @swagger
 * /api/admin/messages/{id}/reply:
 *   post:
 *     summary: Reply to message
 *     tags: [Admin - Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reply
 *             properties:
 *               reply:
 *                 type: string
 *                 minLength: 1
 *                 description: Reply message content
 *     responses:
 *       200:
 *         description: Reply sent successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Message not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/reply', replyMessage);

export default router; 