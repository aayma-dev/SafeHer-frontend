import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Clock, User, MessageSquare, Send, Download, Flag } from 'lucide-react'
import { CategoryBadge, StatusBadge } from '../components/ui/Badge'
import { timeAgo, formatDateTime } from '../utils/formatters'
import { MOCK_REPORTS } from '../components/reports/ReportFeed'
import { useState } from 'react'

export default function ReportDetailPage() {
  const { id } = useParams()
  const report = MOCK_REPORTS.find(r => r.id === id) || MOCK_REPORTS[0]
  const [comment, setComment] = useState('')

  // ✅ FIX: Lazy initialization (NO impure call during render)
  const [comments, setComments] = useState(() => [
    {
      id: 1,
      user: 'SafeBot',
      text: 'This area has had 3 similar reports this week. Authorities have been notified.',
      time: new Date(Date.now() - 1800000),
    },
    {
      id: 2,
      user: 'Nighban_Hira',
      text: 'I saw this too. The street lights near that stretch have been broken for months.',
      time: new Date(Date.now() - 3600000),
    },
  ])

  const addComment = () => {
    if (!comment.trim()) return
    setComments(c => [
      ...c,
      { id: Date.now(), user: 'You', text: comment, time: new Date() }
    ])
    setComment('')
  }

  return (
    <div className="min-h-screen bg-[#0d0a0b] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back */}
        <Link to="/reports" className="inline-flex items-center gap-2 text-sm text-[#8a7a7d] hover:text-[#F5F0EB] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4"/> Back to Reports
        </Link>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          {/* Header card */}
          <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-7 mb-5">
            <div className="flex flex-wrap gap-2 mb-4">
              <CategoryBadge category={report.category}/>
              <StatusBadge status={report.status}/>
            </div>
            <h1 className="font-display font-bold text-2xl text-[#F5F0EB] mb-4 leading-snug">{report.title}</h1>
            <div className="flex flex-wrap gap-5 text-sm text-[#8a7a7d] mb-6">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/>{formatDateTime(report.created_at)}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4"/>Anonymous Reporter</span>
              {report.lat && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4"/>
                  {report.lat?.toFixed(4)}, {report.lng?.toFixed(4)}
                </span>
              )}
            </div>
            <p className="text-[#F5F0EB]/80 leading-relaxed text-base">{report.description}</p>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-[rgba(255,255,255,0.07)]">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] text-[#8a7a7d] hover:text-[#F5F0EB] text-xs transition-all">
                <Download className="w-3.5 h-3.5"/> Export PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.08)] text-[#8a7a7d] hover:text-danger text-xs transition-all">
                <Flag className="w-3.5 h-3.5"/> Report Issue
              </button>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <h3 className="font-semibold text-[#F5F0EB] mb-5 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary"/> Community Updates ({comments.length})
            </h3>

            <div className="space-y-4 mb-6">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                    {c.user[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[#F5F0EB]">{c.user}</span>
                      <span className="text-xs text-[#8a7a7d]">{timeAgo(c.time)}</span>
                    </div>
                    <p className="text-sm text-[#F5F0EB]/80 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addComment()}
                placeholder="Add context or confirm this report…"
                className="flex-1 bg-[#141011] border border-[rgba(255,255,255,0.07)] rounded-xl px-4 py-2.5 text-sm text-[#F5F0EB] placeholder-[#8a7a7d] focus:outline-none focus:border-primary/40 transition-colors"
              />
              <motion.button
                onClick={addComment}
                whileTap={{ scale:0.95 }}
                disabled={!comment.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  comment.trim()
                    ? 'bg-primary-gradient text-white shadow-primary-glow'
                    : 'bg-[#141011] border border-[rgba(255,255,255,0.07)] text-[#8a7a7d]'
                }`}
              >
                <Send className="w-4 h-4"/>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}