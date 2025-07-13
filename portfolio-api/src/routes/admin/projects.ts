import express from 'express';
import { 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  uploadImages,
  uploadThumbnail,
  reorderProjects,
  getProjectByIdAdmin
} from '../../controllers/admin/projectsController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/upload';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/projects:
 *   get:
 *     summary: Get all projects (admin)
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getProjects);

/**
 * @swagger
 * /api/admin/projects:
 *   post:
 *     summary: Create new project
 *     tags: [Admin - Projects]
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
 *               - shortDescription
 *               - description
 *               - category
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *               shortDescription:
 *                 type: string
 *                 minLength: 1
 *               description:
 *                 type: string
 *                 minLength: 1
 *               technologies:
 *                 type: string
 *                 description: Comma-separated list of technologies (e.g., "React,Node.js,MongoDB")
 *               features:
 *                 type: string
 *                 description: Comma-separated list of features (e.g., "Authentication,Real-time updates,Responsive design")
 *               images:
 *                 type: string
 *                 description: Comma-separated list of image URLs (optional)
 *               category:
 *                 type: string
 *                 enum: [web, mobile, desktop, api, other]
 *               status:
 *                 type: string
 *                 enum: [completed, in-progress, planned]
 *               liveUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Project thumbnail image (optional)
 *               isFeatured:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               isActive:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 description:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 technologies:
 *                   type: array
 *                   items:
 *                     type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 category:
 *                   type: string
 *                 status:
 *                   type: string
 *                 liveUrl:
 *                   type: string
 *                 githubUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                   description: Cloudinary URL of uploaded thumbnail
 *                 isFeatured:
 *                   type: boolean
 *                 isActive:
 *                   type: boolean
 *                 order:
 *                   type: number
 *                 views:
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
router.post('/', upload.single('thumbnail'), createProject);

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               technologies:
 *                 type: string
 *                 description: Comma-separated list of technologies (e.g., "React,Node.js,MongoDB")
 *               features:
 *                 type: string
 *                 description: Comma-separated list of features (e.g., "Authentication,Real-time updates,Responsive design")
 *               images:
 *                 type: string
 *                 description: Comma-separated list of image URLs (optional)
 *               category:
 *                 type: string
 *                 enum: [web, mobile, desktop, api, other]
 *               status:
 *                 type: string
 *                 enum: [completed, in-progress, planned]
 *               liveUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Project thumbnail image (optional)
 *               isFeatured:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               isActive:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 shortDescription:
 *                   type: string
 *                 description:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *                 technologies:
 *                   type: array
 *                   items:
 *                     type: string
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 category:
 *                   type: string
 *                 status:
 *                   type: string
 *                 liveUrl:
 *                   type: string
 *                 githubUrl:
 *                   type: string
 *                 thumbnailUrl:
 *                   type: string
 *                   description: Cloudinary URL of uploaded thumbnail
 *                 isFeatured:
 *                   type: boolean
 *                 isActive:
 *                   type: boolean
 *                 order:
 *                   type: number
 *                 views:
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
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', upload.single('thumbnail'), updateProject);

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteProject);

/**
 * @swagger
 * /api/admin/projects/thumbnail:
 *   post:
 *     summary: Upload project thumbnail
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Project thumbnail image
 *     responses:
 *       200:
 *         description: Thumbnail uploaded successfully
 *       400:
 *         description: Invalid file or no file provided
 *       401:
 *         description: Unauthorized
 */
router.post('/thumbnail', upload.single('thumbnail'), uploadThumbnail);

/**
 * @swagger
 * /api/admin/projects/{id}/images:
 *   post:
 *     summary: Upload project images
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid file or no file provided
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/images', upload.array('images', 10), uploadImages);

/**
 * @swagger
 * /api/admin/projects/reorder:
 *   post:
 *     summary: Reorder projects
 *     tags: [Admin - Projects]
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
 *         description: Projects reordered successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/reorder', reorderProjects);

/**
 * @swagger
 * /api/admin/projects/{id}:
 *   get:
 *     summary: Get a single project by ID (admin)
 *     tags: [Admin - Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *       404:
 *         description: Project not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', getProjectByIdAdmin);

export default router; 