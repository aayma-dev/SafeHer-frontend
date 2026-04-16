import { motion } from 'framer-motion'
import { BookOpen, Phone, MapPin, Scale, Heart, ExternalLink, Search, Shield } from 'lucide-react'
import { useState } from 'react'

const CATEGORIES = ['All', 'Helplines', 'Legal', 'Medical', 'Community']

const RESOURCES = [
  {
    category: 'Helplines',
    icon: '🆘', color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20',
    items: [
      { name: 'Women Helpline', contact: '1043', desc: '24/7 toll-free helpline for women in distress across Pakistan.', type: 'phone' },
      { name: 'Emergency Services', contact: '1122', desc: 'Rescue and emergency response — call immediately if in danger.', type: 'phone' },
      { name: 'Police Emergency', contact: '15', desc: 'Nationwide police emergency number.', type: 'phone' },
      { name: 'Child Protection', contact: '1121', desc: 'Dedicated helpline for child safety and protection cases.', type: 'phone' },
    ],
  },
  {
    category: 'Legal',
    icon: '⚖️', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20',
    items: [
      { name: 'National Commission on Status of Women', contact: 'ncsw.gov.pk', desc: 'Government body for womens rights and legal support in Pakistan.', type: 'web' },
      { name: 'Aurat Foundation', contact: 'af.org.pk', desc: 'Legal aid, research and advocacy for women\'s rights since 1986.', type: 'web' },
      { name: 'Legal Aid Society', contact: 'las.org.pk', desc: 'Free legal assistance for women and minorities in Pakistan.', type: 'web' },
      { name: 'FIA Cybercrime Wing', contact: '9911', desc: 'Report online harassment, cyberstalking and digital abuse.', type: 'phone' },
    ],
  },
  {
    category: 'Medical',
    icon: '🏥', color: 'text-safe', bg: 'bg-safe/10', border: 'border-safe/20',
    items: [
      { name: 'Umang Helpline', contact: '0317-4288665', desc: 'Mental health support and counselling for survivors of trauma.', type: 'phone' },
      { name: 'Rozan Counseling Center', contact: 'rozan.org', desc: 'Trauma counseling and psychosocial support for women.', type: 'web' },
      { name: 'Sehat Kahani', contact: 'sehatkahani.com', desc: 'Online medical consultations including mental health support.', type: 'web' },
    ],
  },
  {
    category: 'Community',
    icon: '🤝', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20',
    items: [
      { name: 'War Against Rape', contact: 'war.org.pk', desc: 'Crisis center and support for survivors of sexual violence.', type: 'web' },
      { name: 'Shirkat Gah', contact: 'shirkatgah.org', desc: "Women's resource center with community programs.", type: 'web' },
      { name: 'Dastak Shelter', contact: '042-35761999', desc: 'Emergency shelter for women fleeing violence in Lahore.', type: 'phone' },
    ],
  },
]

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = RESOURCES.filter(g =>
    (activeCategory === 'All' || g.category === activeCategory)
  ).map(g => ({
    ...g,
    items: g.items.filter(i =>
      !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-[#0d0a0b] pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Safety Resources
          </div>
          <h1 className="font-display font-bold text-3xl text-[#F5F0EB] mb-3">Help is Always Available</h1>
          <p className="text-[#8a7a7d] max-w-lg mx-auto text-sm leading-relaxed">
            Verified helplines, legal aid, medical support and community organizations — all in one place.
          </p>
        </motion.div>

        {/* Search + filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a7d]" />
            <input type="text" placeholder="Search resources…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-xl pl-11 pr-4 py-3 text-sm text-[#F5F0EB] placeholder-[#8a7a7d] focus:outline-none focus:border-primary/50 transition-colors" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === c
                    ? 'bg-primary-gradient text-white shadow-primary-glow'
                    : 'bg-[#1c1518] border border-[rgba(255,255,255,0.08)] text-[#8a7a7d] hover:text-[#F5F0EB] hover:border-primary/25'
                }`}>{c}</button>
            ))}
          </div>
        </motion.div>

        {/* Resource groups */}
        <div className="space-y-8">
          {filtered.map((group, gi) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: gi * 0.05 }}>
              <div className={`flex items-center gap-3 mb-4 px-1`}>
                <span className="text-2xl">{group.icon}</span>
                <h2 className={`font-display font-bold text-lg ${group.color}`}>{group.category}</h2>
                <div className={`flex-1 h-px ${group.bg.replace('/10', '/15')}`} style={{ background: `currentColor`, opacity: 0.2 }} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item, i) => (
                  <motion.div key={item.name}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className={`bg-[#1c1518] border ${group.border} rounded-2xl p-5 hover:shadow-card transition-all duration-300 group relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-20 h-20 ${group.bg} rounded-full -translate-y-8 translate-x-8 blur-2xl pointer-events-none`} />
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-[#F5F0EB] text-sm leading-snug">{item.name}</h3>
                      {item.type === 'web'
                        ? <a href={`https://${item.contact}`} target="_blank" rel="noopener noreferrer"
                            className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center flex-shrink-0 ${group.color} hover:scale-110 transition-transform`}>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        : <a href={`tel:${item.contact}`}
                            className={`w-7 h-7 rounded-lg ${group.bg} flex items-center justify-center flex-shrink-0 ${group.color} hover:scale-110 transition-transform`}>
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                      }
                    </div>
                    <p className="text-xs text-[#8a7a7d] leading-relaxed mb-3">{item.desc}</p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${group.bg} text-xs font-medium ${group.color}`}>
                      {item.type === 'web' ? <ExternalLink className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                      {item.contact}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-2xl bg-primary/8 border border-primary/20">
          <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="font-display font-bold text-xl text-[#F5F0EB] mb-2">Know a resource we missed?</h3>
          <p className="text-[#8a7a7d] text-sm mb-4">Help us keep this directory up to date. Submit a suggestion via the report form.</p>
          <a href="/submit-report" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-primary-glow">
            Suggest a Resource
          </a>
        </motion.div>

      </div>
    </div>
  )
}
