import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { PageLoader } from '../components/ui/Loader'
import { useAuthStore } from '../store/authstore'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

// Lazy load all pages
const HomePage       = lazy(() => import('../pages/HomePage'))
const SignInPage     = lazy(() => import('../pages/SignInPage'))
const SignUpPage     = lazy(() => import('../pages/SignUpPage'))
const MapPage        = lazy(() => import('../pages/MapPage'))
const ReportsPage    = lazy(() => import('../pages/ReportsPage'))
const ReportDetailPage   = lazy(() => import('../pages/ReportDetailPage'))
const SubmitReportPage   = lazy(() => import('../pages/SubmitReportPage'))
const ProfilePage        = lazy(() => import('../pages/ProfilePage'))
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'))
const AnalyticsPage      = lazy(() => import('../pages/AnalyticsPage'))
const ResourcesPage      = lazy(() => import('../pages/ResourcesPage'))
const SOSPage            = lazy(() => import('../pages/SOSPage'))
const NotFoundPage       = lazy(() => import('../pages/NotFoundPage'))

// Layout wrapper — Navbar + Footer except on auth/admin pages
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

// Auth layout — no navbar/footer
function AuthLayout({ children }) {
  return <main className="min-h-screen">{children}</main>
}

// Protected route
function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/signin" replace />
  if (adminOnly && user?.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Auth pages */}
          <Route path="/signin" element={<AuthLayout><SignInPage /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignUpPage /></AuthLayout>} />

          {/* Public pages */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/map" element={<MainLayout><MapPage /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><ReportsPage /></MainLayout>} />
          <Route path="/reports/:id" element={<MainLayout><ReportDetailPage /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><AnalyticsPage /></MainLayout>} />
          <Route path="/resources" element={<MainLayout><ResourcesPage /></MainLayout>} />
          <Route path="/sos" element={<MainLayout><SOSPage /></MainLayout>} />

          {/* Protected pages */}
          <Route path="/submit-report" element={
            <MainLayout><SubmitReportPage /></MainLayout>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>
          } />

          <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
