import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

const variants = {
  primary: 'bg-primary-gradient text-white shadow-primary-glow hover:shadow-[0_0_30px_rgba(192,32,58,0.55)]',
  ghost: 'glass border border-[rgba(255,255,255,0.08)] text-[#F5F0EB] hover:border-white/20',
  danger: 'bg-danger/10 border border-danger/30 text-danger hover:bg-danger hover:text-white',
  safe: 'bg-safe/10 border border-safe/30 text-safe hover:bg-safe hover:text-white',
  outline: 'border border-[rgba(255,255,255,0.15)] text-[#F5F0EB] hover:bg-white/5',
}

const sizes = {
  sm: 'px-4 py-2 text-xs rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-2xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  )
}