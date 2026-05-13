import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import WhatWeUncoverPage from './pages/WhatWeUncoverPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import QuickVettV3 from './versions/QuickVettV3.jsx'

function routerBasename() {
  const base = import.meta.env.BASE_URL ?? '/'
  if (base === '/') return undefined
  return base.endsWith('/') ? base.slice(0, -1) : base
}

function AuthenticatedWorkspace({ onSignOut }) {
  const { session } = useAuth()
  const location = useLocation()
  if (!session.signedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }
  return <QuickVettV3 onSignOut={onSignOut} />
}

function AppRoutes() {
  const navigate = useNavigate()
  const { signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="what-we-uncover" element={<WhatWeUncoverPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="sign-in" element={<SignInPage />} />
      </Route>
      <Route path="/app" element={<AuthenticatedWorkspace onSignOut={handleSignOut} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const basename = routerBasename()
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
