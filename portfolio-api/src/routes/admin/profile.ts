import express from 'express';
import { 
  getProfile, 
  updateProfile, 
  uploadResume,
  downloadResume
} from '../../controllers/admin/profileController';
import { authMiddleware, adminMiddleware } from '../../middleware/authMiddleware';
import { documentUpload, upload } from '../../middleware/upload';

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get profile
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', getProfile);

/**
 * @swagger
 * /api/admin/profile:
 *   put:
 *     summary: Update profile
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Profile avatar image (optional)
 *               personalInfo[name]:
 *                 type: string
 *                 description: Full name
 *               personalInfo[title]:
 *                 type: string
 *                 description: Professional title
 *               personalInfo[bio]:
 *                 type: string
 *                 description: Short biography
 *               personalInfo[location]:
 *                 type: string
 *                 description: Current location
 *               personalInfo[email]:
 *                 type: string
 *                 format: email
 *                 description: Contact email
 *               personalInfo[phone]:
 *                 type: string
 *                 description: Contact phone number
 *               personalInfo[socialLinks][github]:
 *                 type: string
 *                 description: GitHub profile URL
 *               personalInfo[socialLinks][linkedin]:
 *                 type: string
 *                 description: LinkedIn profile URL
 *               personalInfo[socialLinks][twitter]:
 *                 type: string
 *                 description: Twitter profile URL
 *               personalInfo[socialLinks][website]:
 *                 type: string
 *                 description: Personal website URL
 *               hero[headline]:
 *                 type: string
 *                 description: Main headline for hero section
 *               hero[subheadline]:
 *                 type: string
 *                 description: Sub-headline for hero section
 *               hero[backgroundImage]:
 *                 type: string
 *                 description: Background image URL for hero section
 *               hero[ctaText]:
 *                 type: string
 *                 description: Call-to-action button text
 *               hero[ctaLink]:
 *                 type: string
 *                 description: Call-to-action button link
 *               about[description]:
 *                 type: string
 *                 description: Detailed about section description
 *               about[images]:
 *                 type: string
 *                 description: Comma-separated list of image URLs for about section
 *               about[highlights]:
 *                 type: string
 *                 description: Comma-separated list of highlight points for about section
 *               isActive:
 *                 type: string
 *                 description: true or false (will be converted to boolean)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 personalInfo:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     title:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                       description: Cloudinary URL of uploaded avatar
 *                     resume:
 *                       type: string
 *                     resumeDownloadUrl:
 *                       type: string
 *                     resumeFileName:
 *                       type: string
 *                     resumeFileType:
 *                       type: string
 *                     location:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     socialLinks:
 *                       type: object
 *                       properties:
 *                         github:
 *                           type: string
 *                         linkedin:
 *                           type: string
 *                         twitter:
 *                           type: string
 *                         website:
 *                           type: string
 *                 hero:
 *                   type: object
 *                   properties:
 *                     headline:
 *                       type: string
 *                     subheadline:
 *                       type: string
 *                     backgroundImage:
 *                       type: string
 *                     ctaText:
 *                       type: string
 *                     ctaLink:
 *                       type: string
 *                 about:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     highlights:
 *                       type: array
 *                       items:
 *                         type: string
 *                 isActive:
 *                   type: boolean
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
 *       403:
 *         description: Forbidden - Admin access required
 */
router.put('/', upload.single('avatar'), updateProfile);

/**
 * @swagger
 * /api/admin/profile/resume:
 *   post:
 *     summary: Upload profile resume
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: PDF, DOC, or DOCX file (max 10MB)
 *     responses:
 *       200:
 *         description: Resume uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 resumeUrl:
 *                   type: string
 *                   description: Direct Cloudinary URL for viewing
 *                 downloadUrl:
 *                   type: string
 *                   description: Download URL with proper file extension
 *                 fileName:
 *                   type: string
 *                   description: Original filename
 *                 fileType:
 *                   type: string
 *                   description: MIME type of the file
 *                 profile:
 *                   type: object
 *                   properties:
 *                     personalInfo:
 *                       type: object
 *                       properties:
 *                         resume:
 *                           type: string
 *                         resumeDownloadUrl:
 *                           type: string
 *                         resumeFileName:
 *                           type: string
 *                         resumeFileType:
 *                           type: string
 *       400:
 *         description: Invalid file or no file provided
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.post('/resume', documentUpload.single('resume'), uploadResume);

/**
 * @swagger
 * /api/admin/profile/resume/download:
 *   get:
 *     summary: Download profile resume
 *     tags: [Admin - Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resume file download
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/resume/download', downloadResume);

export default router; 