import { createContext, useCallback, useContext, useMemo, useState } from 'react'

/* eslint-disable react-refresh/only-export-components */

const STORAGE_KEY = 'quickvett-auth-session'

/** @typedef {{ signedIn: boolean, email: string | null }} AuthSession */

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { signedIn: false, email: null }
    const parsed = JSON.parse(raw)
    if (parsed?.signedIn && typeof parsed?.email === 'string') {
      return { signedIn: true, email: parsed.email }
    }
  } catch {
    /* ignore */
  }
  return { signedIn: false, email: null }
}

function persistSession(session) {
  try {
    if (!session.signedIn) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    /* ignore */
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession)

  const signOut = useCallback(() => {
    setSession({ signedIn: false, email: null })
    persistSession({ signedIn: false, email: null })
  }, [])

  /** @param {{ email: string, password?: string }} creds Password reserved for future API auth. */
  const signIn = useCallback(async (creds) => {
    // TODO: Replace with POST /api/auth/login — use creds.password, persist tokens (httpOnly cookie or secure storage).
    const email = creds.email?.trim()
    if (!email) throw new Error('Enter your work email to continue.')
    const next = { signedIn: true, email }
    setSession(next)
    persistSession(next)
  }, [])

  const value = useMemo(
    () => ({
      session,
      /** @returns {Promise<void>} */
      signIn,
      signOut,
    }),
    [session, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
