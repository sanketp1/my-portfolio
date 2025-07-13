import HomePage from '../components/HomePage'
import { format } from 'date-fns'

async function fetchAPI(endpoint) {
  const res = await fetch(`http://localhost:5000/api/${endpoint}`, { cache: 'no-store' })
  return res.json()
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
