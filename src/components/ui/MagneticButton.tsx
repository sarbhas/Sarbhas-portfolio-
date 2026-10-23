import { useState, useRef, type MouseEvent, type ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  strength?: number
  'aria-label'?: string
}

/**
 * Anti-vibe Magnetic Button that softly gravitates towards the cursor on hover.
 */
export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  strength = 0.25,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const node = buttonRef.current
    if (!node) return

    const { left, top, width, height } = node.getBoundingClientRect()
    const x = (e.clientX - (left + width / 2)) * strength
    const y = (e.clientY - (top + height / 2)) * strength

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const commonStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
  }

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        style={commonStyle}
        className={`btn-premium inline-flex items-center justify-center will-change-transform ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      style={commonStyle}
      className={`btn-premium inline-flex items-center justify-center will-change-transform ${className}`}
    >
      {children}
    </button>
  )
}
