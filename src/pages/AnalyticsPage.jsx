import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, AlertTriangle, Shield, MapPin } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import { IncidentAreaChart, CategoryBarChart, CategoryPieChart, HourlyBarChart } from '../components/analytics/IncidentChart'
import HeatmapLegend from '../components/analytics/HeatmapLegend'

const stats = [
  { title: 'Total Incidents',    value: '1,284', icon: AlertTriangle, color: 'danger',  trend: 1,  trendValue: '+12% this month', delay: 0    },
  { title: 'Resolved Cases',     value: '968',   icon: Shield,        color: 'safe',   trend: 1,  trendValue: '+8%',              delay: 0.05 },
  { title: 'Active Safe Zones',  value: '47',    icon: MapPin,        color: 'blue',   trend: 1,  trendValue: '+5 this week',     delay: 0.1  },
  { title: 'Avg. Response Time', value: '18',    suffix: 'min', icon: TrendingUp, color: 'accent', trend: -1, trendValue: '-3min', delay: 0.15 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#0d0a0b] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[#F5F0EB]">Analytics Dashboard</h1>
          </div>
          <p className="text-[#8a7a7d] text-sm">Visualize safety trends, peak hours, and category breakdowns across your area.</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}
        </div>

        {/* Incident trend + Pie */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-[#F5F0EB] mb-0.5">Incident Trend</h3>
                <p className="text-xs text-[#8a7a7d]">Reports vs. resolved cases over 7 months</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs text-[#8a7a7d]"><span className="w-2.5 h-2.5 rounded-sm bg-primary inline-block"/>Incidents</span>
                <span className="flex items-center gap-1 text-xs text-[#8a7a7d]"><span className="w-2.5 h-2.5 rounded-sm bg-safe inline-block"/>Resolved</span>
              </div>
            </div>
            <IncidentAreaChart />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <h3 className="font-semibold text-[#F5F0EB] mb-1">By Category</h3>
            <p className="text-xs text-[#8a7a7d] mb-4">Distribution of incident types</p>
            <CategoryPieChart />
          </motion.div>
        </div>

        {/* Category bar + Hourly heatmap */}
        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <h3 className="font-semibold text-[#F5F0EB] mb-1">Category Breakdown</h3>
            <p className="text-xs text-[#8a7a7d] mb-5">Total reports per incident type</p>
            <CategoryBarChart />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1c1518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6">
            <h3 className="font-semibold text-[#F5F0EB] mb-1">Peak Hours</h3>
            <p className="text-xs text-[#8a7a7d] mb-2">When incidents are most reported (24h)</p>
            <div className="mb-4"><HeatmapLegend /></div>
            <HourlyBarChart />
          </motion.div>
        </div>

        {/* Insight strip */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-5 p-4 rounded-2xl bg-primary/8 border border-primary/20 flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#F5F0EB] mb-0.5">Key Insight</p>
            <p className="text-sm text-[#8a7a7d] leading-relaxed">
              75% of incidents occur between 8 PM and 2 AM. Harassment is the most frequently reported category
              (34 reports), followed by poor lighting (28 reports) — suggesting infrastructure improvements could
              significantly reduce incidents.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
