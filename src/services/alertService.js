import api from './api'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

export const alertService = {
  triggerSOS: (data) => api.post('/sos', data),

  getAlerts: () => api.get('/alerts'),

  connectWebSocket: (userId, onMessage) => {
    const ws = new WebSocket(`${WS_URL}/ws/alerts/${userId}`)

    ws.onmessage = (e) => {
      try {
        onMessage(JSON.parse(e.data))
      } catch (error) {
        console.error('WebSocket message parse error:', error)
      }
    }

    return ws
  },
}