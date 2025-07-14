import { notFound } from "next/navigation";
import Image from "next/image";
import apiClient from "@/lib/apiClient";

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  thumbnailUrl: string;
  category: string;
  status: string;
  isFeatured: boolean;
  order: number;
  views: number;
  createdAt: string;
  features?: string[];
}

async function getProject(id: string): Promise<Project | null> {
  try {
    // console.log(apiClient.baseUrl+`/api/projects/${id}`);
    // console.log(id);
    const res = await apiClient.get(`/api/projects/${id}`);
    // console.log(res);
    return res as Project | null;
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);
  if (!project) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded capitalize">{project.category}</span>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{project.status}</span>
          {project.isFeatured && <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">Featured</span>}
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span>Views: {project.views}</span>
          <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-6">
        <Image src={project.thumbnailUrl || project.images[0] || "/placeholder.jpg"} alt={project.title} fill className="object-cover" />
      </div>
      <p className="text-gray-700 mb-4 whitespace-pre-line">{project.description}</p>
      {project.features && project.features.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {project.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">{tech}</span>
            ))}
          </div>
        </div>
      )}
      {project.images && project.images.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Gallery</h2>
          <div className="flex flex-wrap gap-2">
            {project.images.map((img, idx) => (
              <Image key={idx} src={img} alt={`Screenshot ${idx + 1}`} width={120} height={90} className="rounded border object-cover" />
            ))}
          </div>
        </div>
      )}
      <div className="flex gap-3 mt-6">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 text-sm font-medium transition">GitHub</a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium transition">Live Site</a>
        )}
      </div>
    </div>
  );
} 