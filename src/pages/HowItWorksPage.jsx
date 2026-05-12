import { Link } from 'react-router-dom'
import GsapReveal from '../components/GsapReveal.jsx'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'

const howMetrics = [
  { key: 'time', icon: 'timer', stat: '< 5 min', label: 'Typical full report turnaround' },
  { key: 'sources', icon: 'hub', stat: '12+', label: 'Sources cross-checked per dossier' },
  { key: 'records', icon: 'database', stat: '100M+', label: 'Public records indexed for lookup' },
  { key: 'cited', icon: 'task_alt', stat: 'Cited', label: 'Every line tied to a source' },
]

const howSteps = [
  {
    num: '01',
    icon: 'edit_note',
    heading: 'Enter the merchant',
    body: 'Company name and owner name are enough to anchor the dossier. We normalize spelling and resolve entities before any pulls run.',
    whatHappens: [
      'Normalize merchant and principal names against SOS and commercial registers.',
      'Open a scoped workspace for this merchant with audit-friendly run history.',
      'Queue parallel queries across court, credit, and open-web providers.',
      'Show a live status strip so you see progress instead of a blank wait.',
    ],
  },
  {
    num: '02',
    icon: 'travel_explore',
    heading: 'AI scans everything',
    body: 'Twelve-plus feeds run together—dockets, defaults, corporate filings, and curated web context—then reconcile into one timeline.',
    whatHappens: [
      'Hit UniCourt, state portals, Datamerch, and proprietary indexes in parallel.',
      'Deduplicate hits and rank by relevance to the merchant and principals.',
      'Flag conflicts (name collisions, stale addresses) for reviewer attention.',
      'Stream partial results into the dossier as each provider responds.',
    ],
  },
  {
    num: '03',
    icon: 'folder_special',
    heading: 'Get the full dossier',
    body: 'You receive a single narrative view with citations, not a folder of PDFs. Export or revisit any run from history without losing context.',
    whatHappens: [
      'Assemble a cited report with deep links back to each primary source.',
      'Preserve query parameters and timestamps for compliance review.',
      'Keep the underwriting decision outside the system—facts only, no score.',
      'Let you reopen, diff, or append notes on any historical run.',
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="public-how">
      <GsapReveal
        as="section"
        className="public-how-band public-how-band--base"
        aria-labelledby="how-page-heading"
      >
        <div className="public-landing-inner">
          <div className="public-how-hero">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">—</span>
              <span className="public-landing-kicker-text">How it works</span>
            </p>
            <h1 id="how-page-heading" className="public-how-hero-title">
              Three Steps to <em className="public-how-hero-title-em">Total Clarity</em>
            </h1>
            <p className="public-how-hero-deck">
              From a merchant name to a sourced intelligence dossier—parallel pulls, normalized timelines, and
              citations you can defend in committee.
            </p>
          </div>
        </div>
      </GsapReveal>

      <section className="public-how-band public-how-band--alt" aria-label="At a glance metrics">
        <GsapReveal className="public-landing-inner" stagger=".public-how-metric">
          <div className="public-how-metrics">
            {howMetrics.map((m) => (
              <article key={m.key} className="public-how-metric">
                <span className="material-symbols-outlined ui-icon public-how-metric-icon" aria-hidden="true">
                  {m.icon}
                </span>
                <p className="public-how-metric-stat">{m.stat}</p>
                <p className="public-how-metric-label">{m.label}</p>
              </article>
            ))}
          </div>
        </GsapReveal>
      </section>

      {howSteps.map((step, i) => (
        <section
          key={step.num}
          className={`public-how-band ${i % 2 === 0 ? 'public-how-band--base' : 'public-how-band--alt'}`}
          aria-labelledby={`how-step-${step.num}-heading`}
        >
          <GsapReveal className="public-landing-inner" stagger=".public-how-step-row > *">
            <div className={`public-how-step-row${i % 2 === 1 ? ' public-how-step-row--flip' : ''}`}>
              <div className="public-how-step-main">
                <div className="public-how-step-meta">
                  <span className="material-symbols-outlined ui-icon public-how-step-icon" aria-hidden="true">
                    {step.icon}
                  </span>
                  <span className="public-how-step-num" aria-hidden="true">
                    {step.num}
                  </span>
                </div>
                <h2 id={`how-step-${step.num}-heading`} className="public-how-step-heading">
                  {step.heading}
                </h2>
                <p className="public-how-step-body">{step.body}</p>
              </div>
              <aside className="public-how-wh-card" aria-label={`What happens in step ${step.num}`}>
                <p className="public-how-wh-kicker">What happens</p>
                <ul className="public-how-wh-list">
                  {step.whatHappens.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </aside>
            </div>
          </GsapReveal>
        </section>
      ))}

      <GsapReveal
        as="section"
        className="public-landing-band public-landing-band--cta public-how-final-cta"
        aria-labelledby="how-cta-heading"
      >
        <div className="public-landing-inner">
          <div className="public-landing-finale">
            <h2 id="how-cta-heading" className="public-landing-heading public-landing-heading--finale">
              Ready to See the <em className="public-how-cta-em">Facts?</em>
            </h2>
            <p className="public-landing-finale-lead">
              Sign in to run a merchant in your workspace, or review pricing before you roll it out to the team.
            </p>
            <div className="public-landing-finale-actions">
              <Link to="/sign-in" className="landing-btn landing-btn--cta-solid landing-btn--with-icon">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  arrow_forward
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
      </GsapReveal>
    </div>
  )
}
