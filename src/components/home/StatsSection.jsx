import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function CountUp({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

const stats = [
  { value: 10482, suffix: '+', label: 'Incidents Reported', color: 'text-primary' },
  { value: 3241, suffix: '+', label: 'Safe Zones Mapped', color: 'text-safe' },
  { value: 847, suffix: '', label: 'SOS Alerts Sent', color: 'text-accent' },
  { value: 52, suffix: '', label: 'Cities Active', color: 'text-blue-400' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-border text-center hover:border-primary/30 transition-all duration-300 group"
            >
              <p className={`font-display text-4xl font-bold ${color} mb-2 group-hover:scale-105 transition-transform`}>
                <CountUp target={value} />{suffix}
              </p>
              <p className="text-muted text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}