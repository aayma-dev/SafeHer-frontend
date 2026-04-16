import { motion } from 'framer-motion'
import { MapPin, Bell, Shield, Users, BarChart2, MessageCircle, Eye, Download } from 'lucide-react'

const features = [
  { icon: Eye, title: 'Anonymous Reporting', desc: 'Report incidents without revealing your identity. No login required for basic reports.', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
  { icon: MapPin, title: 'Interactive Safety Map', desc: 'Real-time heatmap showing incident hotspots and verified safe zones near you.', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Get notified instantly when an incident is reported within 2km of your location.', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  { icon: Shield, title: 'Emergency SOS', desc: 'One-tap SOS sends your live location to emergency contacts and authorities.', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' },
  { icon: Users, title: 'Community Nighbans', desc: 'Citizens become guardians by upvoting safe zones and confirming reports.', color: 'text-safe', bg: 'bg-safe/10', border: 'border-safe/20' },
  { icon: BarChart2, title: 'Analytics Dashboard', desc: 'Visualize incident trends, peak hours, and category breakdowns in your area.', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  { icon: MessageCircle, title: 'Community Comments', desc: 'Confirm sightings, add updates, and build a collaborative safety network.', color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  { icon: Download, title: 'Export as PDF', desc: 'Download incident reports for legal submission or personal records.', color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-base relative">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            Platform Features
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0EB] mb-4">
            Everything You Need to
            <span className="gradient-text"> Stay Safe</span>
          </h2>

          <p className="text-muted text-lg max-w-2xl mx-auto">
            SafeHer combines real-time technology with community power to create the most comprehensive women's safety platform.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`glass rounded-2xl p-6 border ${item.border} hover:shadow-card-hover transition-all duration-300 group cursor-default`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>

                <h3 className="font-display font-semibold text-[#F5F0EB] mb-2 text-base">
                  {item.title}
                </h3>

                <p className="text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}