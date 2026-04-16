import { Link, useLocation } from 'react-router-dom'
import { Shield, LayoutDashboard, FileText, Users, BarChart2, Settings, LogOut, ChevronRight } from 'lucide-react'
import { useAuthStore } from '../../store/authstore'
import { useNavigate } from 'react-router-dom'

const items = [
  { to: '/admin',            icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/admin/reports',    icon: FileText,        label: 'Reports'    },
  { to: '/admin/users',      icon: Users,           label: 'Users'      },
  { to: '/admin/analytics',  icon: BarChart2,       label: 'Analytics'  },
  { to: '/admin/settings',   icon: Settings,        label: 'Settings'   },
]

export default function AdminSidebar() {
  const location = useLocation()
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="w-64 flex-shrink-0 bg-[#141011] border-r border-[rgba(255,255,255,0.08)] h-screen sticky top-0 flex flex-col">
      
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.08)]">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center shadow-primary-glow">
            <Shield className="w-4 h-4 text-white"/>
          </div>
          <div>
            <p className="font-display font-bold text-[#F5F0EB] text-base">
              Safe<span className="gradient-text">Her</span>
            </p>
            <p className="text-xs text-[#8a7a7d]">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon
          const active = location.pathname === item.to

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all ${
                active
                  ? 'bg-primary/15 text-primary border border-primary/20'
                  : 'text-[#8a7a7d] hover:text-[#F5F0EB] hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0"/>
              <span className="flex-1">{item.label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-50"/>}
            </Link>
          )
        })}
      </nav>

      {/* User + logout */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#F5F0EB] truncate">
              {user?.username || 'Admin'}
            </p>
            <p className="text-xs text-[#8a7a7d] truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-[#8a7a7d] hover:text-danger hover:bg-danger/10 transition-all"
        >
          <LogOut className="w-4 h-4"/> Sign Out
        </button>
      </div>

    </aside>
  )
}