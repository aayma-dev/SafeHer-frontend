import { Link } from 'react-router-dom'
import { Shield, Heart } from 'lucide-react'

const links = {
  Platform: [
    { to: '/map', label: 'Safety Map' },
    { to: '/reports', label: 'Incident Reports' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/resources', label: 'Resources' },
  ],
  Support: [
    { to: '/sos', label: 'Emergency SOS' },
    { to: '/submit-report', label: 'Submit Report' },
    { to: '/profile', label: 'My Profile' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1c1518] border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-[#F5F0EB]">
                SafeHer
              </span>
            </Link>
            <p className="text-[#8a7a7d] text-sm leading-relaxed max-w-xs mb-6">
              An anonymous, real-time geospatial safety platform empowering women through community-driven protection.
            </p>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-[#F5F0EB] mb-4 text-sm">{section}</h4>
              <ul className="space-y-3">
                {items.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-[#8a7a7d] text-sm hover:text-[#F5F0EB] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8a7a7d] text-xs">
            © {new Date().getFullYear()} SafeHer.
          </p>
          <p className="text-[#8a7a7d] text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-500" /> for safer communities
          </p>
        </div>
      </div>
    </footer>
  )
}