import { useState } from 'react'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

export default function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  hint,
  as = 'input',
  rows = 4,
}) {
  const [showPwd, setShowPwd] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPwd ? 'text' : 'password') : type

  const baseClass = clsx(
    'w-full bg-[#1c1518] border rounded-xl px-4 py-3 text-[#F5F0EB] placeholder-[#8a7a7d] text-sm',
    'transition-all duration-300 focus:outline-none',
    Icon ? 'pl-11' : '',
    isPassword ? 'pr-11' : '',
    error
      ? 'border-danger/60 ring-1 ring-danger/30'
      : 'border-[rgba(255,255,255,0.08)] focus:border-primary/60 focus:ring-1 focus:ring-primary/30',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#F5F0EB]/80">
          {label}{required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon className={clsx(
            'absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4',
            error ? 'text-danger' : 'text-[#8a7a7d]'
          )} />
        )}

        {as === 'textarea' ? (
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            rows={rows}
            className={clsx(baseClass, 'resize-none')}
          />
        ) : (
          <input
            name={name}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={baseClass}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors"
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-danger">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-[#8a7a7d]">{hint}</p>
      )}
    </div>
  )
}