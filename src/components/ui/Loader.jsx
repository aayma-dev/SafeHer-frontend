import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export function Spinner({ size = 'md', className = '' }) {
  const sz = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' }
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      className={`${sz[size]} border-2 border-primary/20 border-t-primary rounded-full ${className}`}
    />
  )
}

export function PageLoader({ message = 'Loading…' }) {
  return (
    <div className="min-h-screen bg-[#0d0a0b] flex flex-col items-center justify-center gap-6">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow"
      >
        <Shield className="w-8 h-8 text-white" />
      </motion.div>
      <div className="flex items-center gap-3">
        <Spinner />
        <p className="text-[#8a7a7d] text-sm">{message}</p>
      </div>
    </div>
  )
}

export default Spinner