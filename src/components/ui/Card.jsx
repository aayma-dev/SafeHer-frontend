import { motion } from 'framer-motion'
import { clsx } from 'clsx'

export default function Card({ children, className = '', hover = false, onClick, padding = true }) {
  const base = clsx(
    'bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-card',
    padding && 'p-6',
    hover && 'cursor-pointer transition-all duration-300 hover:border-primary/25 hover:shadow-primary-glow',
    className
  )

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.005 }}
        onClick={onClick}
        className={base}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}

export function GlassCard({ children, className = '', padding = true }) {
  return (
    <div className={clsx(
      'glass border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-card',
      padding && 'p-6',
      className
    )}>
      {children}
    </div>
  )
}