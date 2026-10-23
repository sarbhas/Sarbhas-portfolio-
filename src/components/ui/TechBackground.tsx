import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  r: number
  color: string
}

const PARTICLE_COUNT = 55
const LINK_DISTANCE = 145
const MOUSE_RADIUS = 160

const COLORS = [
  'rgba(99, 102, 241, 0.7)',  // Electric Indigo
  'rgba(34, 211, 238, 0.7)',  // Luminous Cyan
  'rgba(168, 85, 247, 0.65)', // Violet
  'rgba(147, 197, 253, 0.6)',  // Soft Ice Blue
]

/**
 * High-performance fluid neural constellation & particle field.
 * Particles naturally drift and organically interact with mouse velocity.
 */
export function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    let running = false

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    }

    const resize = () => {
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const seed = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.6 + 0.8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const onMouseLeave = () => {
      mouse.active = false
      mouse.x = -1000
      mouse.y = -1000
    }

    const render = () => {
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]

        if (!reduceMotion) {
          // Standard drift
          p.x += p.vx
          p.y += p.vy

          // Soft wall bounces
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1

          // Fluid mouse interaction
          if (mouse.active) {
            const dx = mouse.x - p.x
            const dy = mouse.y - p.y
            const dist = Math.hypot(dx, dy)
            if (dist < MOUSE_RADIUS && dist > 0) {
              const force = (1 - dist / MOUSE_RADIUS) * 0.7
              const angle = Math.atan2(dy, dx)
              p.x -= Math.cos(angle) * force * 2.5
              p.y -= Math.sin(angle) * force * 2.5
            }
          }
        }

        // Render particle with glow
        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = p.color
        context.fill()

        // Connecting neural links
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const distance = Math.hypot(p.x - other.x, p.y - other.y)

          if (distance < LINK_DISTANCE) {
            const alpha = (1 - distance / LINK_DISTANCE) * 0.22
            context.beginPath()
            context.moveTo(p.x, p.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            context.lineWidth = 0.85
            context.stroke()
          }
        }
      }
    }

    const loop = () => {
      render()
      if (running) frame = window.requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      frame = window.requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    render()

    if (!reduceMotion) start()

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => resize()) : null
    observer?.observe(container)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      observer?.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep atmospheric luminous mesh orbs */}
      <span className="animate-float-slow absolute -top-32 -left-28 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-brand/20 via-cyan-500/15 to-transparent blur-[130px]" />
      <span className="animate-float-slower absolute top-1/3 -right-36 h-[38rem] w-[38rem] rounded-full bg-gradient-to-bl from-violet/20 via-brand-2/15 to-transparent blur-[150px]" />
      <span className="animate-float-slow absolute -bottom-36 left-1/3 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-[140px]" />

      {/* Modern subtle technical grid */}
      <span className="tech-grid absolute inset-0 opacity-70" />

      {/* Interactive Neural Field Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-85" />
    </div>
  )
}
