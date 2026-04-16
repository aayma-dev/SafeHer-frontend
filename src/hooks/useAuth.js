import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authstore'
import { authService } from '../services/authService'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setUser, logout: storeLogout } = useAuthStore()
  const navigate = useNavigate()

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authService.login(credentials)
      setUser(data.user, data.access_token)
      navigate('/')
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Login failed. Please try again.'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await authService.register(userData)
      setUser(data.user, data.access_token)
      navigate('/')
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed. Please try again.'
      setError(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    storeLogout()
    navigate('/')
  }

  return { login, register, logout, loading, error, setError }
}