import { gsap, ScrollTrigger } from './register.js'

/** @returns {() => void} */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Fade + slide in a single element when the trigger scrolls into view (once).
 * @returns {() => void} cleanup
 */
export function mountScrollReveal(triggerEl, options = {}) {
  const {
    target = 'firstChild',
    y = 22,
    duration = 0.58,
    /** Fire as soon as the block enters the viewport (was top 88%, felt late on long pages). */
    start = 'top bottom',
    ease = 'power2.out',
  } = options

  if (!triggerEl) return () => {}

  if (prefersReducedMotion()) {
    return () => {}
  }

  const el =
    target === 'firstChild'
      ? triggerEl.firstElementChild
      : target === 'self'
        ? triggerEl
        : target

  if (!el || !(el instanceof Element)) return () => {}

  gsap.set(el, { opacity: 0, y })

  const st = ScrollTrigger.create({
    trigger: triggerEl,
    start,
    once: true,
    onEnter: () => {
      gsap.to(el, { opacity: 1, y: 0, duration, ease })
    },
  })

  return () => {
    st.kill()
    gsap.killTweensOf(el)
  }
}

/**
 * Stagger children when container enters view (once).
 * @returns {() => void} cleanup
 */
export function mountStaggerReveal(containerEl, selector, options = {}) {
  const {
    y = 18,
    duration = 0.45,
    stagger = 0.08,
    start = 'top bottom',
    ease = 'power2.out',
  } = options

  if (!containerEl) return () => {}

  if (prefersReducedMotion()) {
    return () => {}
  }

  const items = containerEl.querySelectorAll(selector)
  if (!items.length) return () => {}

  gsap.set(items, { opacity: 0, y })

  const st = ScrollTrigger.create({
    trigger: containerEl,
    start,
    once: true,
    onEnter: () => {
      gsap.to(items, { opacity: 1, y: 0, duration, stagger, ease })
    },
  })

  return () => {
    st.kill()
    gsap.killTweensOf(items)
  }
}
