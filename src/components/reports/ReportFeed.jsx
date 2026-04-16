import { motion } from 'framer-motion'
import ReportCard from './ReportCard'
import { Spinner } from '../ui/Loader'
import { FileText } from 'lucide-react'
import { MOCK_REPORTS } from '../../data/mockReports' 

// This line allows other files to import { MOCK_REPORTS } from this file
export { MOCK_REPORTS }; 

export default function ReportFeed({ reports, loading = false, emptyMessage = 'No reports found.' }) {
  const data = reports ?? MOCK_REPORTS

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#1c1518] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4">
          <FileText className="w-7 h-7 text-[#8a7a7d]" />
        </div>
        <p className="text-[#F5F0EB] font-medium mb-1">{emptyMessage}</p>
        <p className="text-[#8a7a7d] text-sm">
          Try adjusting your filters or check back later.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((r, i) => (
        <ReportCard key={r.id} report={r} index={i} />
      ))}
    </div>
  )
}