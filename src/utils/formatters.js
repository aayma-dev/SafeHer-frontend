import { format, formatDistanceToNow, parseISO } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return '—'
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MMM d, yyyy')
}

export const formatTime = (date) => {
  if (!date) return '—'
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'h:mm a')
}

export const formatDateTime = (date) => {
  if (!date) return '—'
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'MMM d, yyyy · h:mm a')
}

export const timeAgo = (date) => {
  if (!date) return '—'
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export const truncate = (str, max = 100) => {
  if (!str) return ''
  return str.length > max ? str.slice(0, max) + '…' : str
}

export const formatCoords = (lat, lng) =>
  `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : ''