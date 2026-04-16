import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Map, AlertTriangle, ChevronDown } from 'lucide-react'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[400, 600, 800, 1000].map((size, i) => (
          <motion.div
            key={size}
            animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            className="absolute rounded-full border border-primary/20"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 pb-20">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div variants={item} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm font-medium text-primary">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Real-time Women Safety Platform
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-[#F5F0EB] leading-[1.1] mb-6">
            Every Woman Deserves to
            <br />
            <span className="gradient-text">Feel Safe.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={item} className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Report incidents anonymously, discover safe zones, and access emergency support — powered by your community of <span className="text-accent font-semibold">Nighbans</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/submit-report">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(192,32,58,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-primary-gradient text-white font-semibold text-base shadow-primary-glow flex items-center gap-3 transition-all duration-300"
              >
                <Shield className="w-5 h-5" />
                Report an Incident
              </motion.button>
            </Link>
            <Link to="/map">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl glass border border-border text-[#F5F0EB] font-semibold text-base flex items-center gap-3 hover:border-white/30 transition-all duration-300"
              >
                <Map className="w-5 h-5 text-accent" />
                View Safety Map
              </motion.button>
            </Link>
            <Link to="/sos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ['0 0 0px rgba(239,68,68,0)', '0 0 20px rgba(239,68,68,0.4)', '0 0 0px rgba(239,68,68,0)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-8 py-4 rounded-2xl border border-danger/40 bg-danger/10 text-danger font-semibold text-base flex items-center gap-3 transition-all duration-300 hover:bg-danger hover:text-white"
              >
                <AlertTriangle className="w-5 h-5" />
                Emergency SOS
              </motion.button>
            </Link>
          </motion.div>

          {/* Mini stats */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-8 mb-12">
            {[
              { value: '10K+', label: 'Reports Filed' },
              { value: '50+', label: 'Cities Covered' },
              { value: '99%', label: 'Anonymous & Safe' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl font-bold gradient-text">{value}</p>
                <p className="text-xs text-muted mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <ChevronDown className="w-6 h-6 text-muted/50" />
        </motion.div>
      </div>
    </section>
  )
}










