import { motion } from 'framer-motion'
import { LocateFixed, Layers, Filter } from 'lucide-react'

export default function MapControls({
  onLocate,
  onToggleHeatmap,
  showHeatmap,
  onFilterToggle,
}) {
  const controls = [
    { icon: LocateFixed, onClick: onLocate, title: 'My Location', active: false },
    { icon: Layers, onClick: onToggleHeatmap, title: 'Toggle Heatmap', active: showHeatmap },
    { icon: Filter, onClick: onFilterToggle, title: 'Filters', active: false },
  ]

  return (
    <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2">
      {controls.map((item) => (
        <motion.button
          key={item.title}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={item.onClick}
          title={item.title}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-card transition-all duration-200 border ${
            item.active
              ? 'bg-primary text-white border-primary/50 shadow-primary-glow'
              : 'bg-[#1c1518] text-[#8a7a7d] border-[rgba(255,255,255,0.08)] hover:text-[#F5F0EB] hover:border-primary/30'
          }`}
        >
          <item.icon className="w-4 h-4" />
        </motion.button>
      ))}
    </div>
  )
}