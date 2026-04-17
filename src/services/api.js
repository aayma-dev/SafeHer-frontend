import axios from 'axios'

// Change this line - remove /api from the URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Attach token from localStorage
api.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem('safeher-auth') || '{}')
    const token = auth?.state?.token
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (error) {
    console.error('Auth parsing failed:', error)
  }

  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('safeher-auth')
      window.location.href = '/signin'
    }
    return Promise.reject(err)
  }
)

export default api