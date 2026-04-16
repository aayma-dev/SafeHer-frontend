import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-24 bg-base relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow mx-auto">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0EB] mb-6">
            Become a <span className="gradient-text">Nighban</span> Today
          </h2>
          <p className="text-muted text-lg mb-10 leading-relaxed">
            Join thousands of women and allies making their communities safer — one report, one safe zone, one alert at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(192,32,58,0.6)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-primary-gradient text-white font-semibold flex items-center gap-3 shadow-primary-glow transition-all"
              >
                Join SafeHer <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/map">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 rounded-2xl glass border border-border text-[#F5F0EB] font-semibold hover:border-white/20 transition-all"
              >
                Explore Safety Map
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}