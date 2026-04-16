import { motion } from 'framer-motion'
import { MapContainer, TileLayer, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const mockIncidents = [
  { id: 1, lat: 31.5204, lng: 74.3587, category: 'Harassment', severity: 'high', title: 'Street Harassment' },
  { id: 2, lat: 31.5150, lng: 74.3490, category: 'Unsafe Area', severity: 'medium', title: 'Poorly Lit Area' },
  { id: 3, lat: 31.5300, lng: 74.3650, category: 'Following', severity: 'high', title: 'Being Followed' },
]

const mockSafeZones = [
  { id: 1, lat: 31.5250, lng: 74.3550, name: 'Metro Station', upvotes: 42 },
  { id: 2, lat: 31.5180, lng: 74.3600, name: 'Shopping Mall', upvotes: 87 },
]

export default function MapPage() {
  return (
    <div className="min-h-screen bg-base pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-3xl font-bold text-[#F5F0EB] mb-2">
            Safety <span className="gradient-text">Map</span>
          </h1>
          <p className="text-muted">Real-time incident heatmap and safe zones in your area</p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            { color: 'bg-danger', label: 'High Risk Incident' },
            { color: 'bg-accent', label: 'Medium Risk' },
            { color: 'bg-safe', label: 'Safe Zone' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl border border-border text-xs text-muted">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-3xl overflow-hidden border border-border shadow-card" style={{ height: '70vh' }}>
          <MapContainer
            center={[31.5204, 74.3587]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {mockIncidents.map((inc) => (
              <Circle
                key={inc.id}
                center={[inc.lat, inc.lng]}
                radius={200}
                pathOptions={{
                  color: inc.severity === 'high' ? '#EF4444' : '#E8A838',
                  fillColor: inc.severity === 'high' ? '#EF4444' : '#E8A838',
                  fillOpacity: 0.25,
                }}
              >
                <Popup>
                  <div style={{ background: '#1C1C2E', color: '#F5F0EB', padding: '8px', borderRadius: '8px', minWidth: '140px' }}>
                    <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{inc.title}</p>
                    <p style={{ color: '#9A9AAF', fontSize: '12px' }}>{inc.category}</p>
                  </div>
                </Popup>
              </Circle>
            ))}

            {mockSafeZones.map((zone) => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={150}
                pathOptions={{ color: '#22C55E', fillColor: '#22C55E', fillOpacity: 0.2 }}
              >
                <Popup>
                  <div style={{ background: '#1C1C2E', color: '#F5F0EB', padding: '8px', borderRadius: '8px' }}>
                    <p style={{ fontWeight: 'bold' }}>{zone.name}</p>
                    <p style={{ color: '#22C55E', fontSize: '12px' }}>✓ {zone.upvotes} upvotes</p>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}