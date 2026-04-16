export const INCIDENT_CATEGORIES = [
  { value: 'harassment', label: 'Harassment', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { value: 'assault', label: 'Assault', color: 'text-red-400', bg: 'bg-red-400/10' },
  { value: 'theft', label: 'Theft/Robbery', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { value: 'stalking', label: 'Stalking', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { value: 'unsafe_area', label: 'Unsafe Area', color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { value: 'lighting', label: 'Poor Lighting', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { value: 'other', label: 'Other', color: 'text-gray-400', bg: 'bg-gray-400/10' },
]

export const REPORT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { value: 'verified', label: 'Verified', color: 'text-green-400', bg: 'bg-green-400/10' },
  { value: 'resolved', label: 'Resolved', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { value: 'rejected', label: 'Rejected', color: 'text-red-400', bg: 'bg-red-400/10' },
]

export const TIME_RANGES = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 3 Months' },
]

export const DEFAULT_MAP_CENTER = [31.5204, 74.3587] // Lahore
export const DEFAULT_MAP_ZOOM = 13

export const EMERGENCY_CONTACTS = [
  { name: 'Pakistan Emergency', number: '1122', type: 'emergency' },
  { name: 'Police', number: '15', type: 'police' },
  { name: 'Women Helpline', number: '1043', type: 'helpline' },
]