import { Request, Response } from 'express';
import User from '../../models/User';
import Project from '../../models/Project';
import Blog from '../../models/Blog';
import Message from '../../models/Message';
import Showcase from '../../models/Showcase';

export const getOverview = async (_req: Request, res: Response) => {
  try {
    // Get counts from database
    const [users, projects, blogs, messages] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments({ isActive: true }),
      Blog.countDocuments({ isPublished: true }),
      Message.countDocuments(),
    ]);

    // Calculate total views from blogs and projects
    const [blogViews, projectViews] = await Promise.all([
      Blog.aggregate([
        { $match: { isPublished: true } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
      ]),
      Project.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
      ])
    ]);

    const totalViews = (blogViews[0]?.totalViews || 0) + (projectViews[0]?.totalViews || 0);

    res.json({
      users,
      projects,
      blogs,
      views: totalViews,
      messages,
    });
  } catch (error: any) {
    console.error('Analytics overview failed');
    res.status(500).json({ message: 'Failed to fetch analytics overview' });
  }
};

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    // Get recent activity data
    const recentActivity = await Promise.all([
      // Recent projects
      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title createdAt'),
      
      // Recent blogs
      Blog.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title createdAt'),
      
      // Recent messages
      Message.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email createdAt'),
      
      // Recent showcase items
      Showcase.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title createdAt'),
    ]);

    const [recentProjects, recentBlogs, recentMessages, recentShowcase] = recentActivity;

    res.json({
      recentProjects,
      recentBlogs,
      recentMessages,
      recentShowcase,
    });
  } catch (error: any) {
    console.error('Recent activity analytics failed');
    res.status(500).json({ message: 'Failed to fetch recent activity' });
  }
};

export const getBlogViewsAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get blog views analytics
    const blogViews = await Blog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalViews: { $sum: "$views" },
          blogCount: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get top performing blogs
    const topBlogs = await Blog.find()
      .sort({ views: -1 })
      .limit(10)
      .select('title views createdAt');

    res.json({
      period,
      blogViews,
      topBlogs,
    });
  } catch (error: any) {
    console.error('Blog views analytics failed');
    res.status(500).json({ message: 'Failed to fetch blog views analytics' });
  }
};

export const getProjectViewsAnalytics = async (req: Request, res: Response) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get project views analytics
    const projectViews = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalViews: { $sum: "$views" },
          projectCount: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Get top performing projects
    const topProjects = await Project.find()
      .sort({ views: -1 })
      .limit(10)
      .select('title views createdAt');

    res.json({
      period,
      projectViews,
      topProjects,
    });
  } catch (error: any) {
    console.error('Project views analytics failed');
    res.status(500).json({ message: 'Failed to fetch project views analytics' });
  }
};