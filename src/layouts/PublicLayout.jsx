import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../gsap/register.js'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'

function navCls(isActive) {
  return `public-nav-link${isActive ? ' public-nav-link--active' : ''}`
}

export default function PublicLayout() {
  const { pathname } = useLocation()
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

  const shellClass = [
    'app-shell',
    'theme-plain',
    'font-helvetica-neue',
    'public-layout',
  ].join(' ')

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
