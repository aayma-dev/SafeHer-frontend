import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, FileText, Image, Eye, EyeOff, AlertCircle, CheckCircle2, Send } from 'lucide-react'

const categories = ['Harassment', 'Stalking / Following', 'Physical Assault', 'Unsafe Area', 'Verbal Abuse', 'Other']

export default function SubmitReportPage() {
  const [form, setForm] = useState({ title: '', category: '', description: '', location: '', isAnonymous: true })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (data) => {
    const e = {}
    if (!data.title) e.title = 'Title is required'
    if (!data.category) e.category = 'Please select a category'
    if (!data.description || data.description.length < 20) e.description = 'Please provide at least 20 characters'
    return e
  }

  const onChange = (field, value) => {
    const updated = { ...form, [field]: value }
    setForm(updated)
    if (touched[field]) setErrors(validate(updated))
  }

  const onBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(form))
  }

  const isValid = Object.keys(validate(form)).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ title: true, category: true, description: true })
    const e2 = validate(form)
    setErrors(e2)
    if (Object.keys(e2).length > 0) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center px-4 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-safe/10 border border-safe/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-safe" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[#F5F0EB] mb-3">Report Submitted</h2>
          <p className="text-muted mb-6">Your report has been received{form.isAnonymous ? ' anonymously' : ''}. Our moderators will review it shortly.</p>
          <button onClick={() => { setSubmitted(false); setForm({ title: '', category: '', description: '', location: '', isAnonymous: true }); setTouched({}) }}
            className="px-6 py-3 rounded-2xl bg-primary-gradient text-white font-semibold shadow-primary-glow hover:shadow-[0_0_30px_rgba(192,32,58,0.6)] transition-all">
            Submit Another Report
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-4">
            <FileText className="w-4 h-4" /> Submit Report
          </div>
          <h1 className="font-display text-4xl font-bold text-[#F5F0EB] mb-2">Report an Incident</h1>
          <p className="text-muted">Your report helps keep the community safe. All fields marked are required.</p>
        </motion.div>

        {/* Anonymous toggle */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 border border-border mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {form.isAnonymous ? <EyeOff className="w-5 h-5 text-accent" /> : <Eye className="w-5 h-5 text-muted" />}
            <div>
              <p className="text-[#F5F0EB] text-sm font-semibold">{form.isAnonymous ? 'Anonymous Report' : 'Identified Report'}</p>
              <p className="text-muted text-xs">{form.isAnonymous ? 'Your identity is completely hidden' : 'Your username will be attached'}</p>
            </div>
          </div>
          <button
            onClick={() => setForm((f) => ({ ...f, isAnonymous: !f.isAnonymous }))}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form.isAnonymous ? 'bg-accent' : 'bg-border'}`}
          >
            <motion.div
              animate={{ x: form.isAnonymous ? 24 : 2 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
            />
          </button>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-8 border border-border space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-[#F5F0EB] mb-2 block">Incident Title *</label>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border bg-white/5 transition-all ${errors.title && touched.title ? 'border-danger bg-danger/5' : form.title ? 'border-primary/50' : 'border-border focus-within:border-primary/50'}`}>
              <FileText className={`w-5 h-5 ${errors.title && touched.title ? 'text-danger' : form.title ? 'text-primary' : 'text-muted'}`} />
              <input type="text" placeholder="Brief title describing the incident" value={form.title}
                onChange={(e) => onChange('title', e.target.value)} onBlur={() => onBlur('title')}
                className="flex-1 bg-transparent text-sm text-[#F5F0EB] placeholder:text-muted/60 outline-none" />
            </div>
            {errors.title && touched.title && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs text-danger ml-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-[#F5F0EB] mb-2 block">Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button type="button" key={cat} onClick={() => onChange('category', cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    form.category === cat ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted hover:border-border/80 hover:text-[#F5F0EB]'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && touched.category && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs text-danger ml-1"><AlertCircle className="w-3 h-3" />{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-[#F5F0EB] mb-2 block">Description *</label>
            <div className={`rounded-2xl border bg-white/5 transition-all ${errors.description && touched.description ? 'border-danger bg-danger/5' : form.description ? 'border-primary/50' : 'border-border focus-within:border-primary/50'}`}>
              <textarea rows={4} placeholder="Describe what happened in detail (minimum 20 characters)..."
                value={form.description} onChange={(e) => onChange('description', e.target.value)} onBlur={() => onBlur('description')}
                className="w-full bg-transparent text-sm text-[#F5F0EB] placeholder:text-muted/60 outline-none px-4 py-3 resize-none" />
              <div className="px-4 pb-2 flex justify-between items-center">
                <span className="text-xs text-muted">{form.description.length} chars</span>
                <span className="text-xs text-muted">min 20</span>
              </div>
            </div>
            {errors.description && touched.description && (
              <p className="flex items-center gap-1.5 mt-1.5 text-xs text-danger ml-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-[#F5F0EB] mb-2 block">Location (Optional)</label>
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-border bg-white/5 focus-within:border-primary/50 transition-all">
              <MapPin className="w-5 h-5 text-muted" />
              <input type="text" placeholder="Enter address or use map pin (coming soon)"
                value={form.location} onChange={(e) => onChange('location', e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#F5F0EB] placeholder:text-muted/60 outline-none" />
            </div>
          </div>

          <motion.button type="submit" disabled={!isValid || loading}
            whileHover={isValid && !loading ? { scale: 1.02 } : {}}
            whileTap={isValid && !loading ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isValid && !loading ? 'bg-primary-gradient text-white shadow-primary-glow hover:shadow-[0_0_30px_rgba(192,32,58,0.6)]' : 'bg-surface-elevated text-muted cursor-not-allowed border border-border'
            }`}>
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Submit Report</>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}