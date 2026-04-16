import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, MessageSquare, ChevronRight, ImageOff } from 'lucide-react'
import { CategoryBadge, StatusBadge } from '../ui/Badge'
import { timeAgo, truncate } from '../../utils/formatters'

export default function ReportCard({ report, index = 0 }) {
  const { id, title, description, category, status, created_at, image_url, _count } = report

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      style={{ color: '#F5F0EB' }}
      className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden
                 hover:border-primary/30 hover:shadow-[0_0_24px_rgba(192,32,58,0.18)]
                 transition-all duration-300 group"
    >
      {/* Image area */}
      {image_url ? (
        <div className="h-40 bg-[#141011] overflow-hidden relative">
          <img
            src={image_url} alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1518] via-transparent to-transparent" />
        </div>
      ) : (
        /* ✅ FIX: placeholder was nearly invisible — now has visible pattern */
        <div className="h-28 relative overflow-hidden flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(192,32,58,0.12) 0%, rgba(20,16,17,0.9) 100%)' }}>
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0px,transparent 1px,transparent 28px,rgba(255,255,255,0.04) 29px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0px,transparent 1px,transparent 28px,rgba(255,255,255,0.04) 29px)'
            }}
          />
          <div className="relative flex flex-col items-center gap-1.5">
            <ImageOff className="w-6 h-6" style={{ color: 'rgba(192,32,58,0.5)' }} />
            <span className="text-xs font-medium" style={{ color: 'rgba(245,240,235,0.3)' }}>No image</span>
          </div>
          {/* Category color accent bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      )}

      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <CategoryBadge category={category} />
          <StatusBadge status={status} />
        </div>

        {/* ✅ FIX: explicit inline style so no Tailwind purge / inheritance issue */}
        <h3
          style={{ color: '#F5F0EB' }}
          className="font-semibold text-base mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2"
        >
          {title}
        </h3>

        {description && (
          <p style={{ color: '#8a7a7d' }} className="text-sm leading-relaxed mb-4">
            {truncate(description, 90)}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 text-xs" style={{ color: '#8a7a7d' }}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {timeAgo(created_at)}
            </span>
            {_count?.comments > 0 && (
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />
                {_count.comments}
              </span>
            )}
          </div>
          <Link
            to={`/reports/${id}`}
            className="flex items-center gap-1 text-xs font-semibold hover:gap-2 transition-all duration-200"
            style={{ color: '#c0203a' }}
          >
            View <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}