import { motion } from 'framer-motion'
import { User, FileText, MapPin, Shield, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authstore'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-base pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {/* Avatar */}
          <div className="glass rounded-3xl p-8 border border-border mb-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>

            <h2 className="font-display text-2xl font-bold text-[#F5F0EB] mb-1">
              {user?.username || 'User'}
            </h2>

            <p className="text-muted mb-4">{user?.email}</p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-safe/10 border border-safe/20 text-safe text-sm">
              <Shield className="w-4 h-4" /> Verified Nighban
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: FileText, value: '7', label: 'Reports', color: 'text-primary' },
              { icon: MapPin, value: '3', label: 'Safe Zones', color: 'text-safe' },
              { icon: Shield, value: '12', label: 'Alerts', color: 'text-accent' },
            ].map((item) => {
              const Icon = item.icon   // ✅ FIX

              return (
                <div key={item.label} className="glass rounded-2xl p-5 border border-border text-center">
                  <Icon className={`w-5 h-5 ${item.color} mx-auto mb-2`} />
                  <p className={`font-display text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-muted text-xs">{item.label}</p>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => { logout(); navigate('/') }}
            className="w-full py-3 rounded-2xl border border-danger/30 bg-danger/5 text-danger font-semibold flex items-center justify-center gap-2 hover:bg-danger hover:text-white transition-all duration-300"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>

        </motion.div>
      </div>
    </div>
  )
}