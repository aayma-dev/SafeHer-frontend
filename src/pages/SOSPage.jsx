import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Phone, Shield } from 'lucide-react'

export default function SOSPage() {
  const [activated, setActivated] = useState(false)

  const triggerSOS = () => {
    setActivated(true)
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 pt-24">
      <div className="max-w-lg w-full text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-danger/10 border border-danger/30 text-danger text-sm mb-8">
            <AlertTriangle className="w-4 h-4" /> Emergency SOS
          </div>

          <h1 className="font-display text-4xl font-bold text-[#F5F0EB] mb-4">
            Are You in Danger?
          </h1>

          <p className="text-muted mb-12">
            Press the SOS button to instantly share your location with emergency contacts and nearby Nighbans.
          </p>

          {/* SOS Button */}
          <div className="flex justify-center mb-12">
            <div className="relative">

              {!activated && (
                <>
                  <div className="absolute inset-0 rounded-full bg-danger/20 sos-ring" />
                  <div className="absolute inset-0 rounded-full bg-danger/15 sos-ring" style={{ animationDelay: '0.5s' }} />
                </>
              )}

              <motion.button
                onClick={triggerSOS}
                disabled={activated}
                className={`relative w-40 h-40 rounded-full text-white ${
                  activated ? 'bg-safe' : 'bg-danger'
                }`}
              >
                {activated ? (
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-8 h-8" />
                    <span className="text-sm">SENT</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <AlertTriangle className="w-8 h-8" />
                    <span>SOS</span>
                  </div>
                )}
              </motion.button>

            </div>
          </div>

          {activated && (
            <motion.div className="glass rounded-2xl p-6 border border-safe/30 mb-8">
              <div className="flex items-center gap-2 justify-center text-safe font-semibold mb-2">
                <Shield className="w-5 h-5" /> Alert Sent Successfully
              </div>
              <p className="text-muted text-sm">
                Your location has been shared. Help is on the way.
              </p>
            </motion.div>
          )}

          {/* Emergency contacts */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, label: 'Police', number: '15' },
              { icon: Phone, label: 'Rescue', number: '1122' },
              { icon: Phone, label: 'Women Helpline', number: '1099' },
            ].map((item) => {
              const Icon = item.icon   // ✅ FIX

              return (
                <a
                  key={item.label}
                  href={`tel:${item.number}`}
                  className="glass rounded-2xl p-4 border border-border"
                >
                  <Icon className="w-5 h-5 text-danger mx-auto mb-2" />
                  <p className="text-white text-sm font-semibold">{item.label}</p>
                  <p className="text-muted text-xs">{item.number}</p>
                </a>
              )
            })}
          </div>

        </motion.div>
      </div>
    </div>
  )
}