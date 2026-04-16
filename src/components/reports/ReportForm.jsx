import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Upload, X, AlertCircle, CheckCircle, User, EyeOff } from 'lucide-react'
import { INCIDENT_CATEGORIES } from '../../utils/constants'
import { useGeolocation } from '../../hooks/useGeolocation'
import InputField from '../ui/InputField'
import Button from '../ui/Button'

const STEPS = ['Details', 'Location', 'Media']

export default function ReportForm({ onSuccess }) {
  const [step, setStep] = useState(0)
  const [anonymous, setAnonymous] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState({})
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()
  const { location, loading: locLoading, getLocation } = useGeolocation()

  const [form, setForm] = useState({
    title: '', category: '', description: '', latitude: '', longitude: '',
  })

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.title.trim()) e.title = 'Title is required'
      if (!form.category) e.category = 'Please select a category'
      if (!form.description.trim()) e.description = 'Description is required'
    }
    if (step === 1 && !form.latitude && !location) e.location = 'Please set a location'
    setErrors(e)
    return !Object.keys(e).length
  }

  const next = () => { if (validateStep()) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  const handleFile = (e) => {
    const f = e.target.files[0]
    if (f) setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setDone(true)
    onSuccess?.()
  }

  const useMyLocation = () => {
    getLocation()
    if (location) { set('latitude', location.lat.toFixed(6)); set('longitude', location.lng.toFixed(6)) }
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center py-10 gap-4">
        <div className="w-20 h-20 rounded-full bg-safe/15 border-2 border-safe flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-safe"/>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#F5F0EB] mb-1">Report Submitted!</h3>
          <p className="text-[#8a7a7d] text-sm">Your report is under review. Thank you for making our community safer.</p>
        </div>
        <button onClick={() => { setDone(false); setStep(0); setForm({ title:'',category:'',description:'',latitude:'',longitude:'' }) }}
          className="px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-[#8a7a7d] hover:text-[#F5F0EB] text-sm transition-all">
          Submit Another
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < step ? 'bg-safe text-white' : i === step ? 'bg-primary text-white' : 'bg-[#1c1518] border border-[rgba(255,255,255,0.1)] text-[#8a7a7d]'}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? 'text-[#F5F0EB]' : 'text-[#8a7a7d]'}`}>{s}</span>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-safe/50' : 'bg-[rgba(255,255,255,0.07)]'}`}/>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-5">
            {/* Anonymous toggle */}
            <div className="flex items-center justify-between p-4 bg-[#141011] rounded-xl border border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center gap-3">
                {anonymous ? <EyeOff className="w-4 h-4 text-safe"/> : <User className="w-4 h-4 text-[#8a7a7d]"/>}
                <div>
                  <p className="text-sm font-medium text-[#F5F0EB]">{anonymous ? 'Anonymous Report' : 'Named Report'}</p>
                  <p className="text-xs text-[#8a7a7d]">{anonymous ? 'Your identity is hidden' : 'Your username will be shown'}</p>
                </div>
              </div>
              <button onClick={() => setAnonymous(!anonymous)}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${anonymous ? 'bg-safe' : 'bg-[#1c1518] border border-[rgba(255,255,255,0.1)]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${anonymous ? 'left-7' : 'left-1'}`}/>
              </button>
            </div>
            <InputField label="Incident Title" name="title" placeholder="Brief description of what happened"
              value={form.title} onChange={e => set('title', e.target.value)} error={errors.title} required/>
            <div>
              <label className="text-sm font-medium text-[#F5F0EB]/80 mb-1.5 block">Category <span className="text-danger">*</span></label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3 text-sm text-[#F5F0EB] focus:outline-none focus:border-primary/60 transition-colors">
                <option value="">Select a category…</option>
                {INCIDENT_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              {errors.category && <p className="mt-1 text-xs text-danger flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.category}</p>}
            </div>
            <InputField as="textarea" rows={4} label="Description" name="description"
              placeholder="What happened? Include time, specific location details, any relevant info…"
              value={form.description} onChange={e => set('description', e.target.value)} error={errors.description} required/>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-4">
            <p className="text-[#8a7a7d] text-sm">Drop a pin on the location where the incident occurred.</p>
            <Button onClick={useMyLocation} variant="ghost" icon={MapPin} loading={locLoading} fullWidth>
              Use My Current Location
            </Button>
            {(location || form.latitude) && (
              <div className="p-3 bg-safe/10 border border-safe/20 rounded-xl text-xs text-safe flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0"/>
                Location set: {form.latitude || location?.lat?.toFixed(5)}, {form.longitude || location?.lng?.toFixed(5)}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Latitude" name="latitude" placeholder="e.g. 31.5204"
                value={form.latitude} onChange={e => set('latitude', e.target.value)}/>
              <InputField label="Longitude" name="longitude" placeholder="e.g. 74.3587"
                value={form.longitude} onChange={e => set('longitude', e.target.value)}/>
            </div>
            {errors.location && <p className="text-xs text-danger flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/>{errors.location}</p>}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="space-y-4">
            <p className="text-[#8a7a7d] text-sm">Optionally add a photo to support your report. This helps moderators verify quickly.</p>
            <div onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[rgba(255,255,255,0.1)] hover:border-primary/40 rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all group">
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Preview" className="h-40 rounded-xl object-cover"/>
                  <button onClick={e => { e.stopPropagation(); setPreview(null) }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-danger text-white flex items-center justify-center">
                    <X className="w-3 h-3"/>
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-[#8a7a7d] group-hover:text-primary transition-colors"/>
                  <p className="text-sm text-[#8a7a7d] text-center">Click to upload photo <br/><span className="text-xs">PNG, JPG up to 5MB</span></p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)]">
        {step > 0
          ? <Button variant="ghost" onClick={back}>Back</Button>
          : <div/>}
        {step < STEPS.length - 1
          ? <Button onClick={next}>Continue</Button>
          : <Button onClick={handleSubmit} loading={submitting}>Submit Report</Button>}
      </div>
    </div>
  )
}
