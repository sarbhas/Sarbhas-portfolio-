import { useState, useRef, type MouseEvent, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  glare?: boolean
  maxTilt?: number
  scale?: number
}

/**
 * Anti-vibe 3D Tilt Card with dynamic specular glare and spotlight coordinate tracking.
 * Smoothly interpolates and resets on mouse leave without layout jitter.
 */
export function TiltCard({
  children,
  className = '',
  glare = true,
  maxTilt = 6,
  scale = 1.015,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<{
    transform: string
    glareX: number
    glareY: number
    glareOpacity: number
  }>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Update CSS custom properties for spotlight effects
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      glareOpacity: 0.18,
    })
  }

  const handleMouseLeave = () => {
    setStyle((prev) => ({
      ...prev,
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      glareOpacity: 0,
    }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease',
      }}
      className={`card spotlight-card relative will-change-transform ${className}`}
    >
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: style.glareOpacity,
            background: `radial-gradient(400px circle at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  )
}
