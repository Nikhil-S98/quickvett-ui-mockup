import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function safeRedirectPath(from) {
  return typeof from === 'string' && from.startsWith('/app') ? from : '/app'
}

export default function SignInPage() {
  const { session, signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const redirectFrom = location.state?.from

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const emailInputRef = useRef(null)

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  if (session.signedIn) {
    return <Navigate to={safeRedirectPath(redirectFrom)} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn({ email: email.trim(), password })
      navigate(safeRedirectPath(redirectFrom), { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="public-stack public-sign-in-page">
      <header className="public-landing-section">
        <p className="public-eyebrow">Workspace</p>
        <h1 className="public-title">Sign in</h1>
        <p className="public-lead">
          Use any work email for this mock — wire <code className="public-code">signIn()</code> to your auth API when
          ready.
        </p>
      </header>

      <form className="public-sign-form" onSubmit={handleSubmit} noValidate>
        <div className="public-field">
          <label htmlFor="signin-email">Work email</label>
          <div className="history-filter public-field-input">
            <span className="material-symbols-outlined ui-icon" aria-hidden="true">
              alternate_email
            </span>
            <input
              ref={emailInputRef}
              id="signin-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>
        </div>
        <div className="public-field">
          <label htmlFor="signin-password">Password</label>
          <div className="history-filter public-field-input">
            <span className="material-symbols-outlined ui-icon" aria-hidden="true">
              lock
            </span>
            <input
              id="signin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <p className="public-form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className="search-action-btn public-btn-block public-sign-submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Continue'}
        </button>
      </form>

      <p className="public-step-body public-sign-in-back">
        <Link to="/" className="public-inline-link">
          ← Back to home
        </Link>
      </p>
    </div>
  )
}
