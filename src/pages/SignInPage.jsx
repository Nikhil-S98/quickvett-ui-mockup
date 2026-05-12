import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import GsapReveal from '../components/GsapReveal.jsx'

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
  const [showPassword, setShowPassword] = useState(false)
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
    <GsapReveal className="public-sign-in-shell" target="self">
      <div className="public-sign-in-card">
        <div className="public-sign-in-brand-badge" aria-hidden="true">
          <span className="material-symbols-outlined public-sign-in-brand-icon">shield</span>
        </div>

        <h1 className="public-sign-in-title">
          Sign In to <span className="public-sign-in-title-brand">QuickVett</span>
        </h1>
        <p className="public-sign-in-lead">Access your merchant intelligence dashboard</p>

        <form className="public-sign-in-form" onSubmit={handleSubmit} noValidate>
          <div className="public-sign-in-field">
            <label htmlFor="signin-email" className="public-sign-in-label">
              Email Address
            </label>
            <div className="public-sign-in-control public-sign-in-control--email">
              <span className="material-symbols-outlined public-sign-in-field-icon" aria-hidden>
                mail
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
                aria-describedby={error ? 'signin-error' : undefined}
              />
            </div>
          </div>

          <div className="public-sign-in-field">
            <label htmlFor="signin-password" className="public-sign-in-label">
              Password
            </label>
            <div className="public-sign-in-control public-sign-in-control--password">
              <span className="material-symbols-outlined public-sign-in-field-icon" aria-hidden>
                lock
              </span>
              <input
                id="signin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="public-sign-in-reveal"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
              >
                <span className="material-symbols-outlined" aria-hidden>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {error ? (
            <p id="signin-error" className="public-sign-in-error" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="public-sign-in-submit" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="public-sign-in-footer-line">
          Don&apos;t have an account?{' '}
          <Link to="/contact" className="public-sign-in-footer-link">
            Request access
          </Link>
        </p>

        <p className="public-sign-in-back-pill">
          <Link to="/" className="public-sign-in-back-link">
            ← Back to home
          </Link>
        </p>
      </div>
    </GsapReveal>
  )
}
