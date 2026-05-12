import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../gsap/register.js'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'

const LANDING_PALETTE_STORAGE = 'quickvett-public-landing-palette'

function readStoredLandingPalette() {
  if (typeof window === 'undefined') return 'v1'
  try {
    return window.localStorage.getItem(LANDING_PALETTE_STORAGE) === 'v2' ? 'v2' : 'v1'
  } catch {
    return 'v1'
  }
}

function navCls(isActive) {
  return `public-nav-link${isActive ? ' public-nav-link--active' : ''}`
}

export default function PublicLayout() {
  const { pathname } = useLocation()
  const pagesWithFinaleFooter =
    pathname === '/how-it-works' || pathname === '/what-we-uncover'
  const showLayoutFooter = pathname !== '/' && !pagesWithFinaleFooter
  const outletRef = useRef(null)
  const [landingPalette, setLandingPalette] = useState(readStoredLandingPalette)

  useEffect(() => {
    try {
      window.localStorage.setItem(LANDING_PALETTE_STORAGE, landingPalette)
    } catch {
      /* ignore quota / private mode */
    }
  }, [landingPalette])

  useLayoutEffect(() => {
    const el = outletRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { clearProps: 'opacity,transform' })
      return
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out', overwrite: 'auto' },
    )
    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
  }, [pathname])

  const shellClass = [
    'app-shell',
    'theme-plain',
    'font-helvetica-neue',
    'public-layout',
    landingPalette === 'v2' ? 'public-layout--landing-v2' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={shellClass}>
      <header className="public-header">
        <div className="public-header-inner">
          <NavLink to="/" className="header-brand logo-font-helvetica-neue" aria-label="QuickVett — home">
            <span className="material-symbols-outlined ui-icon header-logo-icon" aria-hidden="true">
              shield
            </span>
            <span>QuickVett</span>
          </NavLink>
          <nav className="public-nav" aria-label="Primary">
            <NavLink to="/how-it-works" className={({ isActive }) => navCls(isActive)}>
              How it works
            </NavLink>
            <NavLink to="/what-we-uncover" className={({ isActive }) => navCls(isActive)}>
              What we uncover
            </NavLink>
            <NavLink to="/pricing" className={({ isActive }) => navCls(isActive)}>
              Pricing
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => navCls(isActive)}>
              Contact
            </NavLink>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `public-nav-link public-nav-link--cta${isActive ? ' public-nav-link--active' : ''}`
              }
            >
              Sign in
            </NavLink>
          </nav>
          <div className="public-header-palette-wrap">
            <select
              className="public-header-palette-select"
              aria-label="Marketing page color palette"
              value={landingPalette}
              onChange={(e) => setLandingPalette(e.target.value === 'v2' ? 'v2' : 'v1')}
            >
              <option value="v1">Classic palette</option>
              <option value="v2">Palette v2</option>
            </select>
          </div>
        </div>
      </header>
      <main className="public-main">
        <div ref={outletRef} className="public-outlet-frame">
          <Outlet />
        </div>
      </main>
      {showLayoutFooter && <PublicLegalFooter className="public-footer" />}
    </div>
  )
}
