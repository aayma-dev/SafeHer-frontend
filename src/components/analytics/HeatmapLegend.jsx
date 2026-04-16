export default function HeatmapLegend() {
  const levels = [
    { label: 'Very Low',  color: 'bg-blue-400/60' },
    { label: 'Low',       color: 'bg-yellow-400/60' },
    { label: 'Moderate',  color: 'bg-orange-400/60' },
    { label: 'High',      color: 'bg-red-500/60' },
    { label: 'Critical',  color: 'bg-danger' },
  ]
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-xs text-[#8a7a7d] font-medium">Risk Level:</span>
      {levels.map(({ label, color }) => (
        <span key={label} className="flex items-center gap-1.5 text-xs text-[#8a7a7d]">
          <span className={`w-3 h-3 rounded-sm ${color} inline-block`} />
          {label}
        </span>
      ))}
    </div>
  )
}