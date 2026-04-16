import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Send, CheckCircle } from 'lucide-react'
import { useAlertStore } from '../../store/alertStore'
import { useGeolocation } from '../../hooks/useGeolocation'
import { alertService } from '../../services/alertService'

export default function SOSButton({ variant = 'full' }) {
  const [phase, setPhase] = useState('idle') // idle | confirm | sending | done
  const { activateSOS, deactivateSOS } = useAlertStore()
  const { location, getLocation } = useGeolocation()

  const handleSOS = async () => {
    if (phase === 'idle') {
      setPhase('confirm')
      return
    }

    if (phase === 'confirm') {
      setPhase('sending')

      getLocation()

      try {
        await alertService.triggerSOS({
          latitude: location?.lat,
          longitude: location?.lng,
        })

        activateSOS(location)
      } catch (err) {
        console.error('SOS failed:', err)
      }

      setTimeout(() => setPhase('done'), 1500)
    }
  }

  const reset = () => {
    setPhase('idle')
    deactivateSOS()
  }

  // Floating button version
  if (variant === 'floating') {
    return (
      <motion.button
        onClick={handleSOS}
        animate={
          phase === 'idle'
            ? {
                boxShadow: [
                  '0 0 0px rgba(239,68,68,0)',
                  '0 0 24px rgba(239,68,68,0.5)',
                  '0 0 0px rgba(239,68,68,0)',
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-danger flex items-center justify-center shadow-card text-white"
        title="Emergency SOS"
      >
        <AlertTriangle className="w-6 h-6" />
      </motion.button>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <AnimatePresence mode="wait">
        {phase === 'done' ? (
          <motion.div
            key="done"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-safe/20 border-2 border-safe flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-safe" />
            </div>

            <div>
              <p className="text-xl font-bold text-[#F5F0EB] mb-1">
                SOS Sent!
              </p>
              <p className="text-[#8a7a7d] text-sm">
                Emergency contacts have been alerted.
              </p>
            </div>

            <button
              onClick={reset}
              className="px-6 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-[#8a7a7d] hover:text-[#F5F0EB] text-sm transition-all"
            >
              Cancel SOS
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="sos"
            className="flex flex-col items-center gap-6"
          >
            {/* Big SOS button */}
            <div className="relative">
              {phase !== 'idle' && (
                <>
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0, 0.4],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-danger"
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.7, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.3,
                    }}
                    className="absolute inset-0 rounded-full bg-danger"
                  />
                </>
              )}

              <motion.button
                onClick={handleSOS}
                animate={
                  phase === 'idle'
                    ? {
                        boxShadow: [
                          '0 0 20px rgba(239,68,68,0.3)',
                          '0 0 50px rgba(239,68,68,0.6)',
                          '0 0 20px rgba(239,68,68,0.3)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
                whileTap={{ scale: 0.94 }}
                className="relative w-40 h-40 rounded-full bg-danger flex flex-col items-center justify-center text-white shadow-card z-10"
              >
                <AlertTriangle className="w-12 h-12 mb-1" />
                <span className="font-display font-bold text-2xl tracking-wider">
                  SOS
                </span>
              </motion.button>
            </div>

            {phase === 'confirm' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center bg-danger/10 border border-danger/25 rounded-2xl p-5 max-w-sm"
              >
                <p className="text-[#F5F0EB] font-semibold mb-1">
                  Confirm Emergency SOS?
                </p>

                <p className="text-[#8a7a7d] text-sm mb-4">
                  This will send your live location immediately.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={reset}
                    className="px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] text-[#8a7a7d] text-sm hover:text-[#F5F0EB]"
                  >
                    Cancel
                  </button>

                  <motion.button
                    onClick={handleSOS}
                    whileTap={{ scale: 0.96 }}
                    className="px-5 py-2.5 rounded-xl bg-danger text-white font-semibold text-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send SOS
                  </motion.button>
                </div>
              </motion.div>
            )}

            {phase === 'sending' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-[#F5F0EB] font-semibold animate-pulse">
                  Sending SOS…
                </p>
                <p className="text-[#8a7a7d] text-sm mt-1">
                  Getting your location
                </p>
              </motion.div>
            )}

            {phase === 'idle' && (
              <p className="text-[#8a7a7d] text-sm text-center max-w-xs">
                Press SOS if you feel unsafe. Your location will be shared instantly.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}