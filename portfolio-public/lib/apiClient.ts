import { log } from "console";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || `http://localhost:${process.env.NEXT_PUBLIC_API_PORT || 5000}`;
console.log(API_BASE_URL);

export class ApiClient {
  baseUrl: string;
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request<T>(method: string, url: string, data?: any, options?: RequestInit): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    };
    const fetchOptions: RequestInit = {
      method,
      headers,
      ...options,
    };
    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }
    const response = await fetch(`${this.baseUrl}${url}`, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  get<T>(url: string, options?: RequestInit) {
    return this.request<T>('GET', url, undefined, options);
  }
  post<T>(url: string, data?: any, options?: RequestInit) {
    return this.request<T>('POST', url, data, options);
  }
  put<T>(url: string, data?: any, options?: RequestInit) {
    return this.request<T>('PUT', url, data, options);
  }
  delete<T>(url: string, options?: RequestInit) {
    return this.request<T>('DELETE', url, undefined, options);
  }
}

const apiClient = new ApiClient();
export default apiClient; 