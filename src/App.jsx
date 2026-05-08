import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

gsap.defaults({ ease: 'power1.out' })

function App() {
  const [page, setPage] = useState('home')
  const [colorway, setColorway] = useState('plain')
  const [darkMode, setDarkMode] = useState(false)
  const [globalFont, setGlobalFont] = useState('helvetica-neue')
  const [logoFont, setLogoFont] = useState('montserrat')
  const [ownerName, setOwnerName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [resultsTab, setResultsTab] = useState('default')
  const [historyQuery, setHistoryQuery] = useState('')
  const pageContentRef = useRef(null)

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
    plain: 'midnight',
    blue: 'blue-dark',
  }
  const activeTheme = darkMode ? darkThemeByColorway[colorway] ?? 'midnight' : colorway
  const openResultsPage = () => {
    if (!ownerName.trim() && !businessName.trim()) return
    setResultsTab('default')
    setPage('results')
  }
  const openResultsFromHistory = (entry) => {
    setOwnerName('')
    setBusinessName(entry)
    setResultsTab('default')
    setPage('results')
  }
  const openHomePage = () => {
    setPage('home')
  }

  useLayoutEffect(() => {
    if (!pageContentRef.current) return

    gsap.fromTo(
      pageContentRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.38, ease: 'power2.out' }
    )
  }, [page])

  return (
    <div className={`app-shell theme-${activeTheme} font-${globalFont}`}>
      <div className="workspace page-shell" key={page} ref={pageContentRef}>
        {page === 'home' ? (
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
            </div>
            <div className="bottom-left-controls">
              <div className="control-group">
                <label htmlFor="colorway-select">Colorway</label>
                <select
                  id="colorway-select"
                  value={colorway}
                  onChange={(event) => setColorway(event.target.value)}
                >
                  <option value="plain">Plain</option>
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
                    <input
                      type="text"
                      placeholder="Owner name"
                      aria-label="Owner name"
                      value={ownerName}
                      onChange={(event) => setOwnerName(event.target.value)}
                    />
                  </div>
                  <div className="search-input-field">
                    <span className="material-symbols-outlined ui-icon search-icon" aria-hidden="true">
                      business_center
                    </span>
                    <input
                      type="text"
                      placeholder="Business name"
                      aria-label="Business name"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="search-action-btn" onClick={openResultsPage}>
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
                    <button
                      key={entry}
                      type="button"
                      className="history-card"
                      onClick={() => openResultsFromHistory(entry)}
                      aria-label={`Open background search for ${entry}`}
                    >
                      <span className="material-symbols-outlined ui-icon history-icon" aria-hidden="true">
                        history
                      </span>
                      <div className="history-main">
                        <span className="history-title">{entry}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </main>
        ) : (
          <div className="results-layout">
            <aside className="results-sidebar">
              <button type="button" className="new-search-sidebar-btn" onClick={openHomePage}>
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  add
                </span>
                <span>New Search</span>
              </button>

              <div className="results-history">
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
                <div className="history-list">
                  {filteredHistory.map((entry) => (
                    <button
                      key={entry}
                      type="button"
                      className="history-card"
                      onClick={() => openResultsFromHistory(entry)}
                      aria-label={`Open background search for ${entry}`}
                    >
                      <span className="material-symbols-outlined ui-icon history-icon" aria-hidden="true">
                        history
                      </span>
                      <div className="history-main">
                        <span className="history-title">{entry}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="results-sidebar-footer">
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
                <button type="button" className="footer-item account-item">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    account_circle
                  </span>
                  <span>Account</span>
                </button>
              </div>
            </aside>

            <main className="results-main">
              <div className="results-header-strip">
                <header className="results-header">
                  <h2>Background Search</h2>
                  <p>
                    {businessName || 'Business'} {ownerName ? `• Owner: ${ownerName}` : ''}
                  </p>
                </header>

                <div className="results-tabs" role="tablist" aria-label="Search depth tabs">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={resultsTab === 'default'}
                    className={`results-tab-btn ${resultsTab === 'default' ? 'active' : ''}`}
                    onClick={() => setResultsTab('default')}
                  >
                    Default Results
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={resultsTab === 'deep'}
                    className={`results-tab-btn ${resultsTab === 'deep' ? 'active' : ''}`}
                    onClick={() => setResultsTab('deep')}
                  >
                    Deep Search
                  </button>
                </div>
              </div>

              <div className="results-content">
                {resultsTab === 'default' ? (
                  <>
                    <section className="results-metrics">
                      <article className="metric-card">
                        <p>Risk score</p>
                        <strong>72</strong>
                      </article>
                      <article className="metric-card">
                        <p>Sanctions matches</p>
                        <strong>2</strong>
                      </article>
                      <article className="metric-card">
                        <p>Open cases</p>
                        <strong>5</strong>
                      </article>
                    </section>

                    <section className="results-panel">
                      <h3>Key findings</h3>
                      <ul>
                        <li>Multiple high-risk jurisdiction transactions in prior 90 days.</li>
                        <li>Two linked entities share officers and mailing address.</li>
                        <li>Potential adverse media references require manual review.</li>
                      </ul>
                    </section>
                  </>
                ) : (
                  <>
                    <section className="results-metrics">
                      <article className="metric-card">
                        <p>Network entities scanned</p>
                        <strong>148</strong>
                      </article>
                      <article className="metric-card">
                        <p>High-priority linkages</p>
                        <strong>11</strong>
                      </article>
                      <article className="metric-card">
                        <p>Deep risk score</p>
                        <strong>84</strong>
                      </article>
                    </section>

                    <section className="results-panel">
                      <h3>Deep search findings</h3>
                      <ul>
                        <li>Detected 3 secondary entities with overlapping beneficial ownership.</li>
                        <li>Historical payment paths show repeated routing through flagged regions.</li>
                        <li>Archived litigation references indicate elevated operational risk.</li>
                      </ul>
                    </section>
                  </>
                )}
              </div>
            </main>
          </div>
        )}
      </div>

      {page === 'home' ? (
        <aside className="floating-actions" aria-label="Utility actions">
          <button type="button" className="footer-item account-item">
            <span className="material-symbols-outlined ui-icon" aria-hidden="true">
              account_circle
            </span>
            <span>Account</span>
          </button>
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
      ) : null}

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
