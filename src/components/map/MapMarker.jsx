import L from 'leaflet'

export function createIncidentIcon(category = 'other') {
  const colorMap = {
    harassment: '#f97316', assault: '#ef4444', theft: '#eab308',
    stalking: '#a855f7', unsafe_area: '#c0203a', lighting: '#60a5fa', other: '#8a7a7d',
  }
  const color = colorMap[category] || colorMap.other
  return L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px ${color}88;border:2px solid rgba(255,255,255,0.3);"><div style="transform:rotate(45deg);width:10px;height:10px;background:white;border-radius:50%;opacity:0.9;"></div></div>`,
    iconSize: [32, 32], iconAnchor: [16, 32], popupAnchor: [0, -34],
  })
}

export function createSafeZoneIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:30px;height:30px;border-radius:50%;background:rgba(34,197,94,0.2);border:2px solid #22c55e;display:flex;align-items:center;justify-content:center;box-shadow:0 0 12px rgba(34,197,94,0.4);"><div style="width:10px;height:10px;border-radius:50%;background:#22c55e;"></div></div>`,
    iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18],
  })
}

export function createUserIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:18px;height:18px;border-radius:50%;background:#c0203a;border:3px solid white;box-shadow:0 0 0 3px rgba(192,32,58,0.4);"></div>`,
    iconSize: [18, 18], iconAnchor: [9, 9],
  })
}