import { useState } from 'react'

/**
 * Mock contact form — wire submit to CRM / API later.
 */
export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    /* TODO: POST /api/contact — send { name, email, company, message }; handle errors & rate limits */
    await new Promise((resolve) => setTimeout(resolve, 380))
    setSent(true)
    setMessage('')
  }

  return (
    <div className="public-stack public-contact-page">
      <header className="public-landing-section">
        <p className="public-eyebrow">Contact</p>
        <h1 className="public-title">Talk to QuickVett</h1>
        <p className="public-lead">
          Questions about pricing, integrations, or a pilot? Leave a note — we&apos;ll route this to your CRM
          or inbox once the endpoint exists.
        </p>
      </header>

      {sent ? (
        <section className="public-card public-contact-thanks" aria-live="polite">
          <p className="public-contact-thanks-title">Thanks — message captured (mock)</p>
          <p className="public-step-body">
            Nothing was sent over the network. Plug your API into{' '}
            <code className="public-code">ContactPage.jsx</code> submit handler when ready.
          </p>
          <button
            type="button"
            className="toolbar-text-btn public-contact-reset"
            onClick={() => {
              setSent(false)
              setName('')
              setEmail('')
              setCompany('')
            }}
          >
            Send another message
          </button>
        </section>
      ) : (
        <form className="public-sign-form public-contact-form" onSubmit={handleSubmit} noValidate>
          <div className="public-contact-fields">
            <div className="public-field">
              <label htmlFor="contact-name">Name</label>
              <div className="history-filter public-field-input">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  person
                </span>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="public-field">
              <label htmlFor="contact-email">Work email</label>
              <div className="history-filter public-field-input">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  alternate_email
                </span>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="public-field">
              <label htmlFor="contact-company">Company (optional)</label>
              <div className="history-filter public-field-input">
                <span className="material-symbols-outlined ui-icon" aria-hidden="true">
                  business_center
                </span>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Funding partners LLC"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
            <div className="public-field">
              <label htmlFor="contact-message">How can we help?</label>
              <div className="public-contact-textarea-wrap">
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Volume, timeline, compliance requirements…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="search-action-btn public-contact-submit">
            Send message
          </button>
        </form>
      )}
    </div>
  )
}
