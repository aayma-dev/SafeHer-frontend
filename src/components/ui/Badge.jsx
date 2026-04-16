// Badge.jsx
import { clsx } from 'clsx'

const presets = {
  primary: 'bg-primary/15 text-primary border-primary/25',
  accent: 'bg-accent/15 text-accent border-accent/25',
  safe: 'bg-safe/15 text-safe border-safe/25',
  danger: 'bg-danger/15 text-danger border-danger/25',
  warning: 'bg-yellow-400/15 text-yellow-400 border-yellow-400/25',
  muted: 'bg-white/5 text-[#8a7a7d] border-white/10',
  blue: 'bg-blue-400/15 text-blue-400 border-blue-400/25',
  purple: 'bg-purple-400/15 text-purple-400 border-purple-400/25',
}

export function Badge({ children, variant = 'muted', className = '', dot = false }) {
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
      presets[variant] || presets.muted,
      className
    )}>
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', `bg-current`)} />}
      {children}
    </span>
  )
}

export function StatusBadge({ status }) {
  const map = {
    pending: { variant: 'warning', label: 'Pending' },
    verified: { variant: 'safe', label: 'Verified' },
    resolved: { variant: 'blue', label: 'Resolved' },
    rejected: { variant: 'danger', label: 'Rejected' },
  }
  const { variant, label } = map[status] || { variant: 'muted', label: status }
  return <Badge variant={variant} dot>{label}</Badge>
}

export function CategoryBadge({ category }) {
  const map = {
    harassment: { variant: 'warning', label: 'Harassment' },
    assault: { variant: 'danger', label: 'Assault' },
    theft: { variant: 'accent', label: 'Theft' },
    stalking: { variant: 'purple', label: 'Stalking' },
    unsafe_area: { variant: 'primary', label: 'Unsafe Area' },
    lighting: { variant: 'blue', label: 'Poor Lighting' },
    other: { variant: 'muted', label: 'Other' },
  }
  const { variant, label } = map[category] || { variant: 'muted', label: category }
  return <Badge variant={variant}>{label}</Badge>
}