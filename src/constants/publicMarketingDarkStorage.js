/**
 * Marketing theme preference (public layout). Workspace uses the same key so
 * search/results match briefing dark mode after sign-in until the user toggles in-app.
 */
export const PUBLIC_MARKETING_DARK_KEY = 'quickvett-public-dark'

export function readStoredPublicMarketingDark() {
  try {
    const raw = localStorage.getItem(PUBLIC_MARKETING_DARK_KEY)
    if (raw === '1') return true
    if (raw === '0') return false
  } catch {
    /* ignore */
  }
  return true
}
