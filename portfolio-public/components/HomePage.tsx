"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ExternalLink, Globe, Github, Linkedin, Twitter, MapPin, Briefcase, BookOpen, Layers, Award, Mail, Star, Code, Database, Settings, User, Wrench, Download, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { useRef, useState, useEffect } from "react"
import { format } from 'date-fns'
import apiClient from "@/lib/apiClient"

export function BlogCard({ blog }: { blog: any }) {
  const cardContent = (
    <>
      <div className="relative w-full aspect-[16/9] bg-blue-100">
        <Image
          src={blog.featuredImage || "/placeholder.jpg"}
          alt={blog.title}
          fill
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {blog.publishedAt ? (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Published</span>
        ) : (
          <span className="absolute top-2 right-2 bg-gray-400 text-white text-xs px-2 py-1 rounded">Draft</span>
        )}
        {blog.isFeatured && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow flex items-center gap-1">
            <Star className="w-3 h-3 mr-1" /> Featured
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col p-6 relative">
        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded capitalize">{blog.category}</span>
          <span className="text-xs text-gray-500">{blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM dd, yyyy') : ''}</span>
          <span className="text-xs text-gray-500">{blog.readingTime} min read</span>
        </div>
        <h2 className="text-xl font-bold text-blue-900 mb-1 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 mb-3 line-clamp-3">{blog.excerpt}</p>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags?.map((tag: string) => (
            <span key={tag} className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
          ))}
        </div>
        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1 text-xs text-gray-500"><Eye className="w-4 h-4" /> {blog.views}</span>
          <span className="flex items-center gap-1 text-xs text-gray-500"><Heart className="w-4 h-4" /> {blog.likes}</span>
        </div>
        {/* Expandable Content */}
        <details className="mb-2">
          <summary className="cursor-pointer text-sm text-blue-600 hover:underline">Read More</summary>
          <div className="mt-2">
            <p className="text-gray-700 mb-2 whitespace-pre-line">{blog.content}</p>
            {blog.redirectUrl && (
              <a href={blog.redirectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 underline text-xs mt-2" onClick={e => e.stopPropagation()}><ExternalLink className="w-4 h-4" /> External Link</a>
            )}
          </div>
        </details>
        {/* Actions and Timestamp Row */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs text-gray-300">{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</span>
          {blog.redirectUrl && (
            <a
              href={blog.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold shadow hover:bg-blue-200 transition-all duration-200 text-xs flex items-center gap-1"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" /> External Link
            </a>
          )}
        </div>
        {/* Only show 'Read More' button if not already wrapped in Link */}
        <div className="flex gap-2 mt-2">
          {!blog.slug && (
            <a
              href={`/blogs/${blog.slug}`}
              className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs flex items-center gap-1"
            >
              Read More
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );

  if (blog.slug) {
    return (
      <Link
        href={`/blogs/${blog.slug}`}
        className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-blue-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {cardContent}
      </Link>
    );
  }
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-blue-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {cardContent}
    </div>
  );
}

export default function HomePage() {
  // Section refs for scrolling
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const blogsRef = useRef<HTMLDivElement | null>(null)
  const skillsRef = useRef<HTMLDivElement | null>(null)
  const experienceRef = useRef<HTMLDivElement | null>(null)
  const showcaseRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const [skillCategory, setSkillCategory] = useState('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');
  const [showAllMobileSkills, setShowAllMobileSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // New: State for all data
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [showcase, setShowcase] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      apiClient.get('/api/profile'),
      apiClient.get('/api/projects'),
      apiClient.get('/api/blogs'),
      apiClient.get('/api/skills'),
      apiClient.get('/api/experience'),
      apiClient.get('/api/showcase'),
    ])
      .then(([profile, projects, blogs, skills, experience, showcase]) => {
        setProfile(profile);
        setProjects(projects as any[]);
        setBlogs(blogs as any[]);
        setSkills(skills as any[]);
        setExperience(experience as any[]);
        setShowcase(showcase as any[]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load data.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading portfolio...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">{error}</div>;
  }

  // Extract data from new profile structure
  const personalInfo = profile?.personalInfo || {}
  const hero = profile?.hero || {}
  const about = profile?.about || {}
  const socialLinks = personalInfo?.socialLinks || {}

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Add ProjectCard component for homepage
  function ProjectCard({ project }: { project: any }) {
    return (
      <Link href={`/projects/${project._id}`} className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100">
        <div className="relative w-full aspect-[16/9] bg-gray-100">
          <Image
            src={project.thumbnailUrl || project.images?.[0] || "/placeholder.jpg"}
            alt={project.title}
            fill
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {project.isFeatured && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">Featured</span>
          )}
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{project.status}</span>
        </div>
        <div className="flex-1 flex flex-col p-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-purple-700 line-clamp-2 flex-1">{project.title}</h2>
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded capitalize">{project.category}</span>
          </div>
          <p className="text-gray-600 mb-3 line-clamp-3">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.map((tech: string) => (
              <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-gray-500">Views: {project.views}</span>
            <span className="text-xs text-gray-500">Created: {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
          <details className="mb-2">
            <summary className="cursor-pointer text-sm text-blue-600 hover:underline">Full Description & Features</summary>
            <div className="mt-2">
              <p className="text-gray-700 mb-2 whitespace-pre-line">{project.description}</p>
              {project.features && project.features.length > 0 && (
                <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1 mb-2">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
              {project.images && project.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.images.map((img: string, idx: number) => (
                    <Image key={idx} src={img} alt={`Screenshot ${idx + 1}`} width={80} height={60} className="rounded border object-cover" />
                  ))}
                </div>
              )}
            </div>
          </details>
          <div className="flex gap-2 mt-auto">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 text-xs font-medium transition" onClick={e => e.stopPropagation()}>GitHub</a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium transition" onClick={e => e.stopPropagation()}>Live Preview</a>
            )}
          </div>
        </div>
      </Link>
    )
  }

  // Debug: List all unique skill categories
  const allSkillCategories: string[] = Array.from(new Set((skills as any[]).map((s: any) => s.category))).sort();

  // Filtered skills for display
  const filteredSkills = activeSkillCategory === 'All'
    ? skills
    : skills.filter((s: any) => s.category === activeSkillCategory);

  // For mobile: show only first 5 unless expanded
  const visibleSkills = isMobile && !showAllMobileSkills ? filteredSkills.slice(0, 5) : filteredSkills;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="text-4xl text-gray-900 tracking-tight"
                style={{ fontFamily: "'Poppins', Arial, Helvetica, sans-serif", fontSize: "2.5rem", fontWeight: 400 }}
                onClick={e => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {profile.personalInfo.name}
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-600 hover:text-gray-900 transition-colors">Home</button>
              <button onClick={() => scrollToSection(projectsRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Projects</button>
              <button onClick={() => scrollToSection(blogsRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Blogs</button>
              <button onClick={() => scrollToSection(skillsRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Skills</button>
              <button onClick={() => scrollToSection(experienceRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Experience</button>
              <button onClick={() => scrollToSection(showcaseRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Showcase</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-gray-600 hover:text-gray-900 transition-colors">Contact</button>
              {personalInfo?.resume && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 bg-black border-black text-white hover:bg-gray-800 hover:border-gray-800 transition-all duration-200"
                  onClick={() => window.open(personalInfo.resume, '_blank')}
                >
                  <Download className="w-4 h-4" />
                   Resume
                </Button>
              )}
            </nav>
            <MobileMenu profile={profile} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image - Mobile First */}
          <div className="flex justify-center lg:hidden mb-8">
            <Image
              src={personalInfo?.avatar || "/placeholder-user.jpg"}
              alt={personalInfo?.name || "Profile"}
              width={280}
              height={280}
              className="w-70 h-70 rounded-full object-cover border-4 border-gray-200 shadow"
              onError={(e: any) => { e.currentTarget.src = "/placeholder-user.jpg"; }}
              priority
            />
          </div>
          
          <div className="space-y-8">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              {hero?.headline || personalInfo?.name || "Hi, I'm a Developer 👋"}
            </h1>
            {/* <p className="text-lg text-gray-600 leading-relaxed">
              {hero?.subheadline || personalInfo?.title || "I build modern, scalable web applications."}
            </p> */}
            {/* Social/contact links - always visible and prominent */}
            <div className="flex flex-wrap items-center gap-4 mt-2 mb-4">
              {personalInfo?.location && (
                <span className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {personalInfo.location}
                </span>
              )}
              {socialLinks?.website && (
                <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline text-sm">
                  <Globe className="w-4 h-4 mr-1" />
                  Website
                </a>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 hover:underline text-sm">
                  <Github className="w-4 h-4 mr-1" />
                  GitHub
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-700 hover:underline text-sm">
                  <Linkedin className="w-4 h-4 mr-1" />
                  LinkedIn
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:underline text-sm">
                  <Twitter className="w-4 h-4 mr-1" />
                  Twitter
                </a>
              )}
            </div>
            <p className="text-base text-gray-500 leading-relaxed">
              {about?.description || personalInfo?.bio || "Welcome to my portfolio!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={() => scrollToSection(projectsRef)}>
                <ChevronDown className="w-4 h-4" />
                {hero?.ctaText || "View Projects"}
              </Button>
              <ContactForm />
            </div>
          </div>
          
          {/* Profile Image - Desktop Only */}
          <div className="hidden lg:flex justify-end">
            <Image
              src={personalInfo?.avatar || "/placeholder-user.jpg"}
              alt={personalInfo?.name || "Profile"}
              width={320}
              height={320}
              className="w-80 h-80 rounded-full object-cover border-4 border-gray-200 shadow"
              onError={(e: any) => { e.currentTarget.src = "/placeholder-user.jpg"; }}
              priority
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* {(about?.description || (about?.images && about.images.length > 0) || (about?.highlights && about.highlights.length > 0)) && (
        <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Me</h2>
          {about?.description && (
            <p className="text-lg text-gray-700 mb-6">{about.description}</p>
          )}
          {about?.images && about.images.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-6">
              {about.images.map((img: string, idx: number) => (
                <Image
                  key={img}
                  src={img}
                  alt={`About image ${idx + 1}`}
                  width={220}
                  height={140}
                  className="rounded-lg object-cover shadow"
                />
              ))}
            </div>
          )}
          {about?.highlights && about.highlights.length > 0 && (
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {about.highlights.map((hl: string, idx: number) => (
                <li key={idx}>{hl}</li>
              ))}
            </ul>
          )}
        </section>
      )} */}

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-7 h-7 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          </div>
          <p className="text-gray-500 mb-8">A selection of my recent work and collaborations.</p>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project: any, idx: number) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          {projects.length > 3 && (
            <div className="flex justify-end mt-4">
              <a
                href="/projects"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm group"
              >
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" ref={blogsRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Blogs</h1>
          </div>
          <p className="text-gray-500 mb-8">Insights, tutorials, and stories from my journey.</p>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 3).map((blog: any, idx: number) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {blogs.length > 3 && (
            <div className="flex justify-end mt-4">
              <a
                href="/blogs"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-sm group"
              >
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="bg-gray-50 py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Move the skill categories filter here */}
        
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-7 h-7 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
          </div>
          <p className="text-gray-500 mb-8">Technologies and tools I work with.</p>
          {/* Category Tabs (already handled above) */}
          {/* Skills Grid */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {visibleSkills.map((skill: any, idx: number) => (
                <div
                  key={skill._id}
                className="bg-white rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row md:flex-col items-start p-4 sm:p-3 md:p-4 hover:shadow-lg hover:border-purple-300 hover:scale-[1.03] transition-all duration-200 group w-full max-w-full mx-auto min-h-[110px]"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-start md:items-center gap-2 w-full mb-2 sm:mb-0 md:mb-2">
                  {skill.icon && <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain flex-shrink-0 mb-1 sm:mb-0 md:mb-1" />}
                  <div className="flex-1 min-w-0 text-center sm:text-left md:text-center">
                    <div className="flex flex-col sm:flex-row md:flex-col items-center sm:items-start md:items-center gap-1 sm:gap-2 md:gap-1">
                      <span className="text-base sm:text-sm md:text-base font-semibold text-gray-900 truncate">{skill.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    skill.level === 'beginner' ? 'bg-gray-200 text-gray-700' :
                    skill.level === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                    skill.level === 'advanced' ? 'bg-green-100 text-green-700' :
                    skill.level === 'expert' ? 'bg-yellow-100 text-yellow-700' : ''
                  }`}>
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </span>
                    </div>
                  {typeof skill.yearsOfExperience === 'number' && (
                      <span className="text-[10px] text-gray-400">{skill.yearsOfExperience} yrs</span>
                    )}
                  </div>
                </div>
                {skill.description && (
                  <p className="text-xs sm:text-[11px] md:text-xs text-gray-600 mt-1 line-clamp-2 w-full text-center sm:text-left md:text-center">{skill.description}</p>
                )}
                </div>
              ))}
          </div>
          {/* Explore More button for mobile */}
          {isMobile && !showAllMobileSkills && filteredSkills.length > 5 && (
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-full font-semibold shadow hover:bg-purple-700 transition-all duration-200 text-sm"
                onClick={() => setShowAllMobileSkills(true)}
              >
                Explore More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section - Modern Stepper */}
      <section id="experience" ref={experienceRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-7 h-7 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Experience</h1>
          </div>
          <p className="text-gray-500 mb-8">Professional roles, internships, and impactful projects.</p>
          <div className="relative">
            {/* Vertical Stepper Line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pink-100 z-0 hidden sm:block" />
            <ol className="relative space-y-12">
              {experience
                .filter((exp: any) => exp.isActive)
                .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0) || new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                .map((exp: any, idx: number, arr: any[]) => (
                  <li key={exp._id} className="relative flex gap-6 sm:gap-8 items-start z-10">
                    {/* Stepper Dot */}
                    <div className="flex flex-col items-center">
                      <span className={`w-8 h-8 rounded-full border-4 flex items-center justify-center text-pink-600 font-bold bg-white z-10 ${exp.isCurrentJob ? 'border-pink-500 bg-pink-50 shadow-lg' : 'border-pink-200'}`}>{idx + 1}</span>
                      {idx < arr.length - 1 && <span className="flex-1 w-0.5 bg-pink-100 mt-1" style={{ minHeight: 40 }} />}
                    </div>
                    {/* Experience Content */}
                    <div className="flex-1 min-w-0 bg-white rounded-xl shadow border border-gray-100 p-5 sm:p-7 group transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                        {exp.companyLogo && (
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                            <img src={exp.companyLogo} alt={exp.company} className="w-12 h-12 object-contain rounded-lg border bg-white" />
                          </a>
                        )}
                        <div className="flex-1 min-w-0">
                          <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="text-base sm:text-lg text-pink-600 hover:underline font-semibold truncate block">
                            {exp.company}
                          </a>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                            <span className="font-bold text-gray-900 text-sm">{exp.position}</span>
                            <span>{exp.location}</span>
                            <span>{new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - {exp.isCurrentJob ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ''}</span>
                            {exp.isCurrentJob && <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium ml-2">Current</span>}
                          </div>
                  </div>
                </div>
                      <p className="text-gray-700 mb-3 text-sm whitespace-pre-line">{exp.description}</p>
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <div className="mb-2">
                          <h3 className="text-xs font-semibold text-gray-700 mb-1">Responsibilities:</h3>
                          <ul className="list-disc pl-5 text-gray-700 text-xs space-y-1">
                            {exp.responsibilities.map((item: string, idx: number) => (
                              <li key={idx}>{item.replace(/^"|"$/g, '')}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-2">
                          <h3 className="text-xs font-semibold text-gray-700 mb-1">Achievements:</h3>
                          <ul className="list-disc pl-5 text-pink-700 text-xs space-y-1 font-medium">
                            {exp.achievements.map((item: string, idx: number) => (
                              <li key={idx}>{item.replace(/^"|"$/g, '')}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {exp.technologies.map((tech: string, idx: number) => (
                            <span key={idx} className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded text-xs font-medium border border-pink-100">{tech.replace(/^"|"$/g, '')}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" ref={showcaseRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-7 h-7 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Showcase</h1>
          </div>
          <p className="text-gray-500 mb-8">A selection of unique projects, demos, and creative work.</p>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {showcase
              .filter((item: any) => item.isActive !== false)
              .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((item: any) => {
                const isGif = item.thumbnailUrl && item.thumbnailUrl.endsWith('.gif');
                return (
                  <div key={item._id} className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-orange-100">
                    <div className="relative w-full aspect-[16/9] bg-orange-50">
                      {isGif ? (
                        <img src={item.thumbnailUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <Image src={item.thumbnailUrl || item.mediaUrl || "/placeholder.jpg"} alt={item.title} fill className="absolute inset-0 w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded capitalize">{item.category}</span>
                        <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-lg font-bold text-orange-900 mb-1 line-clamp-2">{item.title}</h2>
                      <p className="text-gray-700 mb-3 text-sm line-clamp-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags?.map((tag: string) => (
                          <span key={tag} className="bg-orange-50 border border-orange-200 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">#{tag}</span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Link
                          href={{
                            pathname: `/showcase/${item._id}`,
                            query: { showcase: encodeURIComponent(JSON.stringify(item)) }
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-orange-700 hover:to-pink-700 transition-all duration-200 text-xs flex items-center gap-1"
                        >
                          View Details
                        </Link>
                </div>
              </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="bg-gradient-to-b from-purple-50 to-white py-20 animate-fadeIn">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <Mail className="w-10 h-10 text-purple-600 mb-2" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>
            <p className="text-gray-600 text-center mb-2">Let's connect! Whether you want to collaborate, have a project in mind, or just want to say hi, feel free to reach out.</p>
            {/* Direct contact details (customize as needed) */}
            <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
              {personalInfo?.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-purple-700 hover:underline text-sm">
                  <Mail className="w-4 h-4" /> {personalInfo.email}
                </a>
              )}
              {socialLinks?.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 hover:underline text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {socialLinks?.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:underline text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline text-sm">
                  <Twitter className="w-4 h-4" /> Twitter
                </a>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 sm:p-10 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Send a Message</h2>
          <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  )
} 