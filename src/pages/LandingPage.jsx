import { useId } from 'react'
import { Link } from 'react-router-dom'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'
import RevealSection from '../components/RevealSection.jsx'

const statsRow = [
  { key: 'sources', stat: '50+', label: 'Data sources' },
  { key: 'records', stat: '100M+', label: 'Records scanned' },
  { key: 'speed', stat: '< 5 min', label: 'Full report' },
  { key: 'points', stat: '12+', label: 'Data points per dossier' },
]

const steps = [
  {
    num: '01',
    icon: 'send',
    heading: 'Submit request',
    body: 'Enter the merchant and principals you need underwritten. One form anchors every downstream pull.',
  },
  {
    num: '02',
    icon: 'travel_explore',
    heading: 'AI scans everything',
    body: 'Court dockets, defaults, corporate filings, credit signals, and open-web context run in parallel—normalized into one timeline.',
  },
  {
    num: '03',
    icon: 'description',
    heading: 'Get the report',
    body: 'A cited dossier with deep links to sources—not screenshots. Reopen, export, or compare runs from your workspace history.',
  },
]

const coverageItems = [
  { label: 'Identity & principals', icon: 'badge' },
  { label: 'Civil dockets & judgments', icon: 'gavel' },
  { label: 'Criminal & sanctions', icon: 'policy' },
  { label: 'Employment & corporate ties', icon: 'corporate_fare' },
  { label: 'Credit & merchant defaults', icon: 'account_balance' },
  { label: 'UCC, liens & public records', icon: 'folder_open' },
]

const enterpriseBadges = [
  { title: 'SOC 2 Type II', detail: 'Audited annually', icon: 'verified_user' },
  { title: 'ISO 27001', detail: 'Certified', icon: 'shield' },
  { title: 'GDPR aligned', detail: 'Data protection', icon: 'lock' },
  { title: 'CCPA ready', detail: 'Privacy first', icon: 'privacy_tip' },
]

const trustSpecs = [
  'TLS 1.2+ in transit; encryption at rest for stored dossiers and attachments.',
  'Role-based access, SSO-ready patterns, and per-run audit trails for exports.',
  'Provider credentials isolated from workspace UI; no merchant data sold or remarketed.',
  'Configurable retention windows to match your credit policy and legal hold process.',
]

const previewChecks = [
  {
    name: 'Civil dockets & judgments',
    status: 'clear',
    summary: 'No open suits matched merchant or registered principals in indexed courts.',
    source: 'UniCourt · state portals',
  },
  {
    name: 'Bankruptcies & defaults',
    status: 'action',
    summary: 'One affiliated entity shows a discharged Chapter 7 from 2019—flagged for analyst review.',
    source: 'PACER · Datamerch',
  },
  {
    name: 'Corporate & SOS standing',
    status: 'clear',
    summary: 'Active good standing; registered agent and address align with application.',
    source: 'SOS · OpenCorporates',
  },
]

export default function LandingPage() {
  const heroFluidFilterId = `landing-hero-fluid-${useId().replace(/:/g, '')}`

  return (
    <div className="public-landing">
      {/* Hero */}
      <section className="public-landing-band public-landing-band--hero" aria-label="Introduction">
        <div className="public-landing-hero-fx" aria-hidden="true">
          <svg className="public-landing-hero-fx__defs" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter
                id={heroFluidFilterId}
                x="-45%"
                y="-45%"
                width="190%"
                height="190%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.014 0.02"
                  numOctaves="3"
                  seed="4"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="18s"
                    values="0.014 0.02;0.028 0.012;0.01 0.03;0.022 0.018;0.014 0.02"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="26"
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="disp"
                >
                  <animate
                    attributeName="scale"
                    dur="14s"
                    values="22;38;26;42;24;38;22"
                    repeatCount="indefinite"
                  />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>
          <div
            className="public-landing-hero-fx__plate"
            style={{ filter: `url(#${heroFluidFilterId})` }}
          />
        </div>
        <div className="public-landing-inner public-landing-inner--hero">
          <header className="public-landing-hero">
            <h1 className="public-landing-visually-hidden">QuickVett</h1>
            <div className="public-landing-hero-top">
              <div className="public-landing-hero-stack">
                <div className="public-landing-hero-brand logo-font-helvetica-neue" aria-label="QuickVett">
                  <span className="material-symbols-outlined ui-icon logo-icon" aria-hidden="true">
                    shield
                  </span>
                  <span className="public-landing-hero-brand-wordmark">QuickVett</span>
                </div>
                <p className="public-landing-hero-tagline">
                  Merchant cash advance and ISO underwriting intelligence Sourced, cited, and ready for your committee.
                </p>
              </div>
            </div>
            <div className="public-landing-hero-bottom">
              <div className="public-landing-hero-actions">
                <Link to="/sign-in" className="landing-btn landing-btn--primary landing-btn--with-icon">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    login
                  </span>
                  Sign in to workspace
                </Link>
                <Link to="/how-it-works" className="landing-btn landing-btn--ghost landing-btn--with-icon">
                  <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                    help
                  </span>
                  How it works
                </Link>
              </div>
            </div>
          </header>
          <button
            type="button"
            className="public-landing-hero-scroll-hint"
            onClick={() =>
              document.getElementById('landing-next')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            aria-label="Scroll to overview"
          >
            <span className="public-landing-hero-scroll-hint-line" aria-hidden="true" />
            <span className="public-landing-hero-scroll-hint-label">Scroll for overview</span>
            <span
              className="material-symbols-outlined ui-icon public-landing-hero-scroll-hint-chevron"
              aria-hidden="true"
            >
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </section>

      {/* Stats */}
      <RevealSection
        id="landing-next"
        className="public-landing-band public-landing-band--base"
        aria-label="Key metrics"
      >
        <div className="public-landing-inner">
          <ul className="public-landing-stats">
            {statsRow.map((row) => (
              <li key={row.key} className="public-landing-stat">
                <p className="public-landing-stat-value">{row.stat}</p>
                <p className="public-landing-stat-label">{row.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* Three steps */}
      <RevealSection className="public-landing-band public-landing-band--soft" aria-labelledby="landing-how-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 01 /</span>
              <span className="public-landing-kicker-text">How it works</span>
            </p>
            <h2 id="landing-how-heading" className="public-landing-heading">
              Three Steps to{' '}
              <span className="public-landing-title-accent">Total Clarity</span>
            </h2>
            <p className="public-landing-deck">
              From submission to cited dossier—built for MCA shops, banks, and risk teams that cannot miss a signal.
            </p>
          </div>
          <ul className="public-landing-steps-promo">
            {steps.map((step) => (
              <li key={step.num} className="public-landing-promo-step">
                <span className="public-landing-promo-step-num" aria-hidden="true">
                  {step.num}
                </span>
                <span className="material-symbols-outlined ui-icon public-landing-promo-step-icon" aria-hidden="true">
                  {step.icon}
                </span>
                <h3 className="public-landing-promo-step-heading">{step.heading}</h3>
                <p className="public-landing-promo-step-body">{step.body}</p>
              </li>
            ))}
          </ul>
          <div className="public-landing-inline-cta">
            <Link to="/how-it-works" className="landing-btn landing-btn--ghost landing-btn--with-icon">
              <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                arrow_forward
              </span>
              Learn more
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* Coverage */}
      <RevealSection className="public-landing-band public-landing-band--base" aria-labelledby="landing-coverage-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 02 /</span>
              <span className="public-landing-kicker-text">Coverage</span>
            </p>
            <h2 id="landing-coverage-heading" className="public-landing-heading">
              We Leave <span className="public-landing-title-accent">Nothing Unchecked</span>
            </h2>
            <p className="public-landing-deck">
              Court, credit, corporate, and open-web signals—cross-referenced automatically on every merchant search.
            </p>
          </div>
          <ul className="public-coverage-list">
            {coverageItems.map((item) => (
              <li key={item.label}>
                <span className="material-symbols-outlined ui-icon public-coverage-icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
          <div className="public-landing-inline-cta">
            <Link to="/what-we-uncover" className="landing-btn landing-btn--primary landing-btn--with-icon">
              <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                visibility
              </span>
              See full coverage
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* Product preview */}
      <RevealSection className="public-landing-band public-landing-band--soft" aria-labelledby="landing-preview-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 03 /</span>
              <span className="public-landing-kicker-text">Inside the dossier</span>
            </p>
            <h2 id="landing-preview-heading" className="public-landing-heading">
              See What the Platform{' '}
              <span className="public-landing-title-accent">Actually Surfaces</span>
            </h2>
            <p className="public-landing-deck">
              A read-only preview of how findings appear in workspace—status chips, summaries, and source deep links.
            </p>
          </div>
          <div className="public-landing-preview">
            <div className="public-landing-preview-chrome">
              <span className="public-landing-preview-chrome-title">Merchant dossier</span>
              <span className="public-landing-preview-chrome-pill">Workspace preview</span>
            </div>
            <div className="public-landing-preview-body">
              <ul className="public-landing-preview-list">
                {previewChecks.map((row) => (
                  <li key={row.name} className="public-landing-preview-row">
                    <div className="public-landing-preview-row-main">
                      <span className="public-landing-preview-name">{row.name}</span>
                      <span
                        className={`public-landing-preview-badge public-landing-preview-badge--${row.status}`}
                      >
                        {row.status === 'clear' ? 'Clear' : 'Review'}
                      </span>
                    </div>
                    <p className="public-landing-preview-summary">{row.summary}</p>
                    <p className="public-landing-preview-source">{row.source}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="public-landing-preview-banner">
              We show you everything so that you can make the call.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Enterprise + spec */}
      <RevealSection className="public-landing-band public-landing-band--surface" aria-labelledby="landing-enterprise-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 04 /</span>
              <span className="public-landing-kicker-text">Enterprise grade</span>
            </p>
            <h2 id="landing-enterprise-heading" className="public-landing-heading">
              Built for Lenders Who{' '}
              <span className="public-landing-title-accent">Can&apos;t Afford Mistakes</span>
            </h2>
            <p className="public-landing-deck">
              Controls and attestations your risk committee expects—without slowing originations.
            </p>
          </div>
          <div className="public-compliance-grid">
            {enterpriseBadges.map((item) => (
              <article key={item.title} className="public-compliance-cell">
                <div className="public-compliance-head">
                  <span className="material-symbols-outlined ui-icon public-compliance-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <p className="public-compliance-title">{item.title}</p>
                </div>
                <p className="public-compliance-detail">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="public-landing-trust-spec">
            <p className="public-landing-trust-spec-kicker">Security &amp; operations</p>
            <ul className="public-landing-trust-spec-list">
              {trustSpecs.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </RevealSection>

      {/* Finale CTA */}
      <RevealSection className="public-landing-band public-landing-band--cta" aria-labelledby="landing-finale-heading">
        <div className="public-landing-inner">
          <div className="public-landing-finale">
            <p className="public-landing-kicker public-landing-kicker--on-dark public-landing-kicker--finale">
              <span className="public-landing-kicker-index">— 05 /</span>
              <span className="public-landing-kicker-text">Know before you fund</span>
            </p>
            <h2 id="landing-finale-heading" className="public-landing-heading public-landing-heading--finale">
              We Show You the Facts.{' '}
              <span className="public-landing-finale-accent">You Make the Call.</span>
            </h2>
            <p className="public-landing-finale-lead">
              Request access for your team or sign in to run the next merchant in your workspace.
            </p>
            <div className="public-landing-finale-actions">
              <Link to="/contact" className="landing-btn landing-btn--cta-solid landing-btn--with-icon">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  outgoing_mail
                </span>
                Request access
              </Link>
              <Link to="/sign-in" className="landing-btn landing-btn--cta-outline landing-btn--with-icon">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  search
                </span>
                Sign in to workspace
              </Link>
            </div>
            <PublicLegalFooter className="public-footer public-footer--landing-finale" />
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
