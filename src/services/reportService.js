import api from './api'

export const reportService = {
  getAll: (params) => api.get('/reports', { params }),
  getById: (id) => api.get(`/reports/${id}`),
  create: (data) => api.post('/reports', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateStatus: (id, status) => api.patch(`/reports/${id}/status`, { status }),
  delete: (id) => api.delete(`/reports/${id}`),
  addComment: (id, content) => api.post(`/reports/${id}/comments`, { content }),
  getComments: (id) => api.get(`/reports/${id}/comments`),
  exportPDF: (id) => api.get(`/reports/${id}/export`, { responseType: 'blob' }),
  getSafeZones: () => api.get('/safe-zones'),
  addSafeZone: (data) => api.post('/safe-zones', data),
  upvoteSafeZone: (id) => api.post(`/safe-zones/${id}/upvote`),
}