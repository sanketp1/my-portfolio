import Link from "next/link"
import { Youtube, Twitter, Linkedin, Github, Mail, Globe } from "lucide-react"

interface FooterProps {
  profile?: any
}

export function Footer({ profile }: FooterProps) {
  const personalInfo = profile?.personalInfo || {}
  const socialLinks = personalInfo?.socialLinks || {}
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">{personalInfo?.name || "Portfolio"}</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              {personalInfo?.bio || "Passionate developer building modern, scalable web applications with cutting-edge technologies."}
            </p>
            <div className="flex space-x-4">
              {socialLinks?.youtube && (
                <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              )}
              {socialLinks?.twitter && (
                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
              )}
              {socialLinks?.linkedin && (
                <Link href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
              {socialLinks?.github && (
                <Link href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
              )}
              {personalInfo?.email && (
                <Link href={`mailto:${personalInfo.email}`} className="text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </Link>
              )}
              {socialLinks?.website && (
                <Link href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blogs" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Experience
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  All Blogs
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-gray-300 hover:text-white transition-colors">
                  Showcase
                </Link>
              </li>
              {personalInfo?.resume && (
                <li>
                  <Link href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    Resume
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {personalInfo?.name || "Portfolio"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
