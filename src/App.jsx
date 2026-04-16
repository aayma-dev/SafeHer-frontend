import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router/AppRouter'
import ChatBot from './components/chatbot/ChatBot'
import { useAuthStore } from './store/authstore'

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <div className="min-h-screen bg-[#0d0a0b] text-[#F5F0EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AppRouter />
      <ChatBot />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1c1518',
            color: '#F5F0EB',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22c55e', secondary: '#1c1518' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#1c1518' } },
        }}
      />
    </div>
  )
}

export default App
