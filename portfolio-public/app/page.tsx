import HomePage from '../components/HomePage'
import { format } from 'date-fns'
import apiClient from "@/lib/apiClient"

async function fetchAPI(endpoint: string) {
  return apiClient.get(`/api/${endpoint}`)
}

export default async function Page() {
  const [profile, projects, blogs, skills, experience, showcase] = await Promise.all([
    fetchAPI('profile'),
    fetchAPI('projects'),
    fetchAPI('blogs'),
    fetchAPI('skills'),
    fetchAPI('experience'),
    fetchAPI('showcase'),
  ])
  return (
    <HomePage
      profile={profile}
      projects={projects}
      blogs={blogs}
      skills={skills}
      experience={experience}
      showcase={showcase}
    />
  )
}
