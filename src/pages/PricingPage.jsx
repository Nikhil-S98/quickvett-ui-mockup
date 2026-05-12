import { Link } from 'react-router-dom'
import GsapReveal from '../components/GsapReveal.jsx'

const tiers = [
  {
    key: 'starter',
    icon: 'bolt',
    name: 'Starter',
    priceLine: 'Contact us',
    description: 'For individual brokers and small shops. Full intelligence on every deal.',
    features: [
      'Full merchant intelligence reports',
      'UniCourt + Datamerch + NYSCEF',
      'AI-powered summaries & risk scoring',
      'Up to 50 searches / month',
      'Email support',
    ],
    cta: { label: 'Get started', to: '/sign-in', primary: false },
    featured: false,
  },
  {
    key: 'professional',
    icon: 'folder_special',
    name: 'Professional',
    priceLine: 'Contact us',
    description: 'For growing MCA companies. Unlimited intelligence with team access.',
    features: [
      'Everything in Starter',
      'Unlimited searches',
      'Deep search + social intel',
      'Commercial background checks',
      'Team access (up to 10 users)',
      'API access',
      'Priority support',
      'Search history & audit trail',
    ],
    cta: { label: 'Request access', to: '/contact', primary: true },
    featured: true,
    popular: true,
  },
  {
    key: 'enterprise',
    icon: 'workspace_premium',
    name: 'Enterprise',
    priceLine: 'Custom',
    description: 'For large lenders and institutional funders. White-glove deployment.',
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Custom integrations & API',
      'Dedicated account manager',
      'Custom model tuning for your risk stack',
      'SLA-backed uptime',
      'SOC 2 reporting package',
      'On-premises deployment option',
    ],
    cta: { label: 'Contact sales', to: '/contact', primary: false },
    featured: false,
  },
]

const faqItems = [
  {
    q: 'How is QuickVett different from manual underwriting?',
    a: 'QuickVett scans 12+ data sources simultaneously—including NYSCEF, UniCourt, Datamerch, and open-web signals—in minutes. Manual underwriting takes hours and misses records. The platform surfaces what humans cannot reasonably pull by hand.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. Traffic is encrypted in transit; dossiers and exports are encrypted at rest. We align to SOC 2 Type II practices, support GDPR-style requests, and never sell or remarket your search data. Retention can be tuned to your policy.',
  },
  {
    q: 'Can I integrate QuickVett with my existing systems?',
    a: 'Professional and Enterprise include API access. We integrate with common CRM and LOS patterns in the MCA space; Enterprise adds custom connectors and deployment options.',
  },
  {
    q: 'What if QuickVett finds nothing?',
    a: 'That is still intelligence. A clean report with a full provenance trail lowers ambiguity on the file. Every run documents what was checked and what was returned—so you can defend the decision in committee.',
  },
]

export default function PricingPage() {
  return (
    <div className="public-pricing-page">
      <GsapReveal as="section" className="public-pricing-band public-pricing-band--hero" aria-labelledby="pricing-heading">
        <div className="public-landing-inner">
          <div className="public-pricing-hero">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">—</span>
              <span className="public-landing-kicker-text">Pricing</span>
            </p>
            <h1 id="pricing-heading" className="public-pricing-hero-title">
              Intelligence That <span className="public-landing-title-accent">Pays for Itself</span>
            </h1>
            <p className="public-pricing-hero-deck">
              One bad deal costs more than a year of QuickVett. Choose the plan that fits your operation.
            </p>
          </div>
        </div>
      </GsapReveal>

      <section className="public-pricing-band public-pricing-band--tiers" aria-label="Plans">
        <GsapReveal className="public-landing-inner" stagger=".public-pricing-tier">
          <div className="public-pricing-tiers">
            {tiers.map((tier) => (
              <article
                key={tier.key}
                className={`public-pricing-tier${tier.featured ? ' public-pricing-tier--featured' : ''}`}
              >
                {tier.popular ? (
                  <p className="public-pricing-tier-popular">Most popular</p>
                ) : null}
                <span className="material-symbols-outlined ui-icon public-pricing-tier-icon" aria-hidden="true">
                  {tier.icon}
                </span>
                <h2 className="public-pricing-tier-name">{tier.name}</h2>
                <p className="public-pricing-tier-price">{tier.priceLine}</p>
                <p className="public-pricing-tier-desc">{tier.description}</p>
                <ul className="public-pricing-tier-features">
                  {tier.features.map((line) => (
                    <li key={line}>
                      <span className="material-symbols-outlined ui-icon public-pricing-tier-check" aria-hidden="true">
                        check_circle
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="public-pricing-tier-cta">
                  <Link
                    to={tier.cta.to}
                    className={`landing-btn landing-btn--with-icon${
                      tier.cta.primary ? ' landing-btn--primary' : ' landing-btn--ghost'
                    }`}
                  >
                    <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                      arrow_forward
                    </span>
                    {tier.cta.label}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </GsapReveal>
      </section>

      <section className="public-pricing-band public-pricing-band--faq" aria-labelledby="pricing-faq-heading">
        <GsapReveal
          as="div"
          className="public-landing-inner"
          stagger=".public-pricing-faq-head, .public-pricing-faq-item"
        >
          <h2 id="pricing-faq-heading" className="public-pricing-faq-head">
            Common <span className="public-landing-title-accent">Questions</span>
          </h2>
          <ul className="public-pricing-faq-list">
            {faqItems.map((item) => (
              <li key={item.q} className="public-pricing-faq-item">
                <h3 className="public-pricing-faq-q">{item.q}</h3>
                <p className="public-pricing-faq-a">{item.a}</p>
              </li>
            ))}
          </ul>
        </GsapReveal>
      </section>
    </div>
  )
}
