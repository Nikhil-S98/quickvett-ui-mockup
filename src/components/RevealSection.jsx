import { useLayoutEffect, useRef } from 'react'
import { mountScrollReveal, prefersReducedMotion } from '../gsap/scrollReveal.js'

/**
 * Landing section: inner content fades in and moves up on scroll (GSAP ScrollTrigger).
 * Respects prefers-reduced-motion.
 */
export default function RevealSection({ as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return
    return mountScrollReveal(el, { target: 'firstChild', y: 22, duration: 0.58 })
  }, [])

  const merged = [className.trim(), 'public-landing-reveal'].filter(Boolean).join(' ')

  return (
    <Tag ref={ref} className={merged} {...rest}>
      {children}
    </Tag>
  )
}
