export default function HowItWorksPage() {
  return (
    <div className="public-stack">
      <p className="public-eyebrow">Workflow</p>
      <h1 className="public-title">How it works</h1>
      <p className="public-lead">
        A streamlined path from search terms to actionable context. Data sources and integrations can be
        wired in here when you plug in APIs.
      </p>
      <ol className="public-steps">
        <li className="public-step">
          <span className="public-step-num">01</span>
          <div>
            <h2 className="public-step-heading">Business &amp; principals</h2>
            <p className="public-step-body">
              Enter what you already know—a business name or owner—as the anchor for lookups.
              {/* TODO: map to persisted entity resolution / SSO session when backend ships. */}
            </p>
          </div>
        </li>
        <li className="public-step">
          <span className="public-step-num">02</span>
          <div>
            <h2 className="public-step-heading">Unified results surface</h2>
            <p className="public-step-body">
              See structured cards for third-party reports, docket-style history, and deeper web context
              in a single scrollable workspace.
            </p>
          </div>
        </li>
        <li className="public-step">
          <span className="public-step-num">03</span>
          <div>
            <h2 className="public-step-heading">History &amp; iteration</h2>
            <p className="public-step-body">
              Every run is saved in your session history so you can reopen, refine, and compare without
              starting from zero.
            </p>
          </div>
        </li>
      </ol>
    </div>
  )
}
