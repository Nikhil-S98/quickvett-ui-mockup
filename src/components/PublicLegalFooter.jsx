export default function PublicLegalFooter({ className = '' }) {
  const cls = ['tiny-footer', className].filter(Boolean).join(' ')
  return (
    <footer className={cls} aria-label="Legal links">
      <a href="#">Terms</a>
      <span aria-hidden="true">•</span>
      <a href="#">Privacy</a>
      <span aria-hidden="true">•</span>
      <a href="#">Cookies</a>
    </footer>
  )
}
