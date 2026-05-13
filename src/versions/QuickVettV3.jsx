import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { PENDING_SEARCH_KEY } from '../constants/pendingSearchStorage.js'
import { readStoredPublicMarketingDark } from '../constants/publicMarketingDarkStorage.js'

gsap.defaults({ ease: 'power1.out' })

/** Plain colorway only; logo uses Montserrat (body is Inter via `font-inter` on shell). */
const V3_LOGO_FONT = 'montserrat'

function HeaderBrand({ onClick }) {
  const className = `header-brand logo-font-${V3_LOGO_FONT}${onClick ? ' header-brand-clickable' : ''}`
  const inner = (
    <>
      <span className="material-symbols-outlined ui-icon header-logo-icon" aria-hidden="true">
        shield
      </span>
      <span>QuickVett</span>
    </>
  )
  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        aria-label="QuickVett — return to home"
      >
        {inner}
      </button>
    )
  }
  return (
    <div className={className} aria-label="QuickVett">
      {inner}
    </div>
  )
}

function datamerchCategoryLabel(category) {
  if (category === 'Default') return 'Default Account'
  return category
}

function DataMerchCard({ businessName }) {
  const ein = '85-3201948'
  const lookupTimes = 89
  const records = [
    {
      category: 'Default',
      reportedBy: 'CFG Merchant Solutions',
      reportedAt: '2024-11-03',
      note: 'Stopped ACH on day 9 of contract. No response to outreach calls or emails after initial draw.',
    },
    {
      category: 'Stacking',
      reportedBy: 'EBF Holdings',
      reportedAt: '2024-08-17',
      note: 'Took 3 concurrent positions within 72 hrs without disclosure. Original contract explicitly prohibited.',
    },
  ]

  return (
    <article className="result-card card-datamerch">
      <header className="result-card-header">
        <div className="result-card-heading">
          <h3>DataMerch</h3>
        </div>
      </header>
      <div className="result-card-body">
        <p className="datamerch-summary-line">
          <span className="datamerch-record-label">EIN</span> <strong>{ein}</strong>
          <span className="datamerch-record-label"> · Records</span> <strong>{records.length}</strong>
          <span className="datamerch-record-label"> · Searched</span> <strong>{lookupTimes}</strong>
          <span className="datamerch-record-label"> times</span>
        </p>
        <ul className="datamerch-records">
          {records.map((record) => (
            <li key={`${record.category}-${record.reportedAt}`} className="datamerch-record-row">
              <div className="datamerch-record-body">
                <p className="datamerch-record-pill">
                  File submitted by:{' '}
                  <span className="datamerch-submitter-name">{record.reportedBy}</span>
                </p>
                <p className="datamerch-record-note">{record.note}</p>
              </div>
              <span className={`datamerch-category-pill datamerch-category-pill--${record.category.toLowerCase()}`}>
                {datamerchCategoryLabel(record.category)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function getDeepTerminalSections(business, owner) {
  return [
    {
      id: 'legal',
      title: 'Legal History',
      entries: [
        {
          flag: 'red',
          text: `${business} appears as defendant in Velocity Capital LLC v. ${business} (2024-CV-04821, Kings County). Motion calendar lists conference 2026-06-02.`,
        },
        {
          flag: 'red',
          text: `Federal action Northbridge Funding Group v. ${business} et al. (EDNY 2024-CV-00188) remains open — discovery order entered; depositions expected Q3.`,
        },
        {
          flag: 'red',
          text: `Judgment entered Yellowstone Capital East v. ${business} (NJ Bergen 2023-CV-11204); abstract indexed against trade name.`,
        },
      ],
    },
    {
      id: 'owner',
      title: 'Owner',
      entries: [
        {
          flag: 'green',
          text: `${owner} listed as control person with majority governance stake; NY DOS shows signature authority on 4 active filings since 2022.`,
        },
      ],
    },
    {
      id: 'entity',
      title: 'Entity Linkage',
      entries: [
        {
          flag: 'yellow',
          text: `Registered office 2841 Atlantic Ave matches KB Logistics Holdings Inc (inactive agent overlap March 2023).`,
        },
        {
          flag: 'yellow',
          text: `Prior trade name filing “${business} DBA Atlantic Wholesale” discontinued 2021-09.`,
        },
        {
          flag: 'green',
          text: `No NY DOS penalties on file for ${business}; certificate status active.`,
        },
      ],
    },
    {
      id: 'business',
      title: 'Business',
      entries: [
        {
          flag: 'yellow',
          text: `NAICS 4244 wholesale trade; Experian SBCS band below average (52) as of last bureau refresh.`,
        },
        {
          flag: 'yellow',
          text: `Secured financing filings show 9 active UCC-1 continuations naming MCA-style lenders (NY/NJ index, 18 months).`,
        },
        {
          flag: 'yellow',
          text: `Web presence limited to directory listings; primary domain registered 2018 with privacy WHOIS.`,
        },
        {
          flag: 'green',
          text: `No bankruptcy petitions located under current EIN or principal trade names.`,
        },
      ],
    },
    {
      id: 'reviews',
      title: 'Reviews & Reputation',
      empty: true,
    },
  ]
}

function getDefaultHistorySearchGroups(business, owner) {
  return [
    {
      id: 'owner-searches',
      title: 'Searches on the Owner',
      icon: 'person_search',
      summary: `${owner} matched 3 civil and identity records across state and county indexes.`,
      cases: [
        {
          title: `Palmer Vs ${owner}`,
          meta: `Palmer Vs ${owner} | Filed: 2023-04-03 | Court: New Jersey Superior Courts | Class: Civil | Area: Commercial and Trade | Type: Contract | Status: Closed`,
          details: {
            filed: '2023-04-03',
            court: 'New Jersey Superior Courts',
            className: 'Civil',
            area: 'Commercial and Trade',
            type: 'Contract',
            status: 'Closed',
          },
          documents: [
            { title: 'Unknown', date: 'Apr 5, 2023' },
            { title: 'Unknown', date: 'Apr 5, 2023' },
            { title: 'Unknown', date: 'Apr 3, 2023' },
          ],
        },
        {
          title: `State Of New York Vs ${owner}`,
          meta: `State Of New York Vs ${owner} | Filed: 2021-09-17 | Court: Kings County Civil Court | Class: Civil | Area: Tax | Type: Warrant | Status: Satisfied`,
          details: {
            filed: '2021-09-17',
            court: 'Kings County Civil Court',
            className: 'Civil',
            area: 'Tax',
            type: 'Warrant',
            status: 'Satisfied',
          },
          documents: [
            { title: 'Tax warrant docket', date: 'Sep 17, 2021' },
            { title: 'Satisfaction notice', date: 'Feb 11, 2022' },
          ],
        },
      ],
    },
    {
      id: 'business-searches',
      title: 'Searches on the Business',
      icon: 'domain',
      summary: `${business} matched 4 commercial, contract, and financing records across court indexes.`,
      defaultOpen: true,
      cases: [
        {
          title: `Velocity Capital LLC Vs ${business}`,
          meta: `Velocity Capital LLC Vs ${business} | Filed: 2024-06-12 | Court: NY Supreme Court - Kings County | Class: Civil | Area: Commercial and Trade | Type: Contract | Status: Open`,
          details: {
            filed: '2024-06-12',
            court: 'NY Supreme Court - Kings County',
            className: 'Civil',
            area: 'Commercial and Trade',
            type: 'Contract',
            status: 'Open',
          },
          documents: [
            { title: 'Summons and complaint', date: 'Jun 12, 2024' },
            { title: 'Affidavit of service', date: 'Jul 2, 2024' },
            { title: 'Motion for summary judgment', date: 'Apr 22, 2026' },
          ],
        },
        {
          title: `Northbridge Funding Group Vs ${business}`,
          meta: `Northbridge Funding Group Vs ${business} | Filed: 2024-01-09 | Court: US District Court - EDNY | Class: Federal Civil | Area: Commercial and Trade | Type: Contract | Status: Open`,
          details: {
            filed: '2024-01-09',
            court: 'US District Court - EDNY',
            className: 'Federal Civil',
            area: 'Commercial and Trade',
            type: 'Contract',
            status: 'Open',
          },
          documents: [
            { title: 'Complaint', date: 'Jan 9, 2024' },
            { title: 'Discovery order', date: 'Mar 8, 2026' },
          ],
        },
      ],
    },
  ]
}

function DeepSearchCard({ businessName, ownerName }) {
  const business = businessName.trim() || 'Khera Brothers Inc'
  const owner = ownerName.trim() || 'Rajiv Khera'
  const deepSections = getDeepTerminalSections(business, owner)

  return (
    <article className="result-card card-deep-search">
      <header className="result-card-header">
        <div className="result-card-heading">
          <h3>Deep Search</h3>
        </div>
      </header>
      <div className="result-card-body">
        <div className="deep-intel-host" aria-label="Deep search digest">
          <div className="deep-terminal">
            <p className="deep-term-meta">Completed May 13, 2026</p>
            {deepSections.map((section) => (
              <section key={section.id} className="deep-term-section">
                <h4 className="deep-term-section-title">{section.title}</h4>
                {section.empty ? (
                  <p className="deep-term-empty">No significant findings.</p>
                ) : (
                  <div className="deep-term-rows">
                    {section.entries.map((entry, idx) => (
                      <div key={`${section.id}-${idx}`} className="deep-term-row">
                        <span
                          className={`deep-term-flag deep-term-flag--${entry.flag}`}
                          aria-hidden="true"
                          title={
                            entry.flag === 'red'
                              ? 'High attention'
                              : entry.flag === 'yellow'
                                ? 'Review'
                                : 'Clear / positive'
                          }
                        >
                          <span className="material-symbols-outlined">flag</span>
                        </span>
                        <p className="deep-term-row-text">{entry.text}</p>
                        <button type="button" className="deep-term-info" aria-label="Source detail">
                          <span className="material-symbols-outlined" aria-hidden="true">
                            info
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function DefaultHistoryCard({ businessName, ownerName }) {
  const business = businessName.trim() || 'Khera Brothers Inc'
  const owner = ownerName.trim() || 'Rajiv Khera'
  const searchGroups = getDefaultHistorySearchGroups(business, owner)

  return (
    <article className="result-card card-default-history">
      <header className="result-card-header">
        <div className="result-card-heading">
          <h3>Default History</h3>
        </div>
      </header>
      <div className="result-card-body">
        <div className="dh-simple-shell" aria-label="Default history owner and business searches">
          {searchGroups.map((group) => (
            <section key={group.id} className="dh-search-section">
              <header className="dh-search-section-header">
                <span className="dh-section-icon" aria-hidden="true">
                  <span className="material-symbols-outlined">{group.icon}</span>
                </span>
                <span className="dh-search-group-copy">
                  <span className="dh-search-group-title">{group.title}</span>
                  <span className="dh-search-group-summary">{group.summary}</span>
                </span>
                <span className="dh-search-count">{group.cases.length} cases</span>
              </header>
              <div className="dh-case-list">
                {group.cases.map((caseRecord, idx) => (
                  <details key={caseRecord.title} className="dh-case-card" open={idx === 0}>
                    <summary className="dh-case-summary">
                      <span className="dh-case-type-icon" aria-hidden="true">
                        <span className="material-symbols-outlined">account_balance</span>
                      </span>
                      <div>
                        <h4>{caseRecord.title}</h4>
                        <p>{caseRecord.meta}</p>
                      </div>
                      <span className="material-symbols-outlined dh-case-chevron" aria-hidden="true">
                        expand_more
                      </span>
                    </summary>
                    <div className="dh-case-content">
                      <div className="dh-case-divider" />
                      <section className="dh-case-details" aria-label={`${caseRecord.title} case details`}>
                        <p className="dh-case-section-label">Case Details</p>
                        <p>
                          {caseRecord.title} | Filed: {caseRecord.details.filed} | Court:{' '}
                          {caseRecord.details.court} | Class: {caseRecord.details.className} | Area:{' '}
                          {caseRecord.details.area} | Type: {caseRecord.details.type} | Status:{' '}
                          {caseRecord.details.status}
                        </p>
                      </section>
                      <div className="dh-case-divider" />
                      <section className="dh-case-documents" aria-label={`${caseRecord.title} documents`}>
                        <p className="dh-case-section-label">Documents</p>
                        <div className="dh-document-list">
                          {caseRecord.documents.map((document) => (
                            <div
                              key={`${caseRecord.title}-${document.title}-${document.date}`}
                              className="dh-document-row"
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                description
                              </span>
                              <span>{document.title}</span>
                              <span className="dh-document-date">({document.date})</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

function QuickVettV3({ onSignOut }) {
  const [page, setPage] = useState('home')
  const [darkMode, setDarkMode] = useState(() => readStoredPublicMarketingDark())
  const [ownerName, setOwnerName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [historyQuery, setHistoryQuery] = useState('')
  const [v3SidebarCollapsed, setV3SidebarCollapsed] = useState(false)
  const [headerOwner, setHeaderOwner] = useState('')
  const [headerBusiness, setHeaderBusiness] = useState('')
  const pageContentRef = useRef(null)
  const isInitialPagePaint = useRef(true)

  const PAGE_FADE_DURATION = 0.18

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
  const activeTheme = darkMode ? 'midnight' : 'plain'
  const transitionToPage = (nextPage, updateState) => {
    if (nextPage === page && !updateState) return
    const el = pageContentRef.current
    if (!el) {
      updateState?.()
      if (nextPage !== page) setPage(nextPage)
      return
    }
    gsap.killTweensOf(el)
    gsap.to(el, {
      autoAlpha: 0,
      duration: PAGE_FADE_DURATION,
      ease: 'sine.inOut',
      onComplete: () => {
        updateState?.()
        if (nextPage !== page) {
          setPage(nextPage)
        } else {
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: PAGE_FADE_DURATION, ease: 'sine.inOut' }
          )
        }
      },
    })
  }

  const openResultsPage = () => {
    if (!ownerName.trim() && !businessName.trim()) return
    transitionToPage('results')
  }
  const openResultsFromHistory = (entry) => {
    transitionToPage('results', () => {
      setOwnerName('')
      setBusinessName(entry)
    })
  }
  const openHomePage = () => {
    transitionToPage('home')
  }
  const submitHeaderSearch = () => {
    const trimmedOwner = headerOwner.trim()
    const trimmedBusiness = headerBusiness.trim()
    if (!trimmedOwner && !trimmedBusiness) return
    if (trimmedOwner === ownerName.trim() && trimmedBusiness === businessName.trim()) return
    transitionToPage('results', () => {
      setOwnerName(headerOwner)
      setBusinessName(headerBusiness)
    })
  }

  /* Align header editors with landing search inputs (mock UX). */
  /* eslint-disable react-hooks/set-state-in-effect -- mirroring controlled fields */
  useEffect(() => {
    setHeaderOwner(ownerName)
    setHeaderBusiness(businessName)
  }, [ownerName, businessName])
  /* eslint-enable react-hooks/set-state-in-effect */

  /* eslint-disable react-hooks/set-state-in-effect -- apply merchant search persisted through sign-in */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PENDING_SEARCH_KEY)
      if (!raw) return
      sessionStorage.removeItem(PENDING_SEARCH_KEY)
      const data = JSON.parse(raw)
      const owner = typeof data?.ownerName === 'string' ? data.ownerName : ''
      const business = typeof data?.businessName === 'string' ? data.businessName : ''
      const openResults = data?.openResults !== false
      setOwnerName(owner)
      setBusinessName(business)
      setHeaderOwner(owner)
      setHeaderBusiness(business)
      if (openResults && (owner.trim() || business.trim())) {
        setPage('results')
      }
    } catch {
      /* ignore */
    }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useLayoutEffect(() => {
    if (!pageContentRef.current) return
    if (isInitialPagePaint.current) {
      isInitialPagePaint.current = false
      gsap.set(pageContentRef.current, { autoAlpha: 1 })
      return
    }
    gsap.killTweensOf(pageContentRef.current)
    gsap.fromTo(
      pageContentRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: PAGE_FADE_DURATION, ease: 'sine.inOut' }
    )
  }, [page])

  useLayoutEffect(() => {
    return () => {
      if (pageContentRef.current) gsap.killTweensOf(pageContentRef.current)
    }
  }, [])

  const v3ShellClass = `v3-chat-shell${v3SidebarCollapsed ? ' v3-chat-shell--sidebar-collapsed' : ''}`
  const resultsBusinessName = businessName.trim() || 'Khera Brothers Inc'
  const resultsOwnerName = ownerName.trim() || 'Rajiv Khera'

  const openHistoryEntry = (entry) => {
    openResultsFromHistory(entry)
  }

  return (
    <div className={`app-shell app-shell--v3 theme-${activeTheme} font-inter`}>
      <div className="workspace page-shell" ref={pageContentRef}>
        <div className={v3ShellClass}>
          <aside className="v3-sidebar" aria-label="Workspace navigation">
            <div className="v3-sidebar-expandable">
              <div className="v3-sidebar-filter-row">
                <div className="v3-sidebar-filter">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    search
                  </span>
                  <input
                    type="text"
                    value={historyQuery}
                    onChange={(event) => setHistoryQuery(event.target.value)}
                    placeholder="Filter search history"
                    aria-label="Filter search history"
                  />
                </div>
                <button
                  type="button"
                  className="v3-sidebar-icon-btn"
                  onClick={() => setV3SidebarCollapsed((prev) => !prev)}
                  aria-label={v3SidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
                >
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    dock_to_left
                  </span>
                </button>
              </div>
              <nav className="v3-sidebar-list" aria-label="Search history">
                {filteredHistory.map((entry) => (
                  <button
                    key={entry}
                    type="button"
                    className="v3-thread"
                    onClick={() => openHistoryEntry(entry)}
                    aria-label={`Open background search for ${entry}`}
                  >
                    <span className="material-symbols-outlined ui-icon history-icon" aria-hidden="true">
                      history
                    </span>
                    <span className="v3-thread-title">{entry}</span>
                  </button>
                ))}
              </nav>
              <div className="v3-sidebar-footer">
                <div
                  className="v3-sidebar-footer-actions"
                  role="group"
                  aria-label="Settings, account, and help"
                >
                  <button type="button" className="v3-sidebar-row">
                    <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                      settings
                    </span>
                    Settings
                  </button>
                  <button type="button" className="v3-sidebar-row">
                    <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                      account_circle
                    </span>
                    Account
                  </button>
                  <button type="button" className="v3-sidebar-row">
                    <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                      help
                    </span>
                    Help
                  </button>
                </div>
                {onSignOut ? (
                  <button
                    type="button"
                    className="v3-sidebar-row v3-sidebar-sign-out"
                    onClick={onSignOut}
                  >
                    <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                      logout
                    </span>
                    Sign out
                  </button>
                ) : null}
              </div>
            </div>
            <div className="v3-sidebar-rail">
              <button
                type="button"
                className="v3-sidebar-icon-btn"
                onClick={() => setV3SidebarCollapsed(false)}
                aria-label="Open sidebar"
              >
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  menu_open
                </span>
              </button>
            </div>
          </aside>

          <div className="v3-main-column">
          {page === 'home' ? (
            <div className="v3-main v3-main--home">
              <button
                type="button"
                className="dark-mode-toggle v3-home-theme-toggle"
                onClick={() => setDarkMode((prev) => !prev)}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  {darkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <div className="v3-main-stage">
                  <div className="search-wrap v3-home-search">
                  <h1 className={`search-brand logo-font-${V3_LOGO_FONT}`}>
                    <span className="material-symbols-outlined ui-icon logo-icon" aria-hidden="true">
                      shield
                    </span>
                    <span>QuickVett</span>
                  </h1>
                  <div className="v3-home-search-block">
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
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') openResultsPage()
                            }}
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
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') openResultsPage()
                            }}
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
                    <p className="v3-main-hint">
                      <strong>Run a background check</strong> on an owner and business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="v3-main v3-main--results">
              <div className="v3-results-inner">
                <div className="results-header-strip">
                  <div className="results-header-row">
                    <button
                      type="button"
                      className="v3-mobile-menu"
                      onClick={() => setV3SidebarCollapsed(false)}
                      aria-label="Open menu"
                    >
                      <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                        menu
                      </span>
                    </button>
                    <header className="results-header">
                      <div className="header-search">
                        <div className="header-search-bar" role="search">
                          <div className="header-search-field">
                            <span className="material-symbols-outlined ui-icon search-icon" aria-hidden="true">
                              person
                            </span>
                            <input
                              type="text"
                              placeholder="Owner name"
                              aria-label="Owner name"
                              value={headerOwner}
                              onChange={(event) => setHeaderOwner(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') submitHeaderSearch()
                              }}
                            />
                          </div>
                          <div className="header-search-field">
                            <span className="material-symbols-outlined ui-icon search-icon" aria-hidden="true">
                              business_center
                            </span>
                            <input
                              type="text"
                              placeholder="Business name"
                              aria-label="Business name"
                              value={headerBusiness}
                              onChange={(event) => setHeaderBusiness(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') submitHeaderSearch()
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="header-search-btn"
                          onClick={submitHeaderSearch}
                          aria-label="Search"
                        >
                          <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                            search
                          </span>
                        </button>
                      </div>
                    </header>
                    <div className="results-header-end">
                      <button
                        type="button"
                        className="dark-mode-toggle v3-results-theme-toggle"
                        onClick={() => setDarkMode((prev) => !prev)}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                      >
                        <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                          {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                      </button>
                      <HeaderBrand onClick={openHomePage} />
                    </div>
                  </div>
                </div>

                <div className="results-content">
                  <section className="results-entity-strip" aria-label="Search subject">
                    <div>
                      <p className="results-entity-label">Search subject</p>
                      <h2>{resultsBusinessName}</h2>
                    </div>
                    <p className="results-entity-meta">
                      Owner: {resultsOwnerName} · Brooklyn, NY · EIN: 85-3201948
                    </p>
                  </section>
                  <DataMerchCard businessName={businessName} />
                  <DefaultHistoryCard businessName={businessName} ownerName={ownerName} />
                  <DeepSearchCard businessName={businessName} ownerName={ownerName} />
                </div>
              </div>
            </div>
          )}
          <footer className="tiny-footer" aria-label="Legal links">
            <a href="#">Terms</a>
            <span>•</span>
            <a href="#">Privacy</a>
            <span>•</span>
            <a href="#">Cookies</a>
          </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickVettV3
