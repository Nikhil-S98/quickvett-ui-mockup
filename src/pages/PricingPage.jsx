import { Link } from 'react-router-dom'

export default function PricingPage() {
  return (
    <div className="public-stack">
      <p className="public-eyebrow">Plans</p>
      <h1 className="public-title">Pricing</h1>
      <p className="public-lead">
        Mockup pricing—replace with live catalog, Stripe Customer Portal, or contract flow when you go to
        production.
      </p>
      <div className="public-pricing-row">
        <article className="public-pricing-card">
          <h2 className="public-pricing-name">Reviewer</h2>
          <p className="public-pricing-price">
            <span className="public-pricing-amount">$79</span>
            <span className="public-pricing-period"> / seat / mo</span>
          </p>
          <ul className="public-bullets public-bullets--tight">
            <li>Full workspace &amp; search history</li>
            <li>Standard data refresh cadence</li>
            <li>Email support</li>
          </ul>
          <Link to="/sign-in" className="search-action-btn public-btn-block">
            Start with Reviewer
          </Link>
        </article>
        <article className="public-pricing-card public-pricing-card--featured">
          <p className="public-pricing-badge">Team</p>
          <h2 className="public-pricing-name">Underwriting desk</h2>
          <p className="public-pricing-price">
            <span className="public-pricing-amount">Custom</span>
          </p>
          <ul className="public-bullets public-bullets--tight">
            <li>Seat bundles &amp; shared history</li>
            <li>SLAs &amp; dedicated onboarding</li>
            <li>API access &amp; data agreements</li>
          </ul>
          <p className="public-pricing-note">
            Prefer a conversation?{' '}
            <Link to="/contact" className="public-inline-link">
              Contact us
            </Link>
            .
            {/* TODO: Add Salesforce / HubSpot scheduling link. */}
          </p>
          <Link to="/contact" className="search-action-btn public-btn-block">
            Contact sales
          </Link>
        </article>
      </div>
    </div>
  )
}
