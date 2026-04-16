import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Map, FileText, BarChart2, BookOpen,
  AlertTriangle, LogIn, UserPlus, LogOut, User,
  Menu, X, Bell
} from 'lucide-react'
import { useAuthStore } from '../../store/authstore'

const navLinks = [
  { to: '/map', icon: Map, label: 'Safety Map' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    setProfileOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-[0_4px_32px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary-glow"
          >
            <Shield className="w-5 h-5 text-white" />
          </motion.div>
          <span className="font-display font-bold text-xl text-[#F5F0EB] group-hover:text-primary transition-colors duration-300">
            Safe<span className="gradient-text">Her</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={handleNavClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.to
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-muted hover:text-[#F5F0EB] hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">

          <Link to="/sos" onClick={handleNavClick}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm font-semibold hover:bg-danger hover:text-white transition-all duration-300"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden lg:inline">SOS</span>
            </motion.button>
          </Link>

          <Link to="/submit-report" onClick={handleNavClick}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-primary-glow hover:shadow-[0_0_25px_rgba(192,32,58,0.6)] transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden lg:inline">Report</span>
            </motion.button>
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-xl bg-surface-card border border-border flex items-center justify-center hover:border-primary/50 transition-all duration-300"
              >
                <User className="w-5 h-5 text-muted" />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute right-0 top-14 w-52 glass rounded-2xl border border-border p-2 shadow-card"
                  >
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <p className="text-sm font-semibold text-[#F5F0EB] truncate">
                        {user?.username || 'User'}
                      </p>
                      <p className="text-xs text-muted truncate">{user?.email}</p>
                    </div>

                    <Link to="/profile" onClick={handleNavClick}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-muted hover:text-[#F5F0EB] transition-colors"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-danger/10 text-sm text-muted hover:text-danger transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-[#F5F0EB]"
                >
                  <LogIn className="w-5 h-5" />
                </motion.button>
              </Link>

              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center text-white"
                >
                  <UserPlus className="w-5 h-5" />
                </motion.button>
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="md:hidden glass border-t border-border mt-2 overflow-hidden">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted hover:text-[#F5F0EB]"
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}