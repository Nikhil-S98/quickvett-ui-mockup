import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../gsap/register.js'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'

const PUBLIC_DARK_STORAGE_KEY = 'quickvett-public-dark'

function readStoredPublicDark() {
  try {
    const raw = localStorage.getItem(PUBLIC_DARK_STORAGE_KEY)
    if (raw === '1') return true
    if (raw === '0') return false
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true
  }
  return false
}

function navCls(isActive) {
  return `public-nav-link${isActive ? ' public-nav-link--active' : ''}`
}

export default function PublicLayout() {
  const { pathname } = useLocation()
  const [marketingDark, setMarketingDark] = useState(() => readStoredPublicDark())
  const pagesWithFinaleFooter =
    pathname === '/how-it-works' || pathname === '/what-we-uncover'
  const showLayoutFooter =
    pathname !== '/' && !pagesWithFinaleFooter && pathname !== '/sign-in'
  const outletRef = useRef(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
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

  useEffect(() => {
    try {
      localStorage.setItem(PUBLIC_DARK_STORAGE_KEY, marketingDark ? '1' : '0')
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle('public-marketing-dark', marketingDark)
  }, [marketingDark])

  useEffect(() => {
    return () => document.documentElement.classList.remove('public-marketing-dark')
  }, [])

  const shellClass = [
    'app-shell',
    'theme-plain',
    'font-helvetica-neue',
    'public-layout',
    marketingDark ? 'public-layout--dark' : '',
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
            <button
              type="button"
              className="public-theme-toggle"
              onClick={() => setMarketingDark((v) => !v)}
              aria-pressed={marketingDark}
              aria-label={marketingDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={marketingDark ? 'Switch to light mode' : 'Dark briefing mode'}
            >
              <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                {marketingDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `public-nav-link public-nav-link--cta${isActive ? ' public-nav-link--active' : ''}`
              }
            >
              Sign in
            </NavLink>
          </nav>
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
