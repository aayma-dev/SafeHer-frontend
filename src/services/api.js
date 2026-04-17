import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // safer for cross-domain (Vercel + Replit)
})

// Attach token
api.interceptors.request.use((config) => {
  try {
    const auth = JSON.parse(localStorage.getItem('safeher-auth') || '{}')
    const token = auth?.state?.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.error('Auth parsing failed:', error)
  }

  return config
})

// Global error handler
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