import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

const icons = {
  success: { Icon: CheckCircle, className: 'text-safe' },
  error: { Icon: XCircle, className: 'text-danger' },
  warning: { Icon: AlertCircle, className: 'text-yellow-400' },
  info: { Icon: Info, className: 'text-blue-400' },
}

export function InlineToast({ message, type = 'info', onDismiss, className = '' }) {
  if (!message) return null
  const { Icon, className: iconClass } = icons[type] || icons.info

  const bgMap = {
    success: 'bg-safe/10 border-safe/20',
    error: 'bg-danger/10 border-danger/20',
    warning: 'bg-yellow-400/10 border-yellow-400/20',
    info: 'bg-blue-400/10 border-blue-400/20',
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        className={clsx(
          'flex items-start gap-3 p-3.5 rounded-xl border text-sm',
          bgMap[type],
          className
        )}
      >
        <Icon className={clsx('w-4 h-4 flex-shrink-0 mt-0.5', iconClass)} />
        <p className="flex-1 text-[#F5F0EB]/90 leading-relaxed">{message}</p>
        {onDismiss && (
          <button onClick={onDismiss} className="text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default InlineToast