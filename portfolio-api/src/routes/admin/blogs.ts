import express from 'express';
import { 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog,
  uploadImage,
  uploadThumbnail,
  publishBlog 
} from '../../controllers/admin/blogsController';
import { authMiddleware } from '../../middleware/authMiddleware';
import { upload } from '../../middleware/upload';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

/**
 * @swagger
 * /api/admin/blogs:
 *   get:
 *     summary: Get all blogs (admin)
 *     tags: [Admin - Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', getBlogs);

/**
 * @swagger
 * /api/admin/blogs:
 *   post:
 *     summary: Create new blog
 *     tags: [Admin - Blogs]
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
 *               - slug
 *               - excerpt
 *               - content
 *               - category
 *               - readingTime
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 1
 *               slug:
 *                 type: string
 *                 minLength: 1
 *               excerpt:
 *                 type: string
 *                 minLength: 1
 *               content:
 *                 type: string
 *                 minLength: 1
 *               redirectUrl:
 *                 type: string
 *                 description: URL to redirect to external blog platform (optional)
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags (e.g., "JavaScript,React,Web Development")
 *               category:
 *                 type: string
 *                 minLength: 1
 *               readingTime:
 *                 type: string
 *                 description: Reading time in minutes (will be converted to number)
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Blog thumbnail image (optional)
 *               isPublished:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               isFeatured:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               views:
 *                 type: string
 *                 description: Number of views (will be converted to number)
 *               likes:
 *                 type: string
 *                 description: Number of likes (will be converted to number)
 *               publishedAt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   description: Cloudinary URL of uploaded thumbnail
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
 *                 isPublished:
 *                   type: boolean
 *                 isFeatured:
 *                   type: boolean
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
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', upload.single('thumbnail'), createBlog);

/**
 * @swagger
 * /api/admin/blogs/{id}:
 *   put:
 *     summary: Update blog
 *     tags: [Admin - Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               content:
 *                 type: string
 *               redirectUrl:
 *                 type: string
 *                 description: URL to redirect to external blog platform (optional)
 *               tags:
 *                 type: string
 *                 description: Comma-separated list of tags (e.g., "JavaScript,React,Web Development")
 *               category:
 *                 type: string
 *               readingTime:
 *                 type: string
 *                 description: Reading time in minutes (will be converted to number)
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Blog thumbnail image (optional)
 *               isPublished:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               isFeatured:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *               views:
 *                 type: string
 *                 description: Number of views (will be converted to number)
 *               likes:
 *                 type: string
 *                 description: Number of likes (will be converted to number)
 *               publishedAt:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
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
 *                   description: Cloudinary URL of uploaded thumbnail
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
 *                 isPublished:
 *                   type: boolean
 *                 isFeatured:
 *                   type: boolean
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
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', upload.single('thumbnail'), updateBlog);

/**
 * @swagger
 * /api/admin/blogs/{id}:
 *   delete:
 *     summary: Delete blog
 *     tags: [Admin - Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', deleteBlog);

/**
 * @swagger
 * /api/admin/blogs/thumbnail:
 *   post:
 *     summary: Upload blog thumbnail
 *     tags: [Admin - Blogs]
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
 *                 description: Blog thumbnail image
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
 * /api/admin/blogs/{id}/image:
 *   post:
 *     summary: Upload blog image
 *     tags: [Admin - Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file or no file provided
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/image', upload.single('image'), uploadImage);

/**
 * @swagger
 * /api/admin/blogs/{id}/publish:
 *   post:
 *     summary: Publish blog
 *     tags: [Admin - Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog published successfully
 *       404:
 *         description: Blog not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/publish', publishBlog);

export default router; 