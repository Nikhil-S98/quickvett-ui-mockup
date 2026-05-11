import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import WhatWeUncoverPage from './pages/WhatWeUncoverPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import QuickVettV1 from './versions/QuickVettV1.jsx'
import QuickVettV2 from './versions/QuickVettV2.jsx'
import QuickVettV3 from './versions/QuickVettV3.jsx'
import QuickVettV31 from './versions/QuickVettV31.jsx'
import QuickVettV32 from './versions/QuickVettV32.jsx'
import QuickVettV4 from './versions/QuickVettV4.jsx'

const VERSION_STORAGE_KEY = 'quickvett-ui-version'

function routerBasename() {
  const base = import.meta.env.BASE_URL ?? '/'
  if (base === '/') return undefined
  return base.endsWith('/') ? base.slice(0, -1) : base
}

function readStoredVersion() {
  try {
    const raw = localStorage.getItem(VERSION_STORAGE_KEY)
    if (
      raw === 'v1' ||
      raw === 'v2' ||
      raw === 'v3' ||
      raw === 'v3.1' ||
      raw === 'v3.2' ||
      raw === 'v4'
    )
      return raw
  } catch {
    /* ignore */
  }
  return 'v1'
}

function AuthenticatedWorkspace({ siteVersion, onSiteVersionChange, onSignOut, version }) {
  const { session } = useAuth()
  const location = useLocation()
  if (!session.signedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }
  const props = { siteVersion, onSiteVersionChange, onSignOut }
  if (version === 'v1') return <QuickVettV1 {...props} />
  if (version === 'v2') return <QuickVettV2 {...props} />
  if (version === 'v4') return <QuickVettV4 {...props} />
  if (version === 'v3.1') return <QuickVettV31 {...props} />
  if (version === 'v3.2') return <QuickVettV32 {...props} />
  return <QuickVettV3 {...props} />
}

function AppRoutes() {
  const [version, setVersion] = useState(readStoredVersion)
  const navigate = useNavigate()
  const { signOut } = useAuth()

  useEffect(() => {
    try {
      localStorage.setItem(VERSION_STORAGE_KEY, version)
    } catch {
      /* ignore */
    }
  }, [version])

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  const versionProps = {
    siteVersion: version,
    onSiteVersionChange: setVersion,
    onSignOut: handleSignOut,
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
      <Route
        path="/app"
        element={
          <AuthenticatedWorkspace version={version} {...versionProps} />
        }
      />
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
