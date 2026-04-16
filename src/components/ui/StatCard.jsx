import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ title, value, suffix = '', icon: Icon, trend, trendValue, color = 'primary', delay = 0 }) {
  const colors = {
    primary: { text: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', glow: 'shadow-primary-glow' },
    safe: { text: 'text-safe', bg: 'bg-safe/10', border: 'border-safe/20', glow: '' },
    danger: { text: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', glow: '' },
    accent: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20', glow: '' },
    blue: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', glow: '' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', glow: '' },
  }
  const c = colors[color] || colors.primary

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 shadow-card hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
          {Icon && <Icon className={`w-5 h-5 ${c.text}`} />}
        </div>
        {trend != null && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend > 0 ? 'text-safe' : trend < 0 ? 'text-danger' : 'text-[#8a7a7d]'
          }`}>
            {trend > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : trend < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            {trendValue}
          </div>
        )}
      </div>
      <p className={`font-display text-3xl font-bold ${c.text} mb-1`}>
        {value}{suffix}
      </p>
      <p className="text-[#8a7a7d] text-sm">{title}</p>
    </motion.div>
  )
}