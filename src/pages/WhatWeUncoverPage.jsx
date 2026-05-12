import { Link } from 'react-router-dom'
import GsapReveal from '../components/GsapReveal.jsx'
import PublicLegalFooter from '../components/PublicLegalFooter.jsx'

const SOURCE_ITEMS = [
  {
    icon: 'gavel',
    title: 'UniCourt',
    body: 'Federal and state court dockets, filings, and outcomes.',
  },
  {
    icon: 'folder_open',
    title: 'NYSCEF',
    body: 'New York State Courts Electronic Filing where applicable.',
  },
  {
    icon: 'warning_amber',
    title: 'Datamerch',
    body: 'Industry risk notes and merchant-level signals.',
  },
  {
    icon: 'verified_user',
    title: 'Commercial background',
    body: 'Thomson Reuters–class identity and adverse-history screening.',
  },
  {
    icon: 'travel_explore',
    title: 'Deep search',
    body: 'Open-web intelligence beyond a single database.',
  },
  {
    icon: 'apartment',
    title: 'Corporate registries',
    body: 'Secretary of state filings, officers, and registered agents.',
  },
  {
    icon: 'hub',
    title: 'Social intel',
    body: 'Public social footprint and connected profiles.',
  },
  {
    icon: 'newspaper',
    title: 'Media monitoring',
    body: 'News, regulatory actions, and sanctions-style lists.',
  },
]

const COURT_LEGAL = {
  id: 'court-legal',
  label: 'Court & legal intelligence',
  deck: 'Every lawsuit, judgment, and filing — extracted and analysed in one place.',
  cards: [
    {
      icon: 'balance',
      title: 'Lawsuits & judgments',
      body: 'Active and historical litigation, funding amounts, judgment details, and party roles.',
    },
    {
      icon: 'money_off',
      title: 'Defaults & bankruptcies',
      body: 'Prior MCA defaults, Chapter 7/11 filings, and delinquency records where available.',
    },
    {
      icon: 'description',
      title: 'UCC filings',
      body: 'Active liens, secured parties, collateral types, and filing timelines.',
    },
    {
      icon: 'folder_special',
      title: 'NYSCEF records',
      body: 'Direct integration with NY State Courts Electronic Filing for eligible matters.',
    },
  ],
}

const BACKGROUND_IDENTITY = {
  id: 'background-identity',
  label: 'Background & identity',
  deck: 'Know exactly who you are dealing with — no surprises at funding.',
  cards: [
    {
      icon: 'shield_person',
      title: 'Background checks',
      body: 'Criminal records and adverse history via Thomson Reuters–class sources.',
    },
    {
      icon: 'badge',
      title: 'Identity verification',
      body: 'SSN trace, address history, alias detection, and name variations.',
    },
    {
      icon: 'groups',
      title: 'Family & associate links',
      body: 'Connected individuals, shared addresses, and business partners.',
    },
    {
      icon: 'campaign',
      title: 'Adverse media screening',
      body: 'News articles, regulatory actions, and sanctions-style coverage.',
    },
  ],
}

const CORPORATE_DIGITAL = {
  id: 'corporate-digital',
  label: 'Corporate & digital intelligence',
  deck: 'Every entity, every digital footprint, every connection we can surface.',
  cards: [
    {
      icon: 'domain',
      title: 'LLC & corporate records',
      body: 'Formation history, name changes, status, and registered agents.',
    },
    {
      icon: 'account_tree',
      title: 'Entity network mapping',
      body: 'Connections between entities, owners, and addresses in your report.',
    },
    {
      icon: 'public',
      title: 'Social media intel',
      body: 'Digital footprint analysis, lifestyle signals, and public posts.',
    },
    {
      icon: 'notifications_active',
      title: 'Datamerch alerts',
      body: 'Industry-specific merchant risk notes and flags from the MCA community.',
    },
  ],
}

const CATEGORY_SECTIONS = [COURT_LEGAL, BACKGROUND_IDENTITY, CORPORATE_DIGITAL]

export default function WhatWeUncoverPage() {
  return (
    <div className="public-uncover-page">
      <GsapReveal
        as="section"
        className="public-uncover-band public-uncover-band--hero"
        aria-labelledby="uncover-heading"
      >
        <div className="public-landing-inner">
          <div className="public-uncover-hero">
            <p className="public-landing-kicker">Complete intelligence coverage</p>
            <h1 id="uncover-heading" className="public-uncover-hero-title">
              We Leave <span className="public-uncover-title-accent">Nothing</span> Unchecked
            </h1>
            <p className="public-uncover-deck">
              Every data point. Every record. Every connection. Our models surface risk signals that
              manual underwriting often misses — delivered in a structured, defensible report.
            </p>
          </div>
        </div>
      </GsapReveal>

      <section
        className="public-uncover-band public-uncover-band--sources"
        aria-labelledby="uncover-sources-heading"
      >
        <div className="public-landing-inner">
          <p id="uncover-sources-heading" className="public-uncover-section-label">
            Intelligence sources
          </p>
          <GsapReveal
            as="div"
            className="public-uncover-sources-grid"
            stagger=".public-uncover-source-card"
          >
            {SOURCE_ITEMS.map((item) => (
              <article key={item.title} className="public-uncover-source-card">
                <span className="material-symbols-outlined public-uncover-source-icon" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="public-uncover-source-title">{item.title}</h3>
                <p className="public-uncover-source-body">{item.body}</p>
              </article>
            ))}
          </GsapReveal>
        </div>
      </section>

      {CATEGORY_SECTIONS.map((block) => (
        <section
          key={block.id}
          className="public-uncover-band public-uncover-band--category"
          aria-labelledby={`${block.id}-heading`}
        >
          <div className="public-landing-inner">
            <header className="public-uncover-category-head">
              <h2 id={`${block.id}-heading`} className="public-uncover-category-title">
                {block.label}
              </h2>
              <p className="public-uncover-category-deck">{block.deck}</p>
            </header>
            <GsapReveal
              as="div"
              className="public-uncover-feature-grid"
              stagger=".public-uncover-feature-card"
            >
              {block.cards.map((card) => (
                <article key={card.title} className="public-uncover-feature-card">
                  <span className="material-symbols-outlined public-uncover-feature-icon" aria-hidden>
                    {card.icon}
                  </span>
                  <h3 className="public-uncover-feature-title">{card.title}</h3>
                  <p className="public-uncover-feature-body">{card.body}</p>
                </article>
              ))}
            </GsapReveal>
          </div>
        </section>
      ))}

      <GsapReveal
        as="section"
        className="public-landing-band public-landing-band--cta public-uncover-cta"
        aria-labelledby="uncover-cta-heading"
      >
        <div className="public-landing-inner">
          <div className="public-landing-finale">
            <h2 id="uncover-cta-heading" className="public-landing-finale-title">
              The Facts. <span className="public-landing-finale-accent">On a Plate.</span>
            </h2>
            <p className="public-landing-finale-deck">
              Stop guessing. Start knowing. Every piece of intelligence delivered in a structured,
              actionable report.
            </p>
            <div className="public-landing-finale-actions">
              <Link className="public-landing-cta-btn" to="/contact">
                Request access
                <span className="material-symbols-outlined" aria-hidden>
                  arrow_forward
                </span>
              </Link>
              <Link className="public-landing-cta-ghost" to="/how-it-works">
                See how it works
              </Link>
            </div>
            <PublicLegalFooter className="public-footer public-footer--landing-finale" />
          </div>
        </div>
      </GsapReveal>
    </div>
  )
}
