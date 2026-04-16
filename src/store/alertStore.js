import { create } from 'zustand'

export const useAlertStore = create((set) => ({
  alerts: [],
  sosActive: false,
  sosLocation: null,
  isConnected: false,
  unreadCount: 0,

  addAlert: (alert) =>
    set((state) => ({
      alerts: [
        { ...alert, id: Date.now(), read: false, timestamp: new Date() },
        ...state.alerts,
      ].slice(0, 50),
      unreadCount: state.unreadCount + 1,
    })),

  markAllRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, read: true })),
      unreadCount: 0,
    })),

  markRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) =>
        a.id === id ? { ...a, read: true } : a
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  clearAlerts: () => set({ alerts: [], unreadCount: 0 }),

  activateSOS: (location) =>
    set({ sosActive: true, sosLocation: location }),

  deactivateSOS: () =>
    set({ sosActive: false, sosLocation: null }),

  setConnected: (isConnected) => set({ isConnected }),
}))