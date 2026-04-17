import api from './api'

export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  me: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.patch('/api/auth/me', data),
  changePassword: (data) => api.post('/api/auth/change-password', data),
  googleAuth: (token) => api.post('/api/auth/google', { token }),
}