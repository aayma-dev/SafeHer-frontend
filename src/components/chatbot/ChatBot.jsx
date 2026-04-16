import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Shield, Bot } from 'lucide-react'

const botResponses = {
  hello: "Hi! I'm SafeBot 🛡️ I'm here to help you navigate SafeHer. You can ask me how to report an incident, find safe zones, or use SOS.",
  report: "To report an incident: click 'Report' in the navbar or go to /submit-report. You can report anonymously — no account needed!",
  sos: "For emergency SOS: click the red SOS button in the navbar or go to /sos. It will share your live location with emergency contacts instantly.",
  map: "The Safety Map at /map shows real-time incident heatmaps and verified safe zones near you. You can filter by category and date.",
  safe: "Safe Zones are community-verified locations. On the map, green markers show safe areas. You can also upvote existing safe zones!",
  anonymous: "Yes! Basic incident reporting requires NO account. Your identity is completely protected. We use optional captcha for spam prevention.",
  default: "I'm not sure about that, but I'm here to help! Try asking about: reporting incidents, SOS, the safety map, or safe zones.",
}

const getBotReply = (msg) => {
  const lower = msg.toLowerCase()
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return botResponses.hello
  if (lower.includes('report') || lower.includes('incident')) return botResponses.report
  if (lower.includes('sos') || lower.includes('emergency') || lower.includes('danger')) return botResponses.sos
  if (lower.includes('map') || lower.includes('location') || lower.includes('heatmap')) return botResponses.map
  if (lower.includes('safe zone') || lower.includes('safe area')) return botResponses.safe
  if (lower.includes('anonymous') || lower.includes('privacy') || lower.includes('identity')) return botResponses.anonymous
  return botResponses.default
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm SafeBot 🛡️ How can I help you today?" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages((m) => [...m, { from: 'user', text: userMsg }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: getBotReply(userMsg) }])
    }, 900)
  }

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary-gradient flex items-center justify-center shadow-primary-glow"
        animate={open ? {} : { boxShadow: ['0 0 0px rgba(192,32,58,0.4)', '0 0 25px rgba(192,32,58,0.6)', '0 0 0px rgba(192,32,58,0.4)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass rounded-3xl border border-border shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-gradient px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">SafeBot</p>
                <p className="text-white/70 text-xs">Your SafeHer Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-safe animate-pulse" />
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-surface/80">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-primary-gradient text-white rounded-tr-sm'
                      : 'bg-surface-card border border-border text-[#F5F0EB] rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-surface-card border border-border px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-muted"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-surface/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask about safety, SOS, reports..."
                  className="flex-1 bg-surface-card border border-border rounded-xl px-4 py-2.5 text-sm text-[#F5F0EB] placeholder:text-muted/60 outline-none focus:border-primary/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={send}
                  disabled={!input.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    input.trim() ? 'bg-primary-gradient text-white shadow-primary-glow' : 'bg-surface-card border border-border text-muted'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}