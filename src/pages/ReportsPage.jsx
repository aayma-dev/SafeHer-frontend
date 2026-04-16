import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FileText, Plus } from 'lucide-react'
import ReportFeed, { MOCK_REPORTS } from '../components/reports/ReportFeed'
import ReportFilters from '../components/reports/ReportFilters'

export default function ReportsPage() {
  const [filters, setFilters] = useState({ category:'', status:'', dateRange:'', search:'' })

  const updateFilter = (patch) => setFilters(f => ({ ...f, ...patch }))
  const clearFilters = () => setFilters({ category:'', status:'', dateRange:'', search:'' })

  const filtered = MOCK_REPORTS.filter(r => {
    if (filters.category && r.category !== filters.category) return false
    if (filters.status   && r.status   !== filters.status)   return false
    if (filters.search   && !r.title.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#0d0a0b] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary"/>
              </div>
              <h1 className="font-display font-bold text-2xl text-[#F5F0EB]">Incident Reports</h1>
            </div>
            <p className="text-[#8a7a7d] text-sm">Community-submitted safety reports. Browse, filter, and stay informed.</p>
          </div>
          <Link to="/submit-report">
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-primary-glow">
              <Plus className="w-4 h-4"/> Submit Report
            </motion.button>
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }} className="mb-6">
          <ReportFilters filters={filters} onChange={updateFilter} onClear={clearFilters}/>
        </motion.div>

        {/* Result count */}
        <p className="text-sm text-[#8a7a7d] mb-5">
          Showing <span className="text-[#F5F0EB] font-medium">{filtered.length}</span> report{filtered.length !== 1 ? 's' : ''}
        </p>

        <ReportFeed reports={filtered}/>
      </div>
    </div>
  )
}
