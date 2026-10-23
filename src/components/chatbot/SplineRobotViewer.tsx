import { useState, Suspense, lazy } from 'react'
import { Bot, Eye, Cpu } from 'lucide-react'

// Lazy load Spline to prevent blocking initial page render
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineRobotViewerProps {
  isTyping?: boolean
  compact?: boolean
}

const SPLINE_ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export function SplineRobotViewer({ isTyping = false, compact = false }: SplineRobotViewerProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl border border-cyan-500/25 bg-navy-2/90 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-xl transition-all duration-300 ${
        compact ? 'h-36 sm:h-44' : 'h-52 sm:h-64'
      }`}
    >
      {/* Ambient background glow & holographic grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.18),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Cybernetic HUD Header */}
      <div className="absolute top-2.5 inset-x-3 z-20 flex items-center justify-between text-[11px] font-mono tracking-wider text-cyan-300/80">
        <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-ink/70 px-2.5 py-0.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <span className="font-semibold text-cyan-200">SARBHAS-BOT 3D</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-mist/70">
          <span className="flex items-center gap-1 text-[10px]">
            <Eye className="h-3 w-3 text-cyan-400" />
            <span>Interactive 3D</span>
          </span>
          <span className="text-cyan-500/40">|</span>
          <span className="text-[10px] text-cyan-400/90 font-mono">SPLINE MODEL</span>
        </div>
      </div>

      {/* Futuristic Scanline Effect */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-30">
        <div className="absolute inset-x-0 -top-full h-24 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-[shimmer_5s_infinite_linear]" />
      </div>

      {/* 3D Spline Content or Fallback */}
      {!hasError ? (
        <div className="relative h-full w-full">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-navy/80 backdrop-blur-sm">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-12 w-12 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                <Bot className="h-6 w-6 text-cyan-300 animate-pulse" />
              </div>
              <span className="font-mono text-xs text-cyan-300/80">Initializing Spline Robot...</span>
            </div>
          )}

          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              </div>
            }
          >
            <Spline
              scene={SPLINE_ROBOT_SCENE}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true)
                setIsLoading(false)
              }}
              className="h-full w-full cursor-grab active:cursor-grabbing"
            />
          </Suspense>
        </div>
      ) : (
        /* Dynamic Cyber Robot Fallback Avatar if Spline is blocked / offline */
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-cyan-950/60 to-ink p-4 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            {/* Robot Head Frame */}
            <div className="relative flex flex-col items-center">
              {/* Antenna */}
              <div className="mb-1 flex flex-col items-center">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                <span className="h-2 w-0.5 bg-cyan-400/60" />
              </div>
              {/* Robot Face Visor */}
              <div className="relative flex h-12 w-16 items-center justify-center rounded-xl border border-cyan-400/50 bg-ink/90 px-2 shadow-inner">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-bounce" />
                  <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-bounce [animation-delay:0.15s]" />
                </div>
              </div>
              {/* Audio visualizer mouth bar */}
              <div className="mt-1 flex items-center gap-1">
                <span className="h-1 w-2 rounded-full bg-cyan-400/60" />
                <span className="h-1.5 w-3 rounded-full bg-cyan-300" />
                <span className="h-1 w-2 rounded-full bg-cyan-400/60" />
              </div>
            </div>

            <div className="absolute -bottom-2 rounded-full border border-cyan-400/40 bg-navy px-2 py-0.5 font-mono text-[9px] text-cyan-300">
              SARBHAS-BOT
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-mist/80">
            <Cpu className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Neural Assistant Model Active</span>
          </div>
        </div>
      )}

      {/* Cyber Waveform & Status Footer in Robot Frame */}
      <div className="absolute bottom-2 inset-x-3 z-20 flex items-center justify-between text-[11px] font-mono text-mist">
        <div className="flex items-center gap-2">
          {/* Animated voice activity bars */}
          <div className="flex items-center gap-0.5">
            {[40, 90, 60, 100, 50, 75].map((height, i) => (
              <span
                key={i}
                className={`w-0.5 rounded-full transition-all duration-300 ${
                  isTyping
                    ? 'bg-cyan-400 animate-pulse'
                    : 'bg-cyan-500/40'
                }`}
                style={{
                  height: isTyping ? `${(height / 100) * 14}px` : '4px',
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
          <span className="text-[10px] text-cyan-300/80">
            {isTyping ? 'Synthesizing response...' : 'Awaiting prompt'}
          </span>
        </div>

        <span className="hidden sm:inline-block text-[10px] text-mist/60">
          Rotate / Drag 3D Model
        </span>
      </div>
    </div>
  )
}
