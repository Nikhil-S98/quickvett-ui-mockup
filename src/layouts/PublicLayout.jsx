import { NavLink, Outlet } from 'react-router-dom'

function navCls(isActive) {
  return `public-nav-link${isActive ? ' public-nav-link--active' : ''}`
}

export default function PublicLayout() {
  return (
    <div className="app-shell theme-plain font-helvetica-neue public-layout">
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
        <Outlet />
      </main>
      <footer className="public-footer tiny-footer" aria-label="Legal links">
        <a href="#">Terms</a>
        <span aria-hidden="true">•</span>
        <a href="#">Privacy</a>
        <span aria-hidden="true">•</span>
        <a href="#">Cookies</a>
      </footer>
    </div>
  )
}
