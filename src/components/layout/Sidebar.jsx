import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authstore'

import {
  Shield,
  Map,
  FileText,
  BarChart2,
  BookOpen,
  AlertTriangle,
  User,
  LayoutDashboard,
  X,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/map', icon: Map, label: 'Safety Map' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
  { to: '/sos', icon: AlertTriangle, label: 'Emergency SOS', danger: true },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const { isAuthenticated, user } = useAuthStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-72 z-50 bg-[#141011] border-l border-[rgba(255,255,255,0.08)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary-glow">
                  <Shield className="w-4 h-4 text-white" />
                </div>

                <span className="font-display font-bold text-lg text-[#F5F0EB]">
                  Safe<span className="gradient-text">Her</span>
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            {isAuthenticated && user && (
              <div className="mx-4 mt-4 p-3 rounded-xl bg-[#1c1518] border border-[rgba(255,255,255,0.08)] flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary-gradient flex items-center justify-center text-white font-bold text-sm">
                  {user.username?.[0]?.toUpperCase() || 'U'}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#F5F0EB] truncate">
                    {user.username}
                  </p>
                  <p className="text-xs text-[#8a7a7d] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <p className="px-3 mb-2 text-xs font-semibold text-[#8a7a7d] uppercase tracking-wider">
                Navigation
              </p>

              {navItems.map((item) => {
                const active = location.pathname === item.to

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                      item.danger
                        ? 'text-danger hover:bg-danger/10'
                        : active
                        ? 'bg-primary/15 text-primary border border-primary/25'
                        : 'text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1">{item.label}</span>

                    {active && (
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </Link>
                )
              })}

              {/* Account Section */}
              {isAuthenticated && (
                <>
                  <div className="my-3 border-t border-[rgba(255,255,255,0.06)]" />

                  <p className="px-3 mb-2 text-xs font-semibold text-[#8a7a7d] uppercase tracking-wider">
                    Account
                  </p>

                  <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>

                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                </>
              )}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
              <Link to="/submit-report" onClick={onClose}>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl bg-primary-gradient text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-primary-glow"
                >
                  <FileText className="w-4 h-4" />
                  Submit a Report
                </motion.button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}