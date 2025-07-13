import express from 'express';
import { 
  getShowcase, 
  createShowcase, 
  updateShowcase, 
  deleteShowcase,
  uploadMedia,
  uploadThumbnail 
} from '../../controllers/admin/showcaseController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/upload';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/showcase:
 *   get:
 *     summary: Get all showcase items (admin)
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Showcase items retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getShowcase);

/**
 * @swagger
 * /api/admin/showcase:
 *   post:
 *     summary: Create new showcase item
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - mediaUrl
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *               description:
 *                 type: string
 *                 minLength: 1
 *               type:
 *                 type: string
 *                 enum: [image, video, demo, certificate]
 *               mediaUrl:
 *                 type: string
 *                 minLength: 1
 *               category:
 *                 type: string
 *                 minLength: 1
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags (e.g., "Web Development,React,JavaScript")
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Showcase thumbnail image (optional)
 *               order:
 *                 type: string
 *                 description: Display order (will be converted to number)
 *               isActive:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *     responses:
 *       201:
 *         description: Showcase item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 mediaUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                   description: Cloudinary URL of uploaded thumbnail
 *                 category:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isActive:
 *                   type: boolean
 *                 order:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  upload.fields([
    { name: 'mediaUrl', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  createShowcase
);

/**
 * @swagger
 * /api/admin/showcase/{id}:
 *   put:
 *     summary: Update showcase item
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showcase item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [image, video, demo, certificate]
 *               mediaUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags (e.g., "Web Development,React,JavaScript")
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Showcase thumbnail image (optional)
 *               order:
 *                 type: string
 *                 description: Display order (will be converted to number)
 *               isActive:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *     responses:
 *       200:
 *         description: Showcase item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 mediaUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                   description: Cloudinary URL of uploaded thumbnail
 *                 category:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 isActive:
 *                   type: boolean
 *                 order:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Showcase item not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', upload.single('thumbnail'), updateShowcase);

/**
 * @swagger
 * /api/admin/showcase/{id}:
 *   delete:
 *     summary: Delete showcase item
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showcase item ID
 *     responses:
 *       200:
 *         description: Showcase item deleted successfully
 *       404:
 *         description: Showcase item not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteShowcase);

/**
 * @swagger
 * /api/admin/showcase/{id}/thumbnail:
 *   post:
 *     summary: Upload showcase thumbnail for specific item
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showcase item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - thumbnail
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Showcase thumbnail image
 *     responses:
 *       200:
 *         description: Thumbnail uploaded and showcase item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                 showcase:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     thumbnailUrl:
 *                       type: string
 *       400:
 *         description: Invalid file or no file provided
 *       404:
 *         description: Showcase item not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/thumbnail', upload.single('thumbnail'), uploadThumbnail);

/**
 * @swagger
 * /api/admin/showcase/{id}/upload:
 *   post:
 *     summary: Upload showcase media for specific item
 *     tags: [Admin - Showcase]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Showcase item ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - media
 *             properties:
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: Showcase media file (image, video, etc.)
 *     responses:
 *       200:
 *         description: Media uploaded and showcase item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 mediaUrl:
 *                   type: string
 *                 showcase:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     mediaUrl:
 *                       type: string
 *       400:
 *         description: Invalid file or no file provided
 *       404:
 *         description: Showcase item not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/upload', upload.single('media'), uploadMedia);

export default router; 