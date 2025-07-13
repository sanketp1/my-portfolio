import express from 'express';
import authRoutes from './auth';
import profileRoutes from './profile';
import skillsRoutes from './skills';
import projectsRoutes from './projects';
import experienceRoutes from './experience';
import blogsRoutes from './blogs';
import showcaseRoutes from './showcase';
import contactRoutes from './contact';

import adminProfileRoutes from './admin/profile';
import adminSkillsRoutes from './admin/skills';
import adminProjectsRoutes from './admin/projects';
import adminExperienceRoutes from './admin/experience';
import adminBlogsRoutes from './admin/blogs';
import adminShowcaseRoutes from './admin/showcase';
import adminMessagesRoutes from './admin/messages';
import adminSettingsRoutes from './admin/settings';
import adminAnalyticsRoutes from './admin/analytics';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/skills', skillsRoutes);
router.use('/projects', projectsRoutes);
router.use('/experience', experienceRoutes);
router.use('/blogs', blogsRoutes);
router.use('/showcase', showcaseRoutes);
router.use('/contact', contactRoutes);

// Admin routes
router.use('/admin/profile', adminProfileRoutes);
router.use('/admin/skills', adminSkillsRoutes);
router.use('/admin/projects', adminProjectsRoutes);
router.use('/admin/experience', adminExperienceRoutes);
router.use('/admin/blogs', adminBlogsRoutes);
router.use('/admin/showcase', adminShowcaseRoutes);
router.use('/admin/messages', adminMessagesRoutes);
router.use('/admin/settings', adminSettingsRoutes);
router.use('/admin/analytics', adminAnalyticsRoutes);

export default router; 