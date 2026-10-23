import { useEffect } from 'react'

let activeTimer: number | undefined

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateTo(target: HTMLElement) {
  if (activeTimer !== undefined) window.clearTimeout(activeTimer)

  const styles = window.getComputedStyle(target)
  const margin = Number.parseFloat(styles.scrollMarginTop) || 0
  const destination = Math.max(
    0,
    Math.min(
      target.getBoundingClientRect().top + window.scrollY - margin,
      document.documentElement.scrollHeight - window.innerHeight,
    ),
  )

  const origin = window.scrollY
  const distance = destination - origin
  const finish = () => focusTarget(target)

  if (distance === 0 || reducedMotion()) {
    window.scrollTo(0, destination)
    finish()
    return
  }

  const duration = Math.min(850, Math.max(320, Math.abs(distance) * 0.32))
  const startedAt = performance.now()

  // A wall-clock ticker rather than requestAnimationFrame: the easing stays
  // accurate however often the browser actually paints, so the scroll always
  // reaches its target instead of freezing mid-way.
  const step = () => {
    const progress = Math.min(1, (performance.now() - startedAt) / duration)
    window.scrollTo(0, origin + distance * easeInOutCubic(progress))

    if (progress < 1) activeTimer = window.setTimeout(step, 16)
    else {
      activeTimer = undefined
      finish()
    }
  }

  activeTimer = window.setTimeout(step, 16)
}

/**
 * Smooth in-page navigation.
 *
 * One delegated listener covers every same-page anchor (navbar, mobile menu,
 * hero buttons, section links, footer and the skip link) instead of attaching
 * handlers to each one. The hash is updated, focus moves to the destination
 * for keyboard and screen-reader users, and reduced-motion users get an
 * instant jump.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (href.length < 2 || !href.startsWith('#')) return

      const target = document.getElementById(decodeURIComponent(href.slice(1)))
      if (!target) return

      event.preventDefault()
      window.history.pushState(null, '', href)
      animateTo(target)
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      if (activeTimer !== undefined) window.clearTimeout(activeTimer)
    }
  }, [])
}
