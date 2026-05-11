import { Link } from 'react-router-dom'

const stats = [
  { value: '50+', label: 'State Jurisdictions', hint: 'Federal & state courts' },
  { value: '100M+', label: 'Records Indexed', hint: 'Searchable in real-time' },
  { value: '<5 min', label: 'Full Report', hint: 'Complete intelligence dossier' },
  { value: '12+', label: 'Data Sources', hint: 'Cross-referenced per search' },
]

const coverageItems = [
  'Lawsuits & Judgments',
  'Defaults & Bankruptcies',
  'Background Checks',
  'UCC & NYSCEF Filings',
  'Corporate Records',
  'Social Media Intel',
]

const enterpriseBadges = [
  { title: 'SOC 2 Type II', detail: 'Audited annually' },
  { title: 'ISO 27001', detail: 'Certified' },
  { title: 'GDPR Compliant', detail: 'Data protection' },
  { title: 'CCPA Ready', detail: 'Privacy first' },
]

export default function LandingPage() {
  return (
    <div className="public-landing">
      {/* Hero */}
      <section className="public-landing-band public-landing-band--hero" aria-label="Introduction">
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
              </div>
            </div>
            <div className="public-landing-hero-bottom">
              <div className="public-landing-hero-actions">
                <Link to="/sign-in" className="landing-btn landing-btn--primary">
                  Sign in to workspace
                </Link>
                <Link to="/how-it-works" className="landing-btn landing-btn--ghost">
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
            <span className="public-landing-hero-scroll-hint-label">
              Scroll for overview
            </span>
            <span
              className="material-symbols-outlined ui-icon public-landing-hero-scroll-hint-chevron"
              aria-hidden="true"
            >
              keyboard_arrow_down
            </span>
          </button>
        </div>
      </section>

      {/* Metrics */}
      <section
        id="landing-next"
        className="public-landing-band public-landing-band--base"
        aria-label="Product metrics"
      >
        <div className="public-landing-inner">
          <div className="public-stat-board">
            {stats.map((item) => (
              <article key={item.label} className="public-stat-cell">
                <p className="public-stat-value">{item.value}</p>
                <p className="public-stat-label">{item.label}</p>
                <p className="public-stat-hint">{item.hint}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="public-landing-band public-landing-band--soft" aria-labelledby="landing-how-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">How it works</p>
            <h2 id="landing-how-heading" className="public-landing-heading">
              Three Steps to Total Clarity
            </h2>
            <p className="public-landing-deck">
              From merchant name to full intelligence dossier — in seconds.
            </p>
          </div>
          <ol className="public-landing-steps public-steps public-steps--landing">
            <li className="public-step public-step--card">
              <span className="public-step-num" aria-hidden="true">
                01
              </span>
              <div>
                <h3 className="public-step-heading">Enter Merchant</h3>
                <p className="public-step-body">Company name + owner name. That&apos;s all we need.</p>
              </div>
            </li>
            <li className="public-step public-step--card">
              <span className="public-step-num" aria-hidden="true">
                02
              </span>
              <div>
                <h3 className="public-step-heading">AI Scans Everything</h3>
                <p className="public-step-body">
                  12+ sources queried simultaneously. Full report in under 5 minutes.
                </p>
              </div>
            </li>
            <li className="public-step public-step--card">
              <span className="public-step-num" aria-hidden="true">
                03
              </span>
              <div>
                <h3 className="public-step-heading">Get the Dossier</h3>
                <p className="public-step-body">Every fact, sourced and cited. You make the call.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Coverage */}
      <section className="public-landing-band public-landing-band--base" aria-labelledby="landing-coverage-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">Intelligence coverage</p>
            <h2 id="landing-coverage-heading" className="public-landing-heading">
              We Leave Nothing Unchecked
            </h2>
            <p className="public-landing-deck">
              12+ data sources including NYSCEF, UniCourt, Datamerch, and deep web intelligence.
            </p>
          </div>
          <ul className="public-coverage-list">
            {coverageItems.map((label) => (
              <li key={label}>
                <span className="public-coverage-dot" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Enterprise */}
      <section className="public-landing-band public-landing-band--surface" aria-labelledby="landing-enterprise-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">Enterprise grade</p>
            <h2 id="landing-enterprise-heading" className="public-landing-heading">
              Built for Lenders Who Can&apos;t Afford Mistakes
            </h2>
            <p className="public-landing-deck">
              Bank-grade security. Military-grade intelligence gathering. Your data is encrypted, audited,
              and never shared.
            </p>
          </div>
          <div className="public-compliance-grid">
            {enterpriseBadges.map((item) => (
              <article key={item.title} className="public-compliance-cell">
                <p className="public-compliance-title">{item.title}</p>
                <p className="public-compliance-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Finale CTA */}
      <section
        className="public-landing-band public-landing-band--cta"
        aria-labelledby="landing-finale-heading"
      >
        <div className="public-landing-inner">
          <div className="public-landing-finale">
            <p className="public-landing-kicker public-landing-kicker--on-dark">Know Before You Fund</p>
            <h2 id="landing-finale-heading" className="public-landing-heading public-landing-heading--finale">
              We Show You the Facts. You Make the Call.
            </h2>
            <p className="public-landing-finale-lead">
              The same consolidated view in your workspace—sources cited, underwriting decision stays yours.
            </p>
            <div className="public-landing-finale-actions">
              <Link to="/sign-in" className="landing-btn landing-btn--cta-solid">
                Get started
              </Link>
              <Link to="/pricing" className="landing-btn landing-btn--cta-outline">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
