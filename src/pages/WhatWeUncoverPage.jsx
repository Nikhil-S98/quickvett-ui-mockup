export default function WhatWeUncoverPage() {
  return (
    <div className="public-stack">
      <p className="public-eyebrow">Coverage</p>
      <h1 className="public-title">What we uncover</h1>
      <p className="public-lead">
        The product is a lens—not a verdict. Below is the kind of signal set reviewers expect; wire each
        tile to a live provider when you are ready.
      </p>
      <div className="public-grid">
        <article className="public-tile">
          <h2 className="public-tile-title">Filings &amp; dockets</h2>
          <p className="public-tile-body">
            Civil and commercial cases, parties, and recent docket movement where available.
          </p>
        </article>
        <article className="public-tile">
          <h2 className="public-tile-title">Industry &amp; reputation</h2>
          <p className="public-tile-body">
            Funder-reported records and curated web mentions for fast triage—always with source links.
          </p>
        </article>
        <article className="public-tile">
          <h2 className="public-tile-title">Open-web context</h2>
          <p className="public-tile-body">
            A second pass across news, forums, and business listings to catch what siloed checks miss.
          </p>
        </article>
        <article className="public-tile">
          <h2 className="public-tile-title">Export &amp; audit trail</h2>
          <p className="public-tile-body">
            {/* TODO: Connect to PDF / case export and org-level retention policies. */}
            Designed for an export and audit story once your compliance requirements are defined.
          </p>
        </article>
      </div>
    </div>
  )
}
