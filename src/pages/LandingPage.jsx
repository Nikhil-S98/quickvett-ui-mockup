import { useId } from 'react'
import { Link } from 'react-router-dom'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'
import RevealSection from '../components/RevealSection.jsx'

/** Hero footnotes — few words, no chrome. */
const heroSignalTiles = [
  { key: 'courts', label: 'Dockets & filings' },
  { key: 'records', label: '100M+ records' },
  { key: 'speed', label: 'Minutes, not hours' },
  { key: 'sources', label: '12+ sources' },
]
const coverageItems = [
  { label: 'Lawsuits & Judgments', icon: 'gavel' },
  { label: 'Defaults & Bankruptcies', icon: 'account_balance' },
  { label: 'Background Checks', icon: 'badge' },
  { label: 'UCC & NYSCEF Filings', icon: 'description' },
  { label: 'Corporate Records', icon: 'apartment' },
  { label: 'Social Media Intel', icon: 'public' },
]

const enterpriseBadges = [
  { title: 'SOC 2 Type II', detail: 'Audited annually', icon: 'verified_user' },
  { title: 'ISO 27001', detail: 'Certified', icon: 'shield' },
  { title: 'GDPR Compliant', detail: 'Data protection', icon: 'lock' },
  { title: 'CCPA Ready', detail: 'Privacy first', icon: 'privacy_tip' },
]

const steps = [
  {
    num: '01',
    icon: 'edit_note',
    heading: 'Enter Merchant',
    body: "Company name + owner name. That's all we need.",
  },
  {
    num: '02',
    icon: 'travel_explore',
    heading: 'AI Scans Everything',
    body: '12+ sources queried simultaneously. Full report in under 5 minutes.',
  },
  {
    num: '03',
    icon: 'folder_special',
    heading: 'Get the Dossier',
    body: 'Every fact, sourced and cited. You make the call.',
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
              <ul className="public-landing-hero-signals" aria-label="At a glance">
                {heroSignalTiles.map((item) => (
                  <li key={item.key} className="public-landing-hero-signal">
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </header>
          <button
            type="button"
            className="public-landing-hero-scroll-hint"
            onClick={() =>
              document.getElementById('landing-next')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            aria-label="Scroll to how it works"
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

      {/* How it works */}
      <RevealSection
        id="landing-next"
        className="public-landing-band public-landing-band--soft"
        aria-labelledby="landing-how-heading"
      >
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 01 /</span>
              <span className="public-landing-kicker-text">How it works</span>
            </p>
            <h2 id="landing-how-heading" className="public-landing-heading">
              Three Steps to Total Clarity
            </h2>
            <p className="public-landing-deck">
              From merchant name to full intelligence dossier — in seconds.
            </p>
          </div>
          <ol className="public-landing-steps public-steps public-steps--landing">
            {steps.map((step) => (
              <li key={step.num} className="public-step public-step--card">
                <div className="public-step-aside">
                  <span className="material-symbols-outlined ui-icon public-step-leading-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <span className="public-step-num" aria-hidden="true">
                    {step.num}
                  </span>
                </div>
                <div className="public-step-main">
                  <h3 className="public-step-heading">{step.heading}</h3>
                  <p className="public-step-body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </RevealSection>

      {/* Coverage */}
      <RevealSection className="public-landing-band public-landing-band--base" aria-labelledby="landing-coverage-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 02 /</span>
              <span className="public-landing-kicker-text">Intelligence coverage</span>
            </p>
            <h2 id="landing-coverage-heading" className="public-landing-heading">
              We Leave Nothing Unchecked
            </h2>
            <p className="public-landing-deck">
              12+ data sources including NYSCEF, UniCourt, Datamerch, and deep web intelligence.
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
        </div>
      </RevealSection>

      {/* Enterprise */}
      <RevealSection className="public-landing-band public-landing-band--surface" aria-labelledby="landing-enterprise-heading">
        <div className="public-landing-inner">
          <div className="public-landing-section-head">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">— 03 /</span>
              <span className="public-landing-kicker-text">Enterprise grade</span>
            </p>
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
        </div>
      </RevealSection>

      {/* Finale CTA */}
      <RevealSection className="public-landing-band public-landing-band--cta" aria-labelledby="landing-finale-heading">
        <div className="public-landing-inner">
          <div className="public-landing-finale">
            <p className="public-landing-kicker public-landing-kicker--on-dark public-landing-kicker--finale">
              <span className="public-landing-kicker-index">— 04 /</span>
              <span className="public-landing-kicker-text">Know Before You Fund</span>
            </p>
            <h2 id="landing-finale-heading" className="public-landing-heading public-landing-heading--finale">
              We Show You the Facts. You Make the Call.
            </h2>
            <p className="public-landing-finale-lead">
              The same consolidated view in your workspace—sources cited, underwriting decision stays yours.
            </p>
            <div className="public-landing-finale-actions">
              <Link to="/sign-in" className="landing-btn landing-btn--cta-solid landing-btn--with-icon">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  rocket_launch
                </span>
                Get started
              </Link>
              <Link to="/pricing" className="landing-btn landing-btn--cta-outline landing-btn--with-icon">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  payments
                </span>
                View pricing
              </Link>
            </div>
            <PublicLegalFooter className="public-footer public-footer--landing-finale" />
          </div>
        </div>
      </RevealSection>
    </div>
  )
}
