import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import { motion } from 'framer-motion'
import { MapPin, Shield, Clock, Tag } from 'lucide-react'
import { createIncidentIcon, createSafeZoneIcon, createUserIcon } from './MapMarker'
import MapControls from './MapControls'
import { useGeolocation } from '../../hooks/useGeolocation'
import { StatusBadge, CategoryBadge } from '../ui/Badge'
import { timeAgo } from '../../utils/formatters'

const DEFAULT_CENTER = [
  parseFloat(import.meta.env.VITE_MAP_DEFAULT_LAT || '31.5204'),
  parseFloat(import.meta.env.VITE_MAP_DEFAULT_LNG || '74.3587'),
]
const DEFAULT_ZOOM = parseInt(import.meta.env.VITE_MAP_DEFAULT_ZOOM || '13')

// Sample mock data so the map is never empty
const MOCK_REPORTS = [
  { id:1, lat:31.5204, lng:74.3587, category:'harassment', title:'Street harassment near canal', status:'verified', created_at: new Date(Date.now()-3600000).toISOString() },
  { id:2, lat:31.5294, lng:74.3487, category:'theft',      title:'Bag snatching reported',       status:'pending',  created_at: new Date(Date.now()-7200000).toISOString() },
  { id:3, lat:31.5104, lng:74.3687, category:'lighting',   title:'Very dark street, no lights',  status:'verified', created_at: new Date(Date.now()-10800000).toISOString() },
  { id:4, lat:31.5354, lng:74.3757, category:'stalking',   title:'Being followed from market',   status:'verified', created_at: new Date(Date.now()-1800000).toISOString() },
]
const MOCK_SAFE_ZONES = [
  { id:1, lat:31.5244, lng:74.3527, name:'Liberty Market (Well Lit)' },
  { id:2, lat:31.5174, lng:74.3617, name:'DHA Phase 5 Park' },
]

// Sub-component to fly to user location
function FlyTo({ coords }) {
  const map = useMap()
  useEffect(() => { if (coords) map.flyTo([coords.lat, coords.lng], 15, { duration: 1.5 }) }, [coords, map])
  return null
}

export default function SafetyMap({ reports = MOCK_REPORTS, safeZones = MOCK_SAFE_ZONES, height = '600px' }) {
  const [showHeatmap, setShowHeatmap]   = useState(true)
  const [showFilters, setShowFilters]   = useState(false)
  const [filterCat,   setFilterCat]     = useState('')
  const { location, getLocation }       = useGeolocation()

  const filtered = filterCat ? reports.filter(r => r.category === filterCat) : reports

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-card" style={{ height }}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%', background: '#0d0a0b' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {location && (
          <>
            <Marker position={[location.lat, location.lng]} icon={createUserIcon()}>
              <Popup className="safeher-popup">
                <div className="text-xs font-semibold text-[#F5F0EB]">📍 You are here</div>
              </Popup>
            </Marker>
            <Circle center={[location.lat, location.lng]} radius={2000}
              pathOptions={{ color: '#c0203a', fillColor: '#c0203a', fillOpacity: 0.06, weight: 1, dashArray: '6' }} />
            <FlyTo coords={location} />
          </>
        )}

        {showHeatmap && filtered.map(report => (
          <Marker key={report.id} position={[report.lat, report.lng]} icon={createIncidentIcon(report.category)}>
            <Popup className="safeher-popup" maxWidth={260}>
              <div className="bg-[#1c1518] rounded-xl p-3 min-w-[200px]">
                <p className="text-sm font-semibold text-[#F5F0EB] mb-2 leading-snug">{report.title}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <CategoryBadge category={report.category} />
                  <StatusBadge status={report.status} />
                </div>
                <p className="text-xs text-[#8a7a7d] flex items-center gap-1">
                  <Clock className="w-3 h-3" />{timeAgo(report.created_at)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {safeZones.map(zone => (
          <Marker key={zone.id} position={[zone.lat, zone.lng]} icon={createSafeZoneIcon()}>
            <Popup className="safeher-popup">
              <div className="bg-[#1c1518] rounded-xl p-3">
                <p className="text-sm font-semibold text-safe flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />{zone.name}
                </p>
                <p className="text-xs text-[#8a7a7d] mt-1">Verified Safe Zone</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <MapControls
        onLocate={getLocation}
        onToggleHeatmap={() => setShowHeatmap(h => !h)}
        showHeatmap={showHeatmap}
        onFilterToggle={() => setShowFilters(f => !f)}
      />

      {/* Filter panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-4 right-16 z-[999] bg-[#1c1518] border border-[rgba(255,255,255,0.1)] rounded-xl p-3 shadow-card min-w-[160px]"
        >
          <p className="text-xs font-semibold text-[#8a7a7d] mb-2 uppercase tracking-wider">Filter by Type</p>
          {['', 'harassment', 'assault', 'theft', 'stalking', 'lighting'].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`w-full text-left px-2 py-1.5 rounded-lg text-xs capitalize transition-all mb-0.5 ${
                filterCat === cat ? 'bg-primary/20 text-primary' : 'text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5'}`}>
              {cat || 'All types'}
            </button>
          ))}
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[999] bg-[#1c1518]/90 backdrop-blur-sm border border-[rgba(255,255,255,0.08)] rounded-xl px-3 py-2 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-[#8a7a7d]"><span className="w-2.5 h-2.5 rounded-full bg-danger inline-block"/>Incident</span>
        <span className="flex items-center gap-1.5 text-xs text-[#8a7a7d]"><span className="w-2.5 h-2.5 rounded-full bg-safe inline-block"/>Safe Zone</span>
        <span className="flex items-center gap-1.5 text-xs text-[#8a7a7d]"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"/>You</span>
      </div>
    </div>
  )
}