import { Search, Filter, X } from 'lucide-react'
import { INCIDENT_CATEGORIES, REPORT_STATUSES, TIME_RANGES } from '../../utils/constants'

export default function ReportFilters({ filters, onChange, onClear }) {
  const hasActive = Object.values(filters).some(Boolean)
  return (
    <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7a7d]"/>
        <input
          type="text" placeholder="Search reports…"
          value={filters.search || ''}
          onChange={e => onChange({ search: e.target.value })}
          className="w-full bg-[#141011] border border-[rgba(255,255,255,0.06)] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F5F0EB] placeholder-[#8a7a7d] focus:outline-none focus:border-primary/40 transition-colors"
        />
      </div>

      {/* Category */}
      <select value={filters.category || ''} onChange={e => onChange({ category: e.target.value })}
        className="bg-[#141011] border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2.5 text-sm text-[#8a7a7d] focus:outline-none focus:border-primary/40 transition-colors cursor-pointer">
        <option value="">All Categories</option>
        {INCIDENT_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
      </select>

      {/* Status */}
      <select value={filters.status || ''} onChange={e => onChange({ status: e.target.value })}
        className="bg-[#141011] border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2.5 text-sm text-[#8a7a7d] focus:outline-none focus:border-primary/40 transition-colors cursor-pointer">
        <option value="">All Statuses</option>
        {REPORT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>

      {/* Date range */}
      <select value={filters.dateRange || ''} onChange={e => onChange({ dateRange: e.target.value })}
        className="bg-[#141011] border border-[rgba(255,255,255,0.06)] rounded-xl px-3 py-2.5 text-sm text-[#8a7a7d] focus:outline-none focus:border-primary/40 transition-colors cursor-pointer">
        <option value="">All Time</option>
        {TIME_RANGES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
      </select>

      {hasActive && (
        <button onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs text-danger border border-danger/20 hover:bg-danger/10 transition-all">
          <X className="w-3.5 h-3.5"/> Clear
        </button>
      )}
    </div>
  )
}
