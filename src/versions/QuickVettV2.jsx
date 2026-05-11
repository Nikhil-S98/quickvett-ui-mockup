import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SiteVersionSelect from './SiteVersionSelect.jsx'
import { PENDING_SEARCH_KEY } from '../constants/pendingSearchStorage.js'

gsap.defaults({ ease: 'power1.out' })

function HeaderBrand({ logoFont, onClick }) {
  const className = `header-brand logo-font-${logoFont}${onClick ? ' header-brand-clickable' : ''}`
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

function DataMerchCard({ businessName }) {
  const records = [
    {
      category: 'Default',
      reportedBy: 'Anonymous Funder #142',
      reportedAt: '2024-11-03',
      note: 'Stopped ACH on day 9 of contract. No response to outreach calls or emails after initial draw.',
    },
    {
      category: 'Stacking',
      reportedBy: 'Anonymous Funder #87',
      reportedAt: '2024-08-17',
      note: 'Took 3 concurrent positions within 72 hrs without disclosure. Original contract explicitly prohibited.',
    },
  ]

  return (
    <article className="result-card card-datamerch">
      <header className="result-card-header">
        <div className="result-card-heading">
          <span className="result-card-label">DataMerch</span>
          <h3>{businessName || 'Business'}</h3>
        </div>
      </header>
      <div className="datamerch-meta">
        <span>EIN 85-3201948</span>
        <span aria-hidden="true">·</span>
        <span>{records.length} records</span>
        <span aria-hidden="true">·</span>
        <span>Searched 2s ago</span>
      </div>
      <ul className="datamerch-records">
        {records.map((record) => (
          <li key={`${record.category}-${record.reportedAt}`}>
            <div className="datamerch-record-head">
              <span className="datamerch-record-date">{record.reportedAt}</span>
            </div>
            <p className="datamerch-record-note">{record.note}</p>
            <p className="datamerch-record-source">— {record.reportedBy}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

function DefaultHistoryCard({ businessName }) {
  const business = businessName || 'Khera Brothers Inc'
  const cases = [
    {
      caption: `Velocity Capital LLC v. ${business}`,
      caseNumber: '2024-CV-04821',
      court: 'NY Supreme Court — Kings County',
      filedOn: '2024-06-12',
      caseType: 'Breach of Contract',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: 'Velocity Capital LLC' },
        { role: 'Defendant', name: business },
        { role: 'Defendant', name: 'Rajiv Khera (personal guaranty)' },
      ],
      judge: 'Hon. Lawrence Knipel',
      attorneys: [{ for: 'Plaintiff', name: 'Berkovitch & Bouskila PLLC' }],
      amount: '$184,500',
      lastDocket: { date: '2026-04-22', entry: 'Motion for summary judgment filed by plaintiff.' },
      documents: 14,
    },
    {
      caption: `Yellowstone Capital East v. ${business}`,
      caseNumber: '2023-CV-11204',
      court: 'NJ Superior Court — Bergen County',
      filedOn: '2023-09-30',
      caseType: 'Confession of Judgment',
      status: 'Judgment Entered',
      parties: [
        { role: 'Plaintiff', name: 'Yellowstone Capital East' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Estela M. De La Cruz',
      attorneys: [{ for: 'Plaintiff', name: 'Giuliano McDonnell & Perrone' }],
      amount: '$92,800',
      lastDocket: { date: '2024-02-14', entry: 'Default judgment entered against defendant.' },
      documents: 6,
    },
    {
      caption: `Northbridge Funding Group v. ${business}`,
      caseNumber: '2024-CV-00188',
      court: 'US District Court — EDNY',
      filedOn: '2024-01-09',
      caseType: 'RICO / Fraud',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: 'Northbridge Funding Group' },
        { role: 'Defendant', name: business },
        { role: 'Co-Defendant', name: 'KB Logistics Holdings Inc' },
      ],
      judge: 'Hon. Margo K. Brodie',
      attorneys: [{ for: 'Plaintiff', name: 'White & Williams LLP' }],
      amount: '$412,000',
      lastDocket: { date: '2026-03-08', entry: 'Discovery motion granted; deposition scheduled.' },
      documents: 31,
    },
    {
      caption: `Roosevelt Plaza Holdings LLC v. ${business}`,
      caseNumber: '2022-LT-07733',
      court: 'NY Civil Court — Queens County',
      filedOn: '2022-11-04',
      caseType: 'Commercial Landlord-Tenant',
      status: 'Closed',
      parties: [
        { role: 'Plaintiff', name: 'Roosevelt Plaza Holdings LLC' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Sergio Jimenez',
      attorneys: [{ for: 'Plaintiff', name: 'Belkin Burden Goldman LLP' }],
      amount: '$48,200',
      lastDocket: { date: '2023-04-19', entry: 'Stipulation of settlement filed; case closed.' },
      documents: 9,
    },
    {
      caption: `${business} v. Pinnacle Merchant Services LLC`,
      caseNumber: '2025-CV-02199',
      court: 'NY Supreme Court — New York County',
      filedOn: '2025-02-21',
      caseType: 'Breach of Contract / Counterclaim',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: business },
        { role: 'Defendant', name: 'Pinnacle Merchant Services LLC' },
      ],
      judge: 'Hon. Andrea Masley',
      attorneys: [{ for: 'Plaintiff', name: 'Davidoff Hutcher & Citron LLP' }],
      amount: '$76,300',
      lastDocket: { date: '2026-01-30', entry: 'Answer with counterclaims filed by defendant.' },
      documents: 11,
    },
    {
      caption: `Atlantic Lender Group LLC v. ${business}`,
      caseNumber: '2023-CV-08820',
      court: 'NJ Superior Court — Hudson County',
      filedOn: '2023-04-15',
      caseType: 'Account Stated',
      status: 'Closed',
      parties: [
        { role: 'Plaintiff', name: 'Atlantic Lender Group LLC' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Joseph A. Turula',
      attorneys: [{ for: 'Plaintiff', name: 'Loeb & Loeb LLP' }],
      amount: '$31,500',
      lastDocket: { date: '2023-11-02', entry: 'Settlement agreement filed; case dismissed with prejudice.' },
      documents: 7,
    },
    {
      caption: `Brookhaven Wholesale Co v. ${business}`,
      caseNumber: '2022-CV-31194',
      court: 'NY Civil Court — Bronx County',
      filedOn: '2022-08-22',
      caseType: 'Goods Sold and Delivered',
      status: 'Closed',
      parties: [
        { role: 'Plaintiff', name: 'Brookhaven Wholesale Co' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Lucindo Suarez',
      attorneys: [{ for: 'Plaintiff', name: 'Furman Kornfeld & Brennan LLP' }],
      amount: '$14,750',
      lastDocket: { date: '2023-02-07', entry: 'Stipulation of discontinuance filed.' },
      documents: 4,
    },
    {
      caption: `${business} v. United Freight Holdings Corp`,
      caseNumber: '2023-CV-15042',
      court: 'NY Supreme Court — Nassau County',
      filedOn: '2023-12-04',
      caseType: 'Breach of Service Contract',
      status: 'Closed',
      parties: [
        { role: 'Plaintiff', name: business },
        { role: 'Defendant', name: 'United Freight Holdings Corp' },
      ],
      judge: 'Hon. Sharon M.J. Gianelli',
      attorneys: [{ for: 'Plaintiff', name: 'Tannenbaum Helpern Syracuse & Hirschtritt LLP' }],
      amount: '$53,400',
      lastDocket: { date: '2024-09-18', entry: 'Confidential settlement; case closed.' },
      documents: 12,
    },
    {
      caption: `Empire Capital Funding Inc v. ${business}`,
      caseNumber: '2024-CV-09877',
      court: 'NJ Superior Court — Essex County',
      filedOn: '2024-03-19',
      caseType: 'Confession of Judgment',
      status: 'Judgment Entered',
      parties: [
        { role: 'Plaintiff', name: 'Empire Capital Funding Inc' },
        { role: 'Defendant', name: business },
        { role: 'Defendant', name: 'Rajiv Khera (personal guaranty)' },
      ],
      judge: 'Hon. Stephanie M. Wauters',
      attorneys: [{ for: 'Plaintiff', name: 'Akerman LLP' }],
      amount: '$128,900',
      lastDocket: { date: '2024-04-02', entry: 'Judgment by confession entered; abstract docketed.' },
      documents: 5,
    },
    {
      caption: `Pioneer Tax Services LLC v. ${business}`,
      caseNumber: '2024-CV-22018',
      court: 'NY Civil Court — Kings County',
      filedOn: '2024-05-29',
      caseType: 'Professional Services Collection',
      status: 'Closed',
      parties: [
        { role: 'Plaintiff', name: 'Pioneer Tax Services LLC' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Sandra E. Roper',
      attorneys: [{ for: 'Plaintiff', name: 'Klein Slowik PLLC' }],
      amount: '$8,200',
      lastDocket: { date: '2024-10-11', entry: 'Settled and discontinued.' },
      documents: 3,
    },
    {
      caption: `Bayside Equipment Leasing Corp v. ${business}`,
      caseNumber: '2025-CV-04412',
      court: 'NY Supreme Court — Suffolk County',
      filedOn: '2025-01-08',
      caseType: 'UCC / Replevin',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: 'Bayside Equipment Leasing Corp' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Robert F. Quinlan',
      attorneys: [{ for: 'Plaintiff', name: 'Wilson Elser Moskowitz Edelman & Dicker LLP' }],
      amount: '$67,500',
      lastDocket: { date: '2026-02-26', entry: 'Order of seizure granted as to leased equipment.' },
      documents: 8,
    },
    {
      caption: `${business} v. Coastal Insurance Brokers Inc`,
      caseNumber: '2025-CV-07733',
      court: 'NY Supreme Court — New York County',
      filedOn: '2025-03-04',
      caseType: 'Insurance Coverage Dispute',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: business },
        { role: 'Defendant', name: 'Coastal Insurance Brokers Inc' },
        { role: 'Defendant', name: 'Atlas Surety & Casualty Co' },
      ],
      judge: 'Hon. Joel M. Cohen',
      attorneys: [{ for: 'Plaintiff', name: 'Greenberg Traurig LLP' }],
      amount: '$215,000',
      lastDocket: { date: '2026-04-15', entry: 'Plaintiff opposition to motion to dismiss filed.' },
      documents: 19,
    },
    {
      caption: `State of New York v. ${business}`,
      caseNumber: '2023-TW-00428',
      court: 'NY Division of Tax Appeals',
      filedOn: '2023-07-11',
      caseType: 'Tax Warrant',
      status: 'Judgment Entered',
      parties: [
        { role: 'Petitioner', name: 'NY State Department of Taxation and Finance' },
        { role: 'Respondent', name: business },
      ],
      judge: 'Hon. Dennis M. Galliher (ALJ)',
      attorneys: [{ for: 'Petitioner', name: 'NY State Office of Counsel' }],
      amount: '$38,200',
      lastDocket: { date: '2023-12-02', entry: 'Tax warrant docketed; partial release recorded 2024-08.' },
      documents: 5,
    },
    {
      caption: `Brennan & Associates CPAs PLLC v. ${business}`,
      caseNumber: '2025-CV-01284',
      court: 'NY Supreme Court — Westchester County',
      filedOn: '2025-04-22',
      caseType: 'Professional Services Collection',
      status: 'Open',
      parties: [
        { role: 'Plaintiff', name: 'Brennan & Associates CPAs PLLC' },
        { role: 'Defendant', name: business },
      ],
      judge: 'Hon. Linda S. Jamieson',
      attorneys: [{ for: 'Plaintiff', name: 'Bell Davis & Pitt PA' }],
      amount: '$11,400',
      lastDocket: { date: '2026-03-19', entry: 'Defendant served; answer due April 30.' },
      documents: 2,
    },
  ]

  return (
    <article className="result-card card-default-history">
      <header className="result-card-header">
        <div className="result-card-heading">
          <span className="result-card-label">Default History</span>
          <h3>{cases.length} cases found</h3>
        </div>
      </header>
      <div className="case-list">
        {cases.map((c) => (
          <details key={c.caseNumber} className="case-row">
            <summary>
              <div className="case-summary-main">
                <div className="case-summary-top">
                  <span className="case-caption">{c.caption}</span>
                </div>
                <div className="case-summary-meta">
                  <span className="case-number">{c.caseNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span className="case-type">{c.caseType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.court}</span>
                  <span aria-hidden="true">·</span>
                  <span>Filed {c.filedOn}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.status}</span>
                </div>
              </div>
              <span className="material-symbols-outlined ui-icon case-chevron" aria-hidden="true">
                expand_more
              </span>
            </summary>
            <div className="case-detail">
              <div className="case-detail-grid">
                <div className="case-detail-block">
                  <p className="case-detail-label">Parties</p>
                  <ul>
                    {c.parties.map((p) => (
                      <li key={`${p.role}-${p.name}`}>
                        <span className="case-detail-role">{p.role}:</span> {p.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="case-detail-block">
                  <p className="case-detail-label">Judge</p>
                  <p>{c.judge}</p>
                  <p className="case-detail-label case-detail-label-spaced">Plaintiff counsel</p>
                  <p>{c.attorneys[0].name}</p>
                </div>
                <div className="case-detail-block">
                  <p className="case-detail-label">Amount in controversy</p>
                  <p className="case-detail-amount">{c.amount}</p>
                  <p className="case-detail-label case-detail-label-spaced">Documents</p>
                  <p>
                    <a href="#" className="case-detail-link">
                      View {c.documents} filings
                    </a>
                  </p>
                </div>
              </div>
              <div className="case-docket">
                <p className="case-detail-label">Last docket entry</p>
                <p>
                  <span className="case-docket-date">{c.lastDocket.date}</span> —{' '}
                  {c.lastDocket.entry}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </article>
  )
}

function DeepSearchCard({ businessName }) {
  const business = businessName || 'Business'
  return (
    <article className="result-card card-deep-search">
      <header className="result-card-header">
        <div className="result-card-heading">
          <span className="result-card-label">Deep Search</span>
          <h3>{business} — Intelligence Report</h3>
        </div>
      </header>
      <p className="deep-meta">
        <span className="material-symbols-outlined ui-icon" aria-hidden="true">
          travel_explore
        </span>
        Researched 47 sources · 6m 12s · 24 web pages reviewed
      </p>

      <section className="deep-section">
        <h4>Executive summary</h4>
        <p>
          {business} shows a pattern of distressed funding history with multiple active litigation
          matters and reported defaults in the alternative finance industry. Prior counterparties
          have flagged stacking behavior, and at least one federal RICO matter is currently
          pending. Manual review is recommended before extending capital.
        </p>
      </section>

      <section className="deep-section">
        <h4>Business overview</h4>
        <dl className="deep-dl">
          <div>
            <dt>Legal name</dt>
            <dd>{business}</dd>
          </div>
          <div>
            <dt>EIN</dt>
            <dd>85-3201948</dd>
          </div>
          <div>
            <dt>Formed</dt>
            <dd>March 2018 — New York</dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>Wholesale Trade — NAICS 4244</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Active</dd>
          </div>
          <div>
            <dt>HQ</dt>
            <dd>2841 Atlantic Ave, Brooklyn, NY 11207</dd>
          </div>
          <div>
            <dt>Employees (est.)</dt>
            <dd>11–25</dd>
          </div>
          <div>
            <dt>Revenue (est.)</dt>
            <dd>$2.4M — $3.1M annual</dd>
          </div>
        </dl>
      </section>

      <section className="deep-section">
        <h4>Ownership &amp; officers</h4>
        <ul className="deep-list">
          <li>
            <strong>Rajiv Khera</strong> — President / 60% owner. Listed on 4 other active entities.
          </li>
          <li>
            <strong>Anika Khera</strong> — VP Operations / 30% owner. Shares HQ address with Khera
            Logistics Holdings.
          </li>
          <li>
            <strong>Devon Marsh</strong> — CFO / 10% owner. Joined 2022; prior CFO at flagged MCA
            broker.
          </li>
        </ul>
      </section>

      <section className="deep-section">
        <h4>Linked entities</h4>
        <ul className="deep-list">
          <li>
            <strong>KB Logistics Holdings Inc</strong> — shared officers + co-defendant in 2024-CV-00188.
          </li>
          <li>
            <strong>Khera Group Real Estate LLC</strong> — shared HQ address; passive holdings.
          </li>
          <li>
            <strong>Brooklyn Atlantic Trading Co</strong> — same registered agent; dissolved 2023.
          </li>
        </ul>
      </section>

      <section className="deep-section">
        <h4>Financial signals</h4>
        <ul className="deep-list">
          <li>Experian SBCS credit band: <strong>Below average (52)</strong></li>
          <li>UCC filings on record: <strong>9 active</strong> across 6 secured parties</li>
          <li>Tax liens: <strong>1 federal</strong> ($38,200, 2023, partially released)</li>
          <li>Prior MCA positions identified: <strong>at least 5</strong> in last 18 months</li>
          <li>No bankruptcy filings on record</li>
        </ul>
      </section>

      <section className="deep-section">
        <h4>Legal &amp; regulatory</h4>
        <ul className="deep-list">
          <li>
            4 court matters (see Default History panel for full dockets) — 2 currently open including
            a federal RICO claim.
          </li>
          <li>NY business license active and in good standing.</li>
          <li>No state regulatory enforcement actions identified.</li>
        </ul>
      </section>

      <section className="deep-section">
        <h4>Adverse media</h4>
        <ul className="deep-news">
          <li>
            <p className="deep-news-title">Brooklyn wholesaler named in $412K RICO suit by funding group</p>
            <p className="deep-news-meta">deBanked · 2024-01-22</p>
            <p>Coverage of the EDNY filing alleging coordinated stacking and misrepresentation across at least three funders.</p>
          </li>
          <li>
            <p className="deep-news-title">Funders share growing list of stackers as 2024 defaults climb</p>
            <p className="deep-news-meta">Daily Funder · 2024-11-08</p>
            <p>Industry roundup mentions {business} among recent DataMerch entries flagged by multiple funders.</p>
          </li>
          <li>
            <p className="deep-news-title">Local supply chains adapt as Brooklyn wholesalers shift to hybrid models</p>
            <p className="deep-news-meta">Brooklyn Eagle · 2023-05-14</p>
            <p>Profile piece on small wholesalers in East New York including {business} discussing post-pandemic operations.</p>
          </li>
        </ul>
      </section>

      <section className="deep-section">
        <h4>Web &amp; reputation</h4>
        <dl className="deep-dl">
          <div>
            <dt>Website</dt>
            <dd>active · domain registered 2018</dd>
          </div>
          <div>
            <dt>BBB rating</dt>
            <dd>C+ · 4 complaints (2 unresolved)</dd>
          </div>
          <div>
            <dt>Google reviews</dt>
            <dd>3.2 ★ (47 reviews)</dd>
          </div>
          <div>
            <dt>Trustpilot</dt>
            <dd>No profile</dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>14 employees listed</dd>
          </div>
          <div>
            <dt>Social presence</dt>
            <dd>Facebook (low activity), no Instagram</dd>
          </div>
        </dl>
      </section>

      <section className="deep-section">
        <h4>Customer complaints</h4>
        <ul className="deep-list">
          <li>
            <strong>BBB</strong> — 4 total. 2 cite delivery delays, 1 cites billing dispute,
            1 unresolved invoice complaint from 2024-09.
          </li>
          <li>
            <strong>Reddit / r/smallbusiness</strong> — 2 mentions in 2024 referencing payment delays
            on supply contracts.
          </li>
        </ul>
      </section>

      <section className="deep-section deep-sources">
        <details>
          <summary>
            <span>Sources (47)</span>
            <span className="material-symbols-outlined ui-icon" aria-hidden="true">expand_more</span>
          </summary>
          <ol className="deep-sources-list">
            <li>NY Department of State — Business entity record</li>
            <li>EDNY PACER — Case 2024-CV-00188 docket</li>
            <li>NY Supreme Court — Kings County e-filing</li>
            <li>DataMerch — funder-reported records</li>
            <li>deBanked — industry coverage 2024-01-22</li>
            <li>Daily Funder — industry coverage 2024-11-08</li>
            <li>BBB.org — business profile and complaint records</li>
            <li>Google Maps — review aggregation</li>
            <li>LinkedIn — company page and employee count</li>
            <li>Experian SBCS — credit band lookup</li>
            <li>UCC filings — secured-party search across NY/NJ</li>
            <li>… and 36 more</li>
          </ol>
        </details>
      </section>
    </article>
  )
}

function QuickVettV2({ siteVersion, onSiteVersionChange, onSignOut }) {
  const [page, setPage] = useState('home')
  const [colorway, setColorway] = useState('plain')
  const [darkMode, setDarkMode] = useState(false)
  const [globalFont, setGlobalFont] = useState('helvetica-neue')
  const [logoFont, setLogoFont] = useState('montserrat')
  const [ownerName, setOwnerName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [historyQuery, setHistoryQuery] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [headerOwner, setHeaderOwner] = useState('')
  const [headerBusiness, setHeaderBusiness] = useState('')
  const pageContentRef = useRef(null)
  const isInitialPagePaint = useRef(true)

  const PAGE_FADE_DURATION = 0.18

  const suggestionChips = [
    { id: 'open-court', label: 'Open court matters', owner: '', business: 'Khera brothers inc' },
    { id: 'stacking', label: 'Stacking & ACH risk', owner: 'Rajiv Khera', business: 'Khera brothers inc' },
    { id: 'ein', label: 'EIN + linked entities', owner: '', business: 'Blue Harbor Holdings' },
    { id: 'deep', label: 'Full intelligence pass', owner: '', business: 'Northbridge Funding Group' },
    { id: 'datamerch', label: 'DataMerch only', owner: '', business: 'Vox Funding' },
    { id: 'guarantor', label: 'Personal guaranty search', owner: 'Anika Khera', business: '' },
  ]

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

  const applySuggestionChip = (chip) => {
    setOwnerName(chip.owner ?? '')
    setBusinessName(chip.business ?? '')
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

  return (
    <div
      className={`app-shell app-shell--v2 theme-${activeTheme} font-${globalFont}${
        page === 'home' ? ' app-shell--v2-home' : ''
      }`}
    >
      <div className="workspace page-shell" ref={pageContentRef}>
        {page === 'home' ? (
          <main className="main-area main-area--v2-chat">
            <header className="v2-chat-topbar">
              <div className="v2-chat-topbar-start">
                <a href="#" className="about-link v2-about-link">
                  About
                </a>
                <div className="v2-dev-tools" aria-label="Demo appearance controls">
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
                  <SiteVersionSelect value={siteVersion} onChange={onSiteVersionChange} />
                </div>
              </div>
              <div className="top-right-tools v2-top-right-tools">
                {onSignOut ? (
                  <button
                    type="button"
                    className="toolbar-text-btn"
                    onClick={onSignOut}
                    aria-label="Sign out"
                  >
                    Sign out
                  </button>
                ) : null}
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
            </header>

            <div className="v2-chat-body">
              <div className="v2-chat-brand">
                <h1 className={`v2-chat-brand-title logo-font-${logoFont}`}>
                  <span className="material-symbols-outlined ui-icon v2-chat-brand-icon" aria-hidden="true">
                    shield
                  </span>
                  <span>QuickVett</span>
                </h1>
                <p className="v2-chat-brand-sub">Assistant</p>
              </div>

              <div className="v2-chat-thread">
                <div className="v2-msg v2-msg--assistant">
                  <div className="v2-msg-avatar" aria-hidden="true">
                    <span className="material-symbols-outlined ui-icon">smart_toy</span>
                  </div>
                  <div className="v2-msg-bubble">
                    <p className="v2-msg-text">
                      Tell me who to research. I will pull <strong>DataMerch</strong>,{' '}
                      <strong>court history</strong>, and a <strong>deep intelligence</strong> pass
                      when you run a check. Add an owner, a business, or both — then send.
                    </p>
                  </div>
                </div>

                <div className="v2-suggestions" role="group" aria-label="Suggested checks">
                  {suggestionChips.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      className="v2-suggestion-chip"
                      onClick={() => applySuggestionChip(chip)}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <section className="v2-history-panel" aria-label="Search history">
                  <div className="v2-history-panel-header">
                    <p className="history-label">Recent</p>
                    <div className="history-filter v2-history-filter">
                      <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                        search
                      </span>
                      <input
                        type="text"
                        value={historyQuery}
                        onChange={(event) => setHistoryQuery(event.target.value)}
                        placeholder="Filter"
                        aria-label="Filter search history"
                      />
                    </div>
                  </div>
                  <div className="history-list v2-history-list">
                    {filteredHistory.map((entry) => (
                      <button
                        key={entry}
                        type="button"
                        className="history-card v2-history-card"
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
            </div>

            <div className="v2-chat-dock">
              <div className="v2-composer" role="search">
                <div className="v2-composer-fields">
                  <div className="v2-composer-field">
                    <span className="material-symbols-outlined ui-icon v2-composer-field-icon" aria-hidden="true">
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
                  <span className="v2-composer-divider" aria-hidden="true" />
                  <div className="v2-composer-field">
                    <span className="material-symbols-outlined ui-icon v2-composer-field-icon" aria-hidden="true">
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
                <button
                  type="button"
                  className="v2-composer-send"
                  onClick={openResultsPage}
                  disabled={!ownerName.trim() && !businessName.trim()}
                  aria-label="Run check"
                >
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    arrow_upward
                  </span>
                </button>
              </div>
              <p className="v2-chat-disclaimer">
                Demo data only. Not legal advice. Results are for underwriting review.
              </p>
              <div className="v2-chat-legal" aria-label="Legal links">
                <a href="#">Terms</a>
                <span aria-hidden="true">·</span>
                <a href="#">Privacy</a>
                <span aria-hidden="true">·</span>
                <a href="#">Cookies</a>
              </div>
            </div>
          </main>
        ) : (
          <div className={`results-layout${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
            <aside className="results-sidebar">
              {sidebarCollapsed ? (
                <div className="results-sidebar-header">
                  <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={() => setSidebarCollapsed((prev) => !prev)}
                    aria-label="Expand sidebar"
                    aria-expanded={false}
                  >
                    <span className="sidebar-toggle-glyph" aria-hidden="true">
                      left_panel_open
                    </span>
                  </button>
                </div>
              ) : null}
              <div className="results-sidebar-panel" aria-hidden={sidebarCollapsed}>
              <div className="results-history">
                <div className="results-history-filter-row">
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
                  <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={() => setSidebarCollapsed((prev) => !prev)}
                    aria-label="Collapse sidebar"
                    aria-expanded={true}
                  >
                    <span className="sidebar-toggle-glyph" aria-hidden="true">
                      left_panel_close
                    </span>
                  </button>
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
                <button type="button" className="footer-item account-item">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    account_circle
                  </span>
                  <span>Account</span>
                </button>
                <button type="button" className="footer-item">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    help
                  </span>
                  <span>Help</span>
                </button>
              </div>
              </div>
            </aside>

            <main className="results-main">
              <div className="results-header-strip">
                <div className="results-header-row">
                  <button
                    type="button"
                    className="sidebar-toggle sidebar-toggle-mobile-expand"
                    onClick={() => setSidebarCollapsed((prev) => !prev)}
                    aria-label="Expand sidebar"
                    aria-expanded={false}
                  >
                    <span className="sidebar-toggle-glyph" aria-hidden="true">
                      left_panel_open
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
                    {onSignOut ? (
                      <button
                        type="button"
                        className="toolbar-text-btn"
                        onClick={onSignOut}
                        aria-label="Sign out"
                      >
                        Sign out
                      </button>
                    ) : null}
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
                    <HeaderBrand logoFont={logoFont} onClick={openHomePage} />
                  </div>
                </div>

              </div>

              <div className="results-content">
                <DataMerchCard businessName={businessName} />
                <DefaultHistoryCard businessName={businessName} />
                <DeepSearchCard businessName={businessName} />
              </div>
            </main>
          </div>
        )}
      </div>

      {page === 'results' ? (
        <div className="bottom-left-controls bottom-left-controls--results-overlay">
          <SiteVersionSelect value={siteVersion} onChange={onSiteVersionChange} />
        </div>
      ) : null}

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
        {page === 'home' ? null : (
          <>
            <a href="#">Terms</a>
            <span>•</span>
            <a href="#">Privacy</a>
            <span>•</span>
            <a href="#">Cookies</a>
          </>
        )}
      </footer>

    </div>
  )
}

export default QuickVettV2
