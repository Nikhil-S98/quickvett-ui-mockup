import { useState } from 'react'
import { Link } from 'react-router-dom'
import GsapReveal from '../components/GsapReveal.jsx'

const INTEREST_OPTIONS = [
  { value: '', label: 'Select an option…' },
  { value: 'pricing', label: 'Pricing / plans' },
  { value: 'pilot', label: 'Pilot or evaluation' },
  { value: 'enterprise', label: 'Enterprise deployment' },
  { value: 'partnerships', label: 'Partnerships' },
  { value: 'other', label: 'Something else' },
]

/** Placeholder inbox for the mock UI — replace href with your routed address later. */
const CONTACT_MAIL = 'hello@quickvett.com'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [interest, setInterest] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trap = event.currentTarget.elements.namedItem('company_website')
    if (trap instanceof HTMLInputElement && trap.value.trim() !== '') {
      return
    }
    setBusy(true)
    await new Promise((resolve) => setTimeout(resolve, 480))
    setBusy(false)
    setSent(true)
    setMessage('')
  }

  const handleSendAnother = () => {
    setSent(false)
    setName('')
    setEmail('')
    setCompany('')
    setInterest('')
  }

  return (
    <div className="public-contact-page">
      <GsapReveal
        as="section"
        className="public-contact-band public-contact-band--hero"
        aria-labelledby="contact-heading"
      >
        <div className="public-landing-inner">
          <div className="public-contact-hero">
            <p className="public-landing-kicker">
              <span className="public-landing-kicker-index">—</span>
              <span className="public-landing-kicker-text">Contact</span>
            </p>
            <h1 id="contact-heading" className="public-contact-hero-title">
              Talk with <span className="public-landing-title-accent">QuickVett</span>
            </h1>
            <p className="public-contact-hero-deck">
              Request access, pricing, or a pilot walkthrough. Share a bit about volume and timelines — our team replies
              with next steps tailored to underwriting and compliance workflows.
            </p>
          </div>
        </div>
      </GsapReveal>

      <section className="public-contact-band public-contact-band--main" aria-label="Contact form">
        <div className="public-landing-inner">
          <div className="public-contact-layout">
            {sent ? (
              <article className="public-contact-panel public-contact-panel--thanks" aria-live="polite">
                <span className="material-symbols-outlined public-contact-thanks-icon" aria-hidden>
                  mark_email_read
                </span>
                <h2 className="public-contact-thanks-heading">Thank you — we received your note</h2>
                <p className="public-contact-thanks-copy">
                  In this demo, nothing is sent over the network. Hook your CRM or ticketing URL into the submit handler
                  in <code className="public-code">ContactPage.jsx</code> when you are ready for production.
                </p>
                <div className="public-contact-thanks-actions">
                  <button
                    type="button"
                    className="landing-btn landing-btn--primary public-contact-secondary-btn"
                    onClick={handleSendAnother}
                  >
                    Send another message
                  </button>
                  <Link to="/" className="landing-btn landing-btn--ghost">
                    Back to home
                  </Link>
                </div>
              </article>
            ) : (
              <>
                <GsapReveal
                  className="public-contact-panel-wrap"
                  target="firstChild"
                >
                  <div className="public-contact-panel public-contact-panel--form">
                    <h2 className="public-contact-form-title">Send a message</h2>
                    <p className="public-contact-form-lead">
                      Required fields help us route your request faster. Prefer email? Reach us directly at{' '}
                      <a className="public-inline-link public-inline-link--standout" href={`mailto:${CONTACT_MAIL}`}>
                        {CONTACT_MAIL}
                      </a>
                      .
                    </p>
                    <form className="public-contact-form" onSubmit={handleSubmit} noValidate autoComplete="on">
                      <input type="text" name="company_website" className="public-contact-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                      <div className="public-contact-fields">
                        <div className="public-contact-field">
                          <label htmlFor="contact-name">Full name</label>
                          <div className="public-contact-input">
                            <span className="material-symbols-outlined public-contact-input-icon" aria-hidden>
                              person
                            </span>
                            <input
                              id="contact-name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              required
                              placeholder="Alex Rivera"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="public-contact-field">
                          <label htmlFor="contact-email">Work email</label>
                          <div className="public-contact-input">
                            <span className="material-symbols-outlined public-contact-input-icon" aria-hidden>
                              alternate_email
                            </span>
                            <input
                              id="contact-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              placeholder="you@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="public-contact-field">
                          <label htmlFor="contact-company">Company (optional)</label>
                          <div className="public-contact-input">
                            <span className="material-symbols-outlined public-contact-input-icon" aria-hidden>
                              apartment
                            </span>
                            <input
                              id="contact-company"
                              name="company"
                              type="text"
                              autoComplete="organization"
                              placeholder="Your funding partner or fund"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="public-contact-field">
                          <label htmlFor="contact-interest">What can we help with?</label>
                          <div className="public-contact-select-wrap">
                            <select
                              id="contact-interest"
                              name="interest"
                              required
                              value={interest}
                              onChange={(e) => setInterest(e.target.value)}
                            >
                              {INTEREST_OPTIONS.map((opt) => (
                                <option key={opt.label} value={opt.value} disabled={opt.value === ''}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <span className="material-symbols-outlined public-contact-select-chevron" aria-hidden>
                              expand_more
                            </span>
                          </div>
                        </div>

                        <div className="public-contact-field">
                          <label htmlFor="contact-message">Message</label>
                          <div className="public-contact-textarea-wrap">
                            <textarea
                              id="contact-message"
                              name="message"
                              required
                              rows={6}
                              placeholder="Deal volume, stack, timelines, SOC2 or data residency asks — whatever helps us respond with substance."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="landing-btn landing-btn--primary landing-btn--with-icon public-contact-submit"
                        disabled={busy}
                      >
                        <span className="material-symbols-outlined ui-icon" aria-hidden>
                          send
                        </span>
                        {busy ? 'Sending…' : 'Submit'}
                      </button>
                      <p className="public-contact-footnote">
                        By submitting this form you agree we may reply using the email you provide. QuickVett does not
                        sell your contact info.
                      </p>
                    </form>
                  </div>
                </GsapReveal>

                <aside className="public-contact-aside" aria-label="How we reply">
                  <div className="public-contact-aside-panel">
                    <h2 className="public-contact-aside-title">What to expect</h2>
                    <ul className="public-contact-aside-list">
                      <li>
                        <span className="material-symbols-outlined public-contact-aside-icon" aria-hidden>
                          schedule
                        </span>
                        <div>
                          <p className="public-contact-aside-item-title">Response time</p>
                          <p className="public-contact-aside-item-body">Typically within one US business day for qualified requests.</p>
                        </div>
                      </li>
                      <li>
                        <span className="material-symbols-outlined public-contact-aside-icon" aria-hidden>
                          verified_user
                        </span>
                        <div>
                          <p className="public-contact-aside-item-title">Security & diligence</p>
                          <p className="public-contact-aside-item-body">
                            Pilot and enterprise conversations can include NDA-style coverage — ask in your note.
                          </p>
                        </div>
                      </li>
                      <li>
                        <span className="material-symbols-outlined public-contact-aside-icon" aria-hidden>
                          hub
                        </span>
                        <div>
                          <p className="public-contact-aside-item-title">Product context</p>
                          <p className="public-contact-aside-item-body">
                            Mention MCA volume or team size — we tailor onboarding and quoting from there.
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div className="public-contact-aside-divider" />

                    <p className="public-contact-aside-direct">
                      Email us directly ·{' '}
                      <a className="public-inline-link public-inline-link--standout" href={`mailto:${CONTACT_MAIL}`}>
                        {CONTACT_MAIL}
                      </a>
                    </p>

                    <div className="public-contact-aside-links">
                      <Link to="/pricing" className="public-contact-aside-link">
                        Compare plans
                      </Link>
                      <Link to="/how-it-works" className="public-contact-aside-link">
                        How QuickVett works
                      </Link>
                      <Link to="/sign-in" className="public-contact-aside-link">
                        Sign in to workspace
                      </Link>
                    </div>
                  </div>
                </aside>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
