import { useState } from 'react'
import gsap from 'gsap'

gsap.defaults({ ease: 'power1.out' })

function App() {
  const [colorway, setColorway] = useState('light')
  const [darkMode, setDarkMode] = useState(false)
  const [globalFont, setGlobalFont] = useState('helvetica-neue')
  const [logoFont, setLogoFont] = useState('montserrat')
  const [historyQuery, setHistoryQuery] = useState('')

  const searchHistory = [
    'Khera brothers inc',
    'Shahji smoke shop',
    'KHERA BROTHERS INC',
    "GIO'S FOOD SERVICE, LLC",
    'Vox Funding',
    'APEX ALLIANCE FITNESS LLC',
    'Queen City Elite Service',
    'HOG WASH DETAIL inc',
    'alaska resort condos',
    'Morrow transportation group',
    'Blue Harbor Holdings',
    'Northline grocery market',
    'Crown Valley Logistics',
    'Evergreen Auto Sales',
    'Willow Creek Hospitality',
    'Ridgefield Wellness Center',
    'Golden Gate Fuel Services',
    'Union Point Distribution',
    'Northeast Packaging Co',
    'Lakeview Family Pharmacy',
    'Aster Property Group',
    'Redwood Contracting LLC',
    'Beacon Retail Partners',
    'Topline Recovery Services',
    'Pinecrest Energy Holdings',
    'Jetstream Fleet Solutions',
    'Liberty Transit Foods',
    'Harborview Marine Supply',
    'Kingsbridge Financial',
    'Prairie Line Grocers',
    'Elm Street Medical Labs',
    'Ironwood Security Systems',
    'Northstar Roofing and Solar',
    'Vertex Equipment Rentals',
    'Summit Point Childcare',
    'Atlas Industrial Cleaning',
    'Metroline Printing Works',
    'Greenway Senior Living',
    'Cedar Street Catering',
    'Seaside Home Renovations',
    'Broadway Electronics Depot',
  ]
  const filteredHistory = searchHistory.filter((entry) =>
    entry.toLowerCase().includes(historyQuery.trim().toLowerCase())
  )
  const darkThemeByColorway = {
    light: 'midnight',
    blue: 'blue-dark',
  }
  const activeTheme = darkMode ? darkThemeByColorway[colorway] ?? 'midnight' : colorway

  return (
    <div className={`app-shell theme-${activeTheme} font-${globalFont}`}>
      <div className="workspace">
        <main className="main-area">
          <a href="#" className="about-link">
            About
          </a>
          <div className="top-right-tools">
            <button
              type="button"
              className="dark-mode-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button type="button" className="footer-item account-item top-account-btn">
              <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                account_circle
              </span>
              <span>Account</span>
            </button>
          </div>
          <div className="bottom-left-controls">
            <div className="control-group">
              <label htmlFor="colorway-select">Colorway</label>
              <select
                id="colorway-select"
                value={colorway}
                onChange={(event) => setColorway(event.target.value)}
              >
                <option value="light">Light</option>
                <option value="blue">Blue</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="global-font-select">Global font</label>
              <select
                id="global-font-select"
                value={globalFont}
                onChange={(event) => setGlobalFont(event.target.value)}
              >
                <option value="helvetica-neue">Helvetica Neue</option>
                <option value="inter">Inter</option>
                <option value="montserrat">Montserrat</option>
              </select>
            </div>
            <div className="control-group">
              <label htmlFor="logo-font-select">Logo font</label>
              <select
                id="logo-font-select"
                value={logoFont}
                onChange={(event) => setLogoFont(event.target.value)}
              >
                <option value="montserrat">Montserrat</option>
                <option value="helvetica-neue">Helvetica Neue</option>
                <option value="inter">Inter</option>
              </select>
            </div>
          </div>
          <div className="search-wrap">
            <h1 className={`search-brand logo-font-${logoFont}`}>
              <span className="material-symbols-outlined ui-icon logo-icon" aria-hidden="true">
                shield
              </span>
              <span>QuickVett</span>
            </h1>
            <div className="search-controls">
              <div className="search-bar" role="search">
                <div className="search-input-field">
                  <span className="material-symbols-outlined ui-icon search-icon" aria-hidden="true">
                    person
                  </span>
                  <input type="text" placeholder="Owner name" aria-label="Owner name" readOnly />
                </div>
                <div className="search-input-field">
                  <span className="material-symbols-outlined ui-icon search-icon" aria-hidden="true">
                    business_center
                  </span>
                  <input type="text" placeholder="Business name" aria-label="Business name" readOnly />
                </div>
              </div>
              <button
                type="button"
                className="search-action-btn"
                onClick={() => window.alert('Search clicked')}
              >
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  search
                </span>
                <span>Search</span>
              </button>
            </div>

            <section className="main-history-section" aria-label="Search history">
              <div className="main-history-header">
                <p className="history-label">Search history</p>
                <div className="history-filter">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    search
                  </span>
                  <input
                    type="text"
                    value={historyQuery}
                    onChange={(event) => setHistoryQuery(event.target.value)}
                    placeholder="Filter history"
                    aria-label="Filter search history"
                  />
                </div>
              </div>
              <div className="history-list">
                {filteredHistory.map((entry) => (
                  <article key={entry} className="history-card">
                    <span className="material-symbols-outlined ui-icon history-icon" aria-hidden="true">
                      history
                    </span>
                    <div className="history-main">
                      <p className="history-title">{entry}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <aside className="floating-actions" aria-label="Utility actions">
        <button type="button" className="footer-item">
          <span className="material-symbols-outlined ui-icon" aria-hidden="true">
            settings
          </span>
          <span>Settings</span>
        </button>
        <button type="button" className="footer-item">
          <span className="material-symbols-outlined ui-icon" aria-hidden="true">
            help
          </span>
          <span>Help</span>
        </button>
      </aside>

      <footer className="tiny-footer" aria-label="Legal links">
        <a href="#">Terms</a>
        <span>•</span>
        <a href="#">Privacy</a>
        <span>•</span>
        <a href="#">Cookies</a>
      </footer>

    </div>
  )
}

export default App
