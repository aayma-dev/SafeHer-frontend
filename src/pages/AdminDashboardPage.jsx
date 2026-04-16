import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, FileText, Users, CheckCircle, Clock, TrendingUp, BarChart2, Shield } from 'lucide-react'
import AdminSidebar from '../components/admin/AdminSidebar'
import ReportTable from '../components/admin/ReportTable'
import StatCard from '../components/ui/StatCard'
import { IncidentAreaChart } from '../components/analytics/IncidentChart'
import { MOCK_REPORTS } from '../components/reports/ReportFeed'

const ADMIN_STATS = [
  { title: 'Total Reports',  value: '284', icon: FileText,      color: 'primary', delay: 0    },
  { title: 'Pending Review', value: '12',  icon: Clock,         color: 'accent',  delay: 0.05 },
  { title: 'Verified Today', value: '8',   icon: CheckCircle,   color: 'safe',    delay: 0.1  },
  { title: 'Active Users',   value: '1.2K',icon: Users,         color: 'blue',    delay: 0.15 },
]

export default function AdminDashboardPage() {
  const [reports, setReports] = useState(MOCK_REPORTS)
  const [tab, setTab] = useState('all')

  const handleStatusChange = (id, newStatus) => {
    setReports(rs => rs.map(r => r.id === id ? { ...r, status: newStatus } : r))
  }

  const filtered = tab === 'all' ? reports : reports.filter(r => r.status === tab)

  return (
    <div className="min-h-screen bg-[#0d0a0b] flex">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display font-bold text-2xl text-[#F5F0EB] mb-1">Admin Dashboard</h1>
                <p className="text-[#8a7a7d] text-sm">Review reports, manage users and monitor platform health.</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-safe/10 border border-safe/20">
                <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                <span className="text-xs text-safe font-medium">Platform Online</span>
              </div>
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {ADMIN_STATS.map(s => <StatCard key={s.title} {...s} />)}
          </div>

          {/* Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-[#F5F0EB]">Report Activity (Last 7 Months)</h3>
            </div>
            <IncidentAreaChart />
          </motion.div>

          {/* Reports table */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#F5F0EB] flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Reports Queue
              </h3>
              <div className="flex gap-1">
                {['all', 'pending', 'verified', 'resolved'].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      tab === t ? 'bg-primary-gradient text-white' : 'text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5'
                    }`}>{t}</button>
                ))}
              </div>
            </div>
            <ReportTable reports={filtered} onStatusChange={handleStatusChange} />
          </motion.div>

        </div>
      </main>
    </div>
  )
}
