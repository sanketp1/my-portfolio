import { connectDB } from "./utils/db";
import User from "./models/User";
import Profile from "./models/Profile";
import Project from "./models/Project";
import Blog from "./models/Blog";
import Showcase from "./models/Showcase";
import WorkExperience from "./models/WorkExperience";
import Skill from "./models/Skill";
import Message from "./models/Message";
import bcrypt from 'bcrypt';

export async function seed() {
  await connectDB();

  // Clear collections
  await Promise.all([
    User.deleteMany({}),
    Profile.deleteMany({}),
    Project.deleteMany({}),
    Blog.deleteMany({}),
    Showcase.deleteMany({}),
    WorkExperience.deleteMany({}),
    Skill.deleteMany({}),
    Message.deleteMany({}),
  ]);

  // Create a user (admin) with properly hashed password
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await User.create({
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    profile: {
      name: "Sanket Dev",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Full Stack Developer passionate about building modern web apps."
    }
  });

  // Create profile
  await Profile.create({
    userId: user._id,
    personalInfo: {
      name: "Sanket Dev",
      title: "Full Stack Developer",
      bio: "I am a passionate developer with experience in React, Node.js, and cloud technologies. I love building beautiful, performant, and accessible web applications.",
      avatar: "https://fmzqhgyfpkifsbymzdoy.supabase.co/storage/v1/object/public/portfolio/profile/IMG_20250711_222928.jpg",
      resume: "https://example.com/resume.pdf",
      location: "Pune, India",
      email: "sanket@example.com",
      phone: "+91-9876543210",
      socialLinks: {
        github: "https://github.com/sanketdev",
        linkedin: "https://linkedin.com/in/sanketdev",
        twitter: "https://twitter.com/sanketdev",
        website: "https://sanket.dev"
      }
    },
    hero: {
      headline: "Hi, I'm Sanket 👋",
      subheadline: "I build modern, scalable web applications.",
      backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      ctaText: "View Projects",
      ctaLink: "/projects"
    },
    about: {
      description: "With 5+ years of experience, I specialize in building full-stack web apps using React, Next.js, Node.js, and MongoDB. I enjoy solving complex problems and delivering high-quality products.",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
      ],
      highlights: [
        "Built and launched 10+ production apps",
        "Open source contributor",
        "Speaker at tech conferences"
      ]
    },
    isActive: true
  });

  // Projects
  await Project.insertMany([
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js, Tailwind CSS, and MongoDB. Features blogs, projects, contact form, and admin dashboard.",
      shortDescription: "Modern portfolio with blogs, projects, and admin.",
      images: [
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
      features: ["Blog", "Projects", "Contact Form", "Admin Dashboard"],
      liveUrl: "https://portfolio.example.com",
      githubUrl: "https://github.com/sanketdev/portfolio",
      category: "web",
      status: "completed",
      isFeatured: true,
      isActive: true,
      order: 1,
      views: 450
    },
    {
      title: "E-commerce Platform",
      description: "A scalable e-commerce platform with product catalog, cart, checkout, and admin analytics. Built with MERN stack.",
      shortDescription: "Full-featured e-commerce platform.",
      images: [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
      ],
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      features: ["Product Catalog", "Cart", "Checkout", "Admin Analytics"],
      liveUrl: "https://shop.example.com",
      githubUrl: "https://github.com/sanketdev/ecommerce",
      category: "web",
      status: "completed",
      isFeatured: true,
      isActive: true,
      order: 2,
      views: 320
    },
    {
      title: "Real-time Chat App",
      description: "A real-time chat application with group chats, file sharing, and notifications. Built with Socket.io and React.",
      shortDescription: "Real-time chat with groups and file sharing.",
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
      ],
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      features: ["Group Chat", "File Sharing", "Notifications"],
      liveUrl: "https://chat.example.com",
      githubUrl: "https://github.com/sanketdev/chatapp",
      category: "web",
      status: "in-progress",
      isFeatured: false,
      isActive: true,
      order: 3,
      views: 180
    }
  ]);

  // Blogs
  await Blog.insertMany([
    {
      title: "How to Build a Portfolio with Next.js",
      slug: "build-portfolio-nextjs",
      excerpt: "Learn how to create a modern portfolio using Next.js, Tailwind CSS, and MongoDB.",
      content: "<p>Step-by-step guide to building a portfolio with Next.js...</p>",
      featuredImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      tags: ["Next.js", "Portfolio", "Guide"],
      category: "Web Development",
      readingTime: 8,
      isPublished: true,
      isFeatured: true,
      views: 120,
      likes: 15,
      publishedAt: new Date(),
    },
    {
      title: "Mastering MongoDB for Developers",
      slug: "mastering-mongodb",
      excerpt: "Tips and tricks for using MongoDB effectively in your projects.",
      content: "<p>MongoDB is a powerful NoSQL database...</p>",
      featuredImage: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      tags: ["MongoDB", "Database"],
      category: "Databases",
      readingTime: 6,
      isPublished: true,
      isFeatured: false,
      views: 80,
      likes: 8,
      publishedAt: new Date(),
    },
    {
      title: "Deploying Full Stack Apps to Vercel",
      slug: "deploy-fullstack-vercel",
      excerpt: "A guide to deploying your full stack apps to Vercel for free.",
      content: "<p>Vercel makes it easy to deploy full stack apps...</p>",
      featuredImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      tags: ["Vercel", "Deployment"],
      category: "DevOps",
      readingTime: 5,
      isPublished: true,
      isFeatured: false,
      views: 60,
      likes: 5,
      publishedAt: new Date(),
    }
  ]);

  // Showcase
  await Showcase.insertMany([
    {
      title: "Landing Page Design",
      description: "A beautiful landing page for a SaaS product.",
      type: "image",
      mediaUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
      thumbnailUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300",
      category: "Web Design",
      tags: ["Landing Page", "SaaS"],
      isActive: true,
      order: 1
    },
    {
      title: "Product Demo Video",
      description: "Demo video for a new product launch.",
      type: "video",
      mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=300",
      category: "Demo",
      tags: ["Video", "Demo"],
      isActive: true,
      order: 2
    },
    {
      title: "Live App Demo",
      description: "Interactive demo of a live web application.",
      type: "demo",
      mediaUrl: "https://portfolio.example.com/demo",
      category: "Web App",
      tags: ["Demo", "App"],
      isActive: true,
      order: 3
    },
    {
      title: "Certification",
      description: "Certified in Full Stack Web Development.",
      type: "certificate",
      mediaUrl: "https://example.com/certificate.pdf",
      category: "Certification",
      tags: ["Certificate", "Full Stack"],
      isActive: true,
      order: 4
    }
  ]);

  // Work Experience
  await WorkExperience.insertMany([
    {
      company: "Tech Solutions Ltd.",
      position: "Senior Software Engineer",
      location: "Pune, India",
      startDate: new Date("2019-01-01"),
      endDate: undefined,
      isCurrentJob: true,
      description: "Leading a team of developers to build scalable web applications.",
      responsibilities: [
        "Architect and develop core features",
        "Mentor junior developers",
        "Collaborate with product managers"
      ],
      achievements: [
        "Employee of the Year 2021",
        "Launched 3 major products"
      ],
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      companyLogo: "https://randomuser.me/api/portraits/men/32.jpg",
      companyUrl: "https://techsolutions.com",
      isActive: true,
      order: 1
    },
    {
      company: "Web Innovators",
      position: "Frontend Developer",
      location: "Remote",
      startDate: new Date("2017-06-01"),
      endDate: new Date("2018-12-31"),
      isCurrentJob: false,
      description: "Built modern, responsive UIs for client projects.",
      responsibilities: [
        "Develop UI components",
        "Optimize performance",
        "Work with designers"
      ],
      achievements: [
        "Best UI Award 2018"
      ],
      technologies: ["React", "Redux", "Sass"],
      companyLogo: "https://randomuser.me/api/portraits/men/33.jpg",
      companyUrl: "https://webinnovators.com",
      isActive: true,
      order: 2
    }
  ]);

  // Skills
  await Skill.insertMany([
    {
      name: "React",
      category: "frontend",
      level: "expert",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "Building modern, scalable UIs with React.",
      yearsOfExperience: 5,
      isActive: true,
      order: 1
    },
    {
      name: "Node.js",
      category: "backend",
      level: "advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "Developing robust backend services.",
      yearsOfExperience: 4,
      isActive: true,
      order: 2
    },
    {
      name: "MongoDB",
      category: "database",
      level: "advanced",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      description: "NoSQL database for modern apps.",
      yearsOfExperience: 4,
      isActive: true,
      order: 3
    },
    {
      name: "AWS",
      category: "devops",
      level: "intermediate",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
      description: "Cloud infrastructure and deployment.",
      yearsOfExperience: 3,
      isActive: true,
      order: 4
    },
    {
      name: "Figma",
      category: "tools",
      level: "intermediate",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      description: "UI/UX design and prototyping.",
      yearsOfExperience: 2,
      isActive: true,
      order: 5
    },
    {
      name: "Communication",
      category: "soft",
      level: "expert",
      description: "Excellent written and verbal communication skills.",
      yearsOfExperience: 6,
      isActive: true,
      order: 6
    }
  ]);

  // Messages (Contact form)
  await Message.insertMany([
    {
      name: "John Doe",
      email: "john@example.com",
      subject: "Collaboration Opportunity",
      message: "Hi, I love your portfolio! Would you be interested in collaborating on a project?",
      isRead: false,
      isReplied: false
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Job Offer",
      message: "We are impressed with your work and would like to offer you a position at our company.",
      isRead: false,
      isReplied: false
    }
  ]);

  console.log("✅ Database seeded with dummy data!");
  process.exit(0);
}


