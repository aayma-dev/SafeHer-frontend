import api from './api'

export const reportService = {
  getAll: (params) => api.get('/api/reports', { params }),
  getById: (id) => api.get(`/api/reports/${id}`),
  create: (data) => api.post('/api/reports', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateStatus: (id, status) => api.patch(`/api/reports/${id}/status`, { status }),
  delete: (id) => api.delete(`/api/reports/${id}`),
  addComment: (id, content) => api.post(`/api/reports/${id}/comments`, { content }),
  getComments: (id) => api.get(`/api/reports/${id}/comments`),
  exportPDF: (id) => api.get(`/api/reports/${id}/export`, { responseType: 'blob' }),
  getSafeZones: () => api.get('/api/safe-zones'),
  addSafeZone: (data) => api.post('/api/safe-zones', data),
  upvoteSafeZone: (id) => api.post(`/api/safe-zones/${id}/upvote`),
}