import api from './api'

export const authService = {
  register: (data) => api.post('/api/auth/register', data),

  // ✅ FIXED LOGIN (FastAPI OAuth2 compatible)
  login: (data) => {
    const formData = new URLSearchParams()

    formData.append('username', data.username)
    formData.append('password', data.password)

    // (optional but safe for FastAPI OAuth2 endpoints)
    formData.append('grant_type', 'password')

    return api.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  },

  logout: () => api.post('/api/auth/logout'),

  me: () => api.get('/api/auth/me'),

  updateProfile: (data) => api.patch('/api/auth/me', data),

  changePassword: (data) =>
    api.post('/api/auth/change-password', data),

  googleAuth: (token) =>
    api.post('/api/auth/google', { token }),
}