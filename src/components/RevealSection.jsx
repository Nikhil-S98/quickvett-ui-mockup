import { useEffect, useRef, useState } from 'react'

/**
 * Wraps a landing section: on scroll into view, inner content fades in and moves up.
 * Respects prefers-reduced-motion (no animation).
 */
export default function RevealSection({ as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { root: null, rootMargin: '0px 0px -7% 0px', threshold: 0.07 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const revealCls = `public-landing-reveal${visible ? ' public-landing-reveal--visible' : ''}`
  const merged = [className.trim(), revealCls].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={merged} {...rest}>
      {children}
    </Tag>
  )
}
