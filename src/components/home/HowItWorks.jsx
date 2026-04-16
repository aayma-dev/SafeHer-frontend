import { motion } from 'framer-motion'
import { UserCheck, MapPin, Bell, Shield } from 'lucide-react'

const steps = [
  { num: '01', icon: UserCheck, title: 'Create Account or Stay Anonymous', desc: 'Sign up to track your reports, or submit anonymously — no pressure, no judgment.' },
  { num: '02', icon: MapPin, title: 'Report an Incident', desc: 'Drop a pin, select a category, add description and images. Your report is live in seconds.' },
  { num: '03', icon: Bell, title: 'Community Gets Alerted', desc: 'Nearby Nighbans receive real-time push notifications and can confirm or add context.' },
  { num: '04', icon: Shield, title: 'Safer Spaces for Everyone', desc: 'Admins verify reports, safe zones get marked, and the community becomes safer together.' },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 relative">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-6">
            How It Works
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0EB]">
            Simple. Fast. <span className="gradient-text">Powerful.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 relative">

          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30" />

          {steps.map((step, i) => {
            const StepIcon = step.icon   // ✅ FIX HERE

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow">
                    
                    <StepIcon className="w-8 h-8 text-white" />

                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-[10px] font-bold text-[#0D0D14] flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-semibold text-[#F5F0EB] mb-2">
                  {step.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}