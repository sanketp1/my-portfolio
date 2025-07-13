"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown, ExternalLink, Globe, Github, Linkedin, Twitter, MapPin, Briefcase, BookOpen, Layers, Award, Mail, Star, Code, Database, Settings, User, Wrench, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { useRef, useState } from "react"
import { format } from 'date-fns'

export default function HomePage({ profile, projects, blogs, skills, experience, showcase }: any) {
  // Section refs for scrolling
  const projectsRef = useRef<HTMLDivElement | null>(null)
  const blogsRef = useRef<HTMLDivElement | null>(null)
  const skillsRef = useRef<HTMLDivElement | null>(null)
  const experienceRef = useRef<HTMLDivElement | null>(null)
  const showcaseRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const [skillCategory, setSkillCategory] = useState('all');

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="text-xl font-semibold text-gray-900" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Portfolio</a>
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
              src={personalInfo?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt={personalInfo?.name || "Profile"}
              width={280}
              height={280}
              className="w-70 h-70 rounded-full object-cover"
            />
          </div>
          
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              {hero?.headline || personalInfo?.name || "Hi, I'm a Developer 👋"}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {hero?.subheadline || personalInfo?.title || "I build modern, scalable web applications."}
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              {personalInfo?.bio || "Welcome to my portfolio!"}
            </p>
            {/* Social/contact links */}
            {(personalInfo || socialLinks) && (
              <div className="flex flex-wrap items-center gap-4 mt-4">
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
            )}
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
              src={personalInfo?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt={personalInfo?.name || "Profile"}
              width={320}
              height={320}
              className="w-80 h-80 rounded-full object-cover"
            />
          </div>
        </div>
      </section>

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
              <div
                key={project._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {project.images && project.images[0] && (
                  <div className="relative w-full aspect-[16/9] bg-gray-100">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-xl font-bold mb-2 text-purple-700 line-clamp-2">{project.title}</h2>
                  <p className="text-gray-600 mb-3 line-clamp-3">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech: string) => (
                      <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 text-xs font-medium transition">GitHub</a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-xs font-medium transition">Live Preview</a>
                    )}
                  </div>
                </div>
              </div>
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
              <div
                key={blog._id}
                className="group bg-blue-50 rounded-2xl shadow overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg animate-fadeInUp"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {blog.featuredImage && (
                  <div className="relative w-full aspect-[16/9] bg-blue-100">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col p-6 relative">
                  <h2 className="text-lg font-bold mb-1 text-blue-700 line-clamp-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-3">{blog.excerpt}</p>
                  <span className="text-xs text-gray-400 mb-4">{format(new Date(blog.publishedAt), 'MM/dd/yyyy')}</span>
                  {blog.slug && (
                    <a
                      href={`/blogs/${blog.slug}`}
                      className="absolute right-5 bottom-5 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-xl hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-xs group"
                      style={{ minWidth: 'auto' }}
                    >
                      <span className="sr-only sm:not-sr-only">Read</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
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
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-7 h-7 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Skills</h1>
          </div>
          <p className="text-gray-500 mb-8">Technologies and tools I work with.</p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['all', 'frontend', 'backend', 'database', 'devops', 'tools', 'soft'].map(cat => (
              <button
                key={cat}
                onClick={() => setSkillCategory(cat)}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${skillCategory === cat ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            {skills
              .filter((skill: any) => skillCategory === 'all' || skill.category === skillCategory)
              .map((skill: any, idx: number) => (
                <div
                  key={skill._id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col items-start hover:shadow-lg transition animate-fadeIn"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Icon by category */}
                  <span className="mb-2">
                    {skill.category === 'frontend' && <Layers className="w-6 h-6 text-green-500" />}
                    {skill.category === 'backend' && <Code className="w-6 h-6 text-blue-500" />}
                    {skill.category === 'database' && <Database className="w-6 h-6 text-purple-500" />}
                    {skill.category === 'devops' && <Settings className="w-6 h-6 text-yellow-500" />}
                    {skill.category === 'tools' && <Wrench className="w-6 h-6 text-pink-500" />}
                    {skill.category === 'soft' && <User className="w-6 h-6 text-gray-500" />}
                  </span>
                  <span className="text-lg font-semibold mb-1 text-gray-900">{skill.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded mb-2 ${
                    skill.level === 'beginner' ? 'bg-gray-200 text-gray-700' :
                    skill.level === 'intermediate' ? 'bg-blue-100 text-blue-700' :
                    skill.level === 'advanced' ? 'bg-green-100 text-green-700' :
                    skill.level === 'expert' ? 'bg-yellow-100 text-yellow-700' : ''
                  }`}>
                    {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                  </span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded mb-2">{skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</span>
                  {typeof skill.yearsOfExperience === 'number' && (
                    <span className="text-xs text-gray-500 mb-2">{skill.yearsOfExperience} yrs exp</span>
                  )}
                  {/* Progress bar for level */}
                  <div className="w-full h-2 bg-gray-100 rounded mt-2">
                    <div
                      className={`h-2 rounded transition-all duration-500 ${
                        skill.level === 'beginner' ? 'bg-gray-400 w-1/4' :
                        skill.level === 'intermediate' ? 'bg-blue-400 w-2/4' :
                        skill.level === 'advanced' ? 'bg-green-500 w-3/4' :
                        skill.level === 'expert' ? 'bg-yellow-400 w-full' : ''
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-7 h-7 text-yellow-600" />
            <h1 className="text-3xl font-bold text-yellow-700">Experience</h1>
          </div>
          <p className="text-gray-500 mb-8">My professional journey and roles.</p>
          <div className="relative pl-8 max-w-3xl">
            {/* Vertical line */}
            <span className="absolute left-4 top-0 w-1 h-full bg-yellow-400 rounded" style={{ zIndex: 0 }}></span>
            {experience.map((exp: any, idx: number) => {
              const isCurrent = !exp.endDate;
              return (
                <div key={exp._id} className="relative flex items-start mb-10 last:mb-0 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                  {/* Stepper dot */}
                  <span className={`absolute -left-1.5 top-2 flex items-center justify-center w-7 h-7 rounded-full border-4 ${isCurrent ? 'bg-yellow-400 border-yellow-400 shadow-lg' : 'bg-white border-yellow-400'} transition-all duration-300`} style={{ zIndex: 2 }}>
                    <Briefcase className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-yellow-600'}`} />
                  </span>
                  <div className="ml-8 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <span className={`text-lg font-bold ${isCurrent ? 'text-yellow-700' : 'text-gray-900'}`}>{exp.position} <span className="font-bold text-yellow-700">@ {exp.company}</span></span>
                      <span className="text-xs text-gray-400 sm:ml-2">
                        {format(new Date(exp.startDate), 'MM/dd/yyyy')} - {exp.endDate ? format(new Date(exp.endDate), 'MM/dd/yyyy') : "Present"}
                      </span>
                    </div>
                    {exp.description && <p className="text-gray-600 text-base mt-1 leading-relaxed">{exp.description}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" ref={showcaseRef} className="bg-gray-50 py-20 animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-7 h-7 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900">Showcase</h1>
          </div>
          <p className="text-gray-500 mb-8">Featured highlights and media.</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {showcase.slice(0, 3).map((item: any, idx: number) => (
              <div
                key={item._id}
                className="group bg-pink-50 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp relative"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {item.type === "image" && item.mediaUrl ? (
                  <div className="relative w-full aspect-[16/9] bg-pink-100">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex-1 flex flex-col p-6 pb-14 relative">
                  <h2 className="text-lg font-bold mb-1 text-pink-700 line-clamp-2">{item.title}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-3">{item.description}</p>
                  {/* Footer for View button, reserved space at bottom */}
                  {item.mediaUrl && (
                    <div className="absolute bottom-5 right-5">
                      <a
                        href={item.mediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-xl hover:-translate-y-0.5 hover:from-pink-700 hover:to-purple-700 transition-all duration-200 text-xs group"
                        style={{ minWidth: 'auto' }}
                      >
                        <span className="sr-only sm:not-sr-only">View</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {showcase.length > 3 && (
            <div className="flex justify-end mt-4">
              <a
                href="/showcase"
                className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold shadow hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 hover:from-pink-700 hover:to-purple-700 transition-all duration-200 text-sm group"
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

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="bg-white py-20 animate-fadeIn">
        <div className="max-w-xl mx-auto p-8 rounded-2xl shadow-lg bg-gray-50">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-7 h-7 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
          </div>
          <p className="text-gray-500 mb-8">Let's connect! Send me a message below.</p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <Footer profile={profile} />
    </div>
  )
} 