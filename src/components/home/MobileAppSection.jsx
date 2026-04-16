import { motion } from 'framer-motion'
import { Apple, Play, Star, Download } from 'lucide-react'
import phoneMockup from '../../assets/images/phone-mockup.svg'

const stores = [
  { icon: Apple, label: 'App Store',    sub: 'Download on the',  rating: '4.9' },
  { icon: Play,  label: 'Google Play',  sub: 'Get it on',        rating: '4.8' },
]

const features = ['Real-time SOS alerts', 'Offline-capable safety map', 'Encrypted anonymous reports']

export default function MobileAppSection() {
  return (
    <section className="py-24 bg-[#0d0a0b] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Download className="w-3.5 h-3.5" /> Mobile App Available
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0EB] mb-6 leading-[1.15]">
              Safety in Your <span className="gradient-text">Pocket.</span>
            </h2>

            <p className="text-[#8a7a7d] text-lg leading-relaxed mb-8">
              Take SafeHer anywhere. Report incidents, find safe routes, and activate SOS — even with poor connectivity.
            </p>

            <ul className="space-y-3 mb-10">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#F5F0EB]/80 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Store badges */}
            <div className="flex flex-wrap gap-4">
              {stores.map((store) => (
                <motion.button
                  key={store.label}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1c1518] border border-[rgba(255,255,255,0.1)] hover:border-primary/30 transition-all duration-300 group"
                >
                  <store.icon className="w-7 h-7 text-[#F5F0EB] group-hover:text-primary transition-colors" />

                  <div className="text-left">
                    <p className="text-[#8a7a7d] text-xs">{store.sub}</p>
                    <p className="text-[#F5F0EB] font-semibold text-sm">{store.label}</p>
                  </div>

                  <div className="ml-2 flex items-center gap-1 text-xs text-yellow-400">
                    <Star className="w-3 h-3 fill-yellow-400" /> {store.rating}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right — floating phone mockup */}
          <div className="flex justify-center">
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Glow ring behind phone */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-75 translate-y-10" />

              <img
                src={phoneMockup}
                alt="SafeHer Mobile App"
                className="relative w-64 md:w-72 drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 40px 60px rgba(192,32,58,0.4))' }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}