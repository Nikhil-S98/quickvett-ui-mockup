import { forwardRef, useLayoutEffect, useRef } from 'react'
import { mountScrollReveal, mountStaggerReveal } from '../gsap/scrollReveal.js'

/**
 * Scroll-triggered reveal (GSAP + ScrollTrigger).
 * @param {'firstChild' | 'self'} target - what to animate (default: first child).
 * @param {string} [stagger] - optional selector (relative to this node) for staggered child reveals.
 */
const GsapReveal = forwardRef(function GsapReveal(
  { as: Comp = 'div', className = '', children, target = 'firstChild', stagger, ...rest },
  forwardedRef,
) {
  const localRef = useRef(null)

  useLayoutEffect(() => {
    const root = localRef.current
    if (!root) return

    if (stagger) {
      return mountStaggerReveal(root, stagger)
    }
    return mountScrollReveal(root, { target })
  }, [target, stagger])

  const setRefs = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <Comp ref={setRefs} className={className} {...rest}>
      {children}
    </Comp>
  )
})

GsapReveal.displayName = 'GsapReveal'

export default GsapReveal
