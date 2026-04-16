import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Eye, ChevronUp, ChevronDown, Clock } from 'lucide-react'
import { CategoryBadge, StatusBadge } from '../ui/Badge'
import { formatDateTime, truncate } from '../../utils/formatters'
import { Link } from 'react-router-dom'

export default function ReportTable({ reports = [], onStatusChange, loading = false }) {
  const [sortKey, setSortKey] = useState('created_at')
  const [sortDir, setSortDir] = useState('desc')

  const sort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const sorted = [...reports].sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey]
    if (typeof av === 'string')
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const SortIcon = ({ k }) =>
    sortKey === k
      ? sortDir === 'asc'
        ? <ChevronUp className="w-3 h-3" />
        : <ChevronDown className="w-3 h-3" />
      : <ChevronUp className="w-3 h-3 opacity-20" />

  const cols = [
    { key: 'title', label: 'Report' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Date' },
  ]

  return (
    <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          {/* TABLE HEADER */}
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              {cols.map((c) => (
                <th
                  key={c.key}
                  onClick={() => sort(c.key)}
                  className="px-4 py-3.5 text-left text-xs font-semibold text-[#8a7a7d] uppercase tracking-wider cursor-pointer hover:text-[#F5F0EB] transition-colors"
                >
                  <span className="flex items-center gap-1">
                    {c.label} <SortIcon k={c.key} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3.5 text-right text-xs font-semibold text-[#8a7a7d] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
            
            {/* ✅ LOADING STATE FIX */}
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-[#8a7a7d] text-sm">
                  Loading reports...
                </td>
              </tr>
            )}

            {!loading && sorted.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-4 py-3.5 max-w-xs">
                  <p className="font-medium text-[#F5F0EB] truncate">
                    {truncate(r.title, 45)}
                  </p>
                  {r.is_anonymous && (
                    <span className="text-xs text-[#8a7a7d]">Anonymous</span>
                  )}
                </td>

                <td className="px-4 py-3.5">
                  <CategoryBadge category={r.category} />
                </td>

                <td className="px-4 py-3.5">
                  <StatusBadge status={r.status} />
                </td>

                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-1 text-xs text-[#8a7a7d] whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    {formatDateTime(r.created_at)}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/reports/${r.id}`}
                      className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>

                    {r.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onStatusChange?.(r.id, 'verified')}
                          className="w-7 h-7 rounded-lg bg-safe/10 flex items-center justify-center text-safe hover:bg-safe/20 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onStatusChange?.(r.id, 'rejected')}
                          className="w-7 h-7 rounded-lg bg-danger/10 flex items-center justify-center text-danger hover:bg-danger/20 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}

            {/* EMPTY STATE */}
            {!loading && !sorted.length && (
              <tr>
                <td colSpan={5} className="text-center py-12 text-[#8a7a7d] text-sm">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}