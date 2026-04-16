import { create } from 'zustand'

export const useReportStore = create((set, get) => ({
  reports: [],
  selectedReport: null,
  filters: {
    category: '',
    status: '',
    dateRange: '',
    search: '',
  },
  pagination: { page: 1, limit: 12, total: 0 },
  isLoading: false,
  error: null,

  setReports: (reports, total = 0) =>
    set({ reports, pagination: { ...get().pagination, total } }),

  setSelectedReport: (report) => set({ selectedReport: report }),

  setFilters: (filters) =>
    set({ filters: { ...get().filters, ...filters }, pagination: { ...get().pagination, page: 1 } }),

  clearFilters: () =>
    set({ filters: { category: '', status: '', dateRange: '', search: '' } }),

  setPage: (page) =>
    set({ pagination: { ...get().pagination, page } }),

  addReport: (report) =>
    set((state) => ({ reports: [report, ...state.reports] })),

  updateReport: (id, updates) =>
    set((state) => ({
      reports: state.reports.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  deleteReport: (id) =>
    set((state) => ({ reports: state.reports.filter((r) => r.id !== id) })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))