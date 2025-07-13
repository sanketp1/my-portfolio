import express from 'express';
import { sendMessage } from '../controllers/contactController';

const router = express.Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *                 minLength: 1
 *               message:
 *                 type: string
 *                 minLength: 1
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/', sendMessage);

export default router; 