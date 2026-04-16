import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

// 🎨 Colors
const COLORS = [
  '#c0203a',
  '#e8956d',
  '#60a5fa',
  '#a855f7',
  '#eab308',
  '#22c55e',
  '#8a7a7d',
]

// ✅ Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-[#1c1518] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 shadow-card">
      {label && (
        <p className="text-xs text-[#8a7a7d] mb-1">{label}</p>
      )}
      {payload.map((p, i) => (
        <p
          key={i}
          className="text-sm font-semibold"
          style={{ color: p.color }}
        >
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

// =========================
// AREA CHART
// =========================
export function IncidentAreaChart({ data = [] }) {
  const mock = data.length
    ? data
    : [
        { month: 'Jan', incidents: 12, resolved: 9 },
        { month: 'Feb', incidents: 19, resolved: 14 },
        { month: 'Mar', incidents: 15, resolved: 13 },
        { month: 'Apr', incidents: 28, resolved: 20 },
        { month: 'May', incidents: 22, resolved: 18 },
        { month: 'Jun', incidents: 31, resolved: 24 },
        { month: 'Jul', incidents: 25, resolved: 22 },
      ]

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={mock}>
        <defs>
          <linearGradient id="gradIncident" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c0203a" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#c0203a" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="gradResolved" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />

        <XAxis
          dataKey="month"
          tick={{ fill: '#8a7a7d', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: '#8a7a7d', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ color: '#8a7a7d', fontSize: 12 }} />

        <Area
          type="monotone"
          dataKey="incidents"
          name="Incidents"
          stroke="#c0203a"
          strokeWidth={2}
          fill="url(#gradIncident)"
        />

        <Area
          type="monotone"
          dataKey="resolved"
          name="Resolved"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#gradResolved)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// =========================
// CATEGORY BAR CHART
// =========================
export function CategoryBarChart({ data = [] }) {
  const mock = data.length
    ? data
    : [
        { category: 'Harassment', count: 34 },
        { category: 'Stalking', count: 21 },
        { category: 'Theft', count: 18 },
        { category: 'Assault', count: 12 },
        { category: 'Lighting', count: 28 },
        { category: 'Other', count: 9 },
      ]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={mock} barSize={28}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.06)"
          vertical={false}
        />

        <XAxis
          dataKey="category"
          tick={{ fill: '#8a7a7d', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: '#8a7a7d', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="count" name="Reports" radius={[6, 6, 0, 0]}>
          {mock.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// =========================
// PIE CHART
// =========================
export function CategoryPieChart({ data = [] }) {
  const mock = data.length
    ? data
    : [
        { name: 'Harassment', value: 34 },
        { name: 'Stalking', value: 21 },
        { name: 'Theft', value: 18 },
        { name: 'Assault', value: 12 },
        { name: 'Poor Lighting', value: 28 },
        { name: 'Other', value: 9 },
      ]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={mock}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {mock.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ color: '#8a7a7d', fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

// =========================
// HOURLY BAR CHART (FIXED)
// =========================
export function HourlyBarChart({ data = [] }) {
  // ✅ fully static (no Math.random, no ref, no hooks)
  const STATIC_DATA = [
    { hour: '0:00', count: 12 },
    { hour: '1:00', count: 14 },
    { hour: '2:00', count: 15 },
    { hour: '3:00', count: 13 },
    { hour: '4:00', count: 11 },
    { hour: '5:00', count: 10 },
    { hour: '6:00', count: 5 },
    { hour: '7:00', count: 4 },
    { hour: '8:00', count: 6 },
    { hour: '9:00', count: 7 },
    { hour: '10:00', count: 8 },
    { hour: '11:00', count: 9 },
    { hour: '12:00', count: 10 },
    { hour: '13:00', count: 11 },
    { hour: '14:00', count: 9 },
    { hour: '15:00', count: 8 },
    { hour: '16:00', count: 7 },
    { hour: '17:00', count: 6 },
    { hour: '18:00', count: 8 },
    { hour: '19:00', count: 10 },
    { hour: '20:00', count: 14 },
    { hour: '21:00', count: 16 },
    { hour: '22:00', count: 15 },
    { hour: '23:00', count: 13 },
  ]

  const chartData = data.length ? data : STATIC_DATA

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} barSize={10}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.06)"
          vertical={false}
        />

        <XAxis
          dataKey="hour"
          tick={{ fill: '#8a7a7d', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval={3}
        />

        <YAxis hide />

        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="count" name="Incidents" radius={[4, 4, 0, 0]}>
          {chartData.map((d, i) => (
            <Cell
              key={i}
              fill={
                d.count > 12
                  ? '#c0203a'
                  : d.count > 7
                  ? '#e8956d'
                  : '#60a5fa'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// default export
export default IncidentAreaChart