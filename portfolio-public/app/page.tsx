import HomePage from '../components/HomePage'
import { format } from 'date-fns'
import apiClient from "@/lib/apiClient"

async function fetchAPI(endpoint: string) {
  return apiClient.get(`/api/${endpoint}`)
}

export default function Page() {
  return <HomePage />;
}
