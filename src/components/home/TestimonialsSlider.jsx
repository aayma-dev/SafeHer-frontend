import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Ayesha K.', role: 'University Student, Lahore', text: 'SafeHer helped me find the safest route home after a late-night class. The community alerts gave me confidence I never had before walking alone.', initial: 'A' },
  { name: 'Sana M.', role: 'Working Professional, Karachi', text: 'I finally reported an incident I had been afraid to report. The anonymous option made all the difference. This platform is a lifeline.', initial: 'S' },
  { name: 'Hira F.', role: 'Nighban Guardian, Islamabad', text: 'I have marked 12 safe zones in my neighborhood. Knowing that other women use this information to feel safer makes every contribution worthwhile.', initial: 'H' },
  { name: 'Zara R.', role: 'Mother of Two, Rawalpindi', text: 'The SOS button saved my daughter when she was followed home from school. Within minutes, alerts went to our family and the area was flagged.', initial: 'Z' },
]

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const prev = () => { setDir(-1); setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length) }
  const next = () => { setDir(1); setCurrent((c) => (c + 1) % testimonials.length) }

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-6">
            Community Voices
          </div>
          <h2 className="font-display text-4xl font-bold text-[#F5F0EB]">
            Stories from Our <span className="gradient-text">Nighbans</span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass rounded-3xl p-10 border border-border relative"
            >
              <Quote className="absolute top-8 left-8 w-8 h-8 text-primary/30" />
              <p className="text-[#F5F0EB] text-lg leading-relaxed text-center mb-8 mt-4 font-light">
                "{testimonials[current].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center font-display font-bold text-white text-lg shadow-primary-glow">
                  {testimonials[current].initial}
                </div>
                <div>
                  <p className="font-semibold text-[#F5F0EB]">{testimonials[current].name}</p>
                  <p className="text-muted text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-[#F5F0EB] hover:border-primary/30 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-xl glass border border-border flex items-center justify-center text-muted hover:text-[#F5F0EB] hover:border-primary/30 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}