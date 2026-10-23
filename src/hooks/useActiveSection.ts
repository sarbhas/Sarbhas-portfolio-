import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the middle of the viewport,
 * so the navigation bar can highlight it.
 */
export function useActiveSection(ids: string[], fallback: string): string {
  const [active, setActive] = useState(fallback)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActive(visible[visible.length - 1].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
