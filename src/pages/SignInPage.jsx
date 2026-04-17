import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Shield, ArrowRight } from 'lucide-react' 
import InputField from '../components/ui/InputField'
import { InlineToast } from '../components/ui/Toast'
import { useAuthStore } from '../store/authstore'
import { authService } from '../services/authService'
import { validators } from '../utils/validators'

export default function SignInPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (k) => (e) => {
    setValues(v => ({ ...v, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: '' }))
    setServerError('')
  }

  const validate = () => {
    const e = {
      email: validators.email(values.email),
      password: validators.required(values.password),
    }
    const filtered = Object.fromEntries(Object.entries(e).filter(([,v]) => v))
    setErrors(filtered)
    return !Object.keys(filtered).length
  }

  const isReady = values.email && values.password && !Object.values(errors).some(Boolean)

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // FIXED: Mapping 'email' from your form to 'username' for the backend
      const loginPayload = {
        email: values.email, 
        password: values.password
      }
      
      const { data } = await authService.login(loginPayload)
      setUser(data.user, data.access_token)
      navigate('/')
    } catch (err) {
      const errorDetail = err.response?.data?.detail;
      let displayMessage = 'Invalid email or password.';

      if (typeof errorDetail === 'string') {
        displayMessage = errorDetail;
      } else if (Array.isArray(errorDetail)) {
        displayMessage = errorDetail[0]?.msg || displayMessage;
      }
      
      setServerError(displayMessage)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-[#0d0a0b] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(192,32,58,0.15),transparent)]"/>
      <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-primary/8 blur-3xl"/>
      <div className="absolute bottom-20 right-1/4 w-56 h-56 rounded-full bg-accent/6 blur-3xl"/>

      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        className="relative w-full max-w-md">

        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow">
              <Shield className="w-6 h-6 text-white"/>
            </div>
            <span className="font-display font-bold text-2xl text-[#F5F0EB]">Safe<span className="gradient-text">Her</span></span>
          </Link>
        </div>

        <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 shadow-card">
          <div className="text-center mb-8">
            <h1 className="font-display font-bold text-2xl text-[#F5F0EB] mb-1">Welcome back</h1>
            <p className="text-[#8a7a7d] text-sm">Sign in to your SafeHer account</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-[rgba(255,255,255,0.1)] bg-white/[0.03] hover:bg-white/[0.06] text-[#F5F0EB] text-sm font-medium transition-all mb-6 group">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]"/>
            <span className="text-xs text-[#8a7a7d]">or</span>
            <div className="flex-1 h-px bg-[rgba(255,255,255,0.07)]"/>
          </div>

          {serverError && <div className="mb-5"><InlineToast message={serverError} type="error" onDismiss={() => setServerError('')}/></div>}

          <div className="space-y-4">
            <InputField label="Email Address" name="email" type="email" placeholder="your@email.com"
              icon={Mail} value={values.email} onChange={set('email')} error={errors.email} required/>
            <InputField label="Password" name="password" type="password" placeholder="Your password"
              icon={Lock} value={values.password} onChange={set('password')} error={errors.password} required/>
          </div>

          <motion.button
            onClick={handleSubmit} disabled={!isReady || loading}
            whileHover={isReady ? { scale: 1.02 } : {}} whileTap={isReady ? { scale: 0.98 } : {}}
            className={`w-full mt-6 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isReady && !loading
                ? 'bg-primary-gradient text-white shadow-primary-glow hover:shadow-[0_0_30px_rgba(192,32,58,0.55)]'
                : 'bg-[#1c1518] text-[#8a7a7d] border border-[rgba(255,255,255,0.06)] cursor-not-allowed'
            }`}>
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <>Sign In <ArrowRight className="w-4 h-4"/></>}
          </motion.button>

          <p className="text-center text-sm text-[#8a7a7d] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-accent transition-colors font-medium">Create Account</Link>
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors">
              ← Back to SafeHer
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}