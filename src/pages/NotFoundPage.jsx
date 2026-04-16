import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow mx-auto mb-8"
        >
          <Shield className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="font-display text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-[#F5F0EB] text-xl font-semibold mb-2">Page Not Found</p>
        <p className="text-muted mb-8">This page doesn't exist or has been moved.</p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-2xl bg-primary-gradient text-white font-semibold flex items-center gap-2 mx-auto shadow-primary-glow"
          >
            <Home className="w-4 h-4" /> Back to Home
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}