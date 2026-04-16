import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { useAlertStore } from '../../store/alertStore'
import { timeAgo } from '../../utils/formatters'

export default function AlertBanner() {
  const { alerts, unreadCount, markRead, markAllRead, clearAlerts } = useAlertStore()
  const recent = alerts.slice(0, 5)

  if (!recent.length) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-20 right-4 z-40 w-80 max-w-[calc(100vw-2rem)]"
      >
        <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-[#F5F0EB]">Nearby Alerts</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-xs font-bold">{unreadCount}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={markAllRead} className="text-xs text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors">Mark all read</button>
              <button onClick={clearAlerts} className="text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors"><X className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="divide-y divide-[rgba(255,255,255,0.05)] max-h-64 overflow-y-auto">
            {recent.map(alert => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => markRead(alert.id)}
                className={`px-4 py-3 cursor-pointer transition-all hover:bg-white/3 ${!alert.read ? 'bg-primary/5' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-danger/15 border border-danger/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-danger" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#F5F0EB] font-medium truncate">{alert.title || 'New incident nearby'}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {alert.distance && (
                        <span className="flex items-center gap-1 text-xs text-[#8a7a7d]">
                          <MapPin className="w-3 h-3" />{alert.distance}km away
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-[#8a7a7d]">
                        <Clock className="w-3 h-3" />{timeAgo(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  {!alert.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}