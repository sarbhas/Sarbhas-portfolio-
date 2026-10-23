import { useState, useEffect } from 'react'
import {
  RefreshCw,
  Sparkles,
  Volume2,
} from 'lucide-react'

const GESTURES = [
  {
    name: 'HELLO',
    confidence: '98.4%',
    desc: 'Open palm raised towards camera with subtle wave motion',
    translation: '"Hello, how are you today?"',
    points: [
      { x: 50, y: 35 }, // Palm center
      { x: 38, y: 48 }, { x: 44, y: 56 }, { x: 50, y: 60 }, // Thumb
      { x: 42, y: 26 }, { x: 40, y: 18 }, { x: 38, y: 10 }, // Index
      { x: 50, y: 24 }, { x: 50, y: 15 }, { x: 50, y: 7 },  // Middle
      { x: 58, y: 26 }, { x: 60, y: 18 }, { x: 62, y: 11 }, // Ring
      { x: 65, y: 30 }, { x: 68, y: 24 }, { x: 70, y: 18 }, // Pinky
    ],
  },
  {
    name: 'THANK YOU',
    confidence: '97.1%',
    desc: 'Fingertips near chin extending forward and downward toward recipient',
    translation: '"Thank you very much for your assistance!"',
    points: [
      { x: 50, y: 45 },
      { x: 42, y: 52 }, { x: 46, y: 58 }, { x: 50, y: 62 },
      { x: 46, y: 32 }, { x: 44, y: 22 }, { x: 43, y: 14 },
      { x: 51, y: 30 }, { x: 52, y: 20 }, { x: 52, y: 12 },
      { x: 56, y: 32 }, { x: 58, y: 22 }, { x: 60, y: 15 },
      { x: 62, y: 36 }, { x: 64, y: 28 }, { x: 66, y: 22 },
    ],
  },
  {
    name: 'WELCOME',
    confidence: '96.8%',
    desc: 'Both hands sweeping smoothly inward in welcoming gesture',
    translation: '"You are warmly welcome to our team!"',
    points: [
      { x: 50, y: 50 },
      { x: 40, y: 54 }, { x: 42, y: 60 }, { x: 45, y: 66 },
      { x: 45, y: 38 }, { x: 42, y: 28 }, { x: 40, y: 20 },
      { x: 52, y: 36 }, { x: 52, y: 26 }, { x: 52, y: 18 },
      { x: 58, y: 38 }, { x: 60, y: 28 }, { x: 62, y: 20 },
      { x: 64, y: 42 }, { x: 67, y: 34 }, { x: 70, y: 26 },
    ],
  },
]

export function SignLanguageSimulator() {
  const [gestureIdx, setGestureIdx] = useState(0)
  const [fps, setFps] = useState(60)

  const current = GESTURES[gestureIdx]

  useEffect(() => {
    const timer = setInterval(() => {
      setGestureIdx((prev) => (prev + 1) % GESTURES.length)
      setFps(Math.floor(58 + Math.random() * 4))
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/30 bg-surface/90 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
            AI Vision Stream • Sep 2026 Active Build
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-mist/80">
          <span className="rounded bg-black/40 px-2 py-0.5 border border-white/5">
            {fps} FPS • 12ms Latency
          </span>
          <span className="rounded bg-cyan-950/40 px-2 py-0.5 text-cyan-300 border border-cyan-400/20">
            21 3D Landmarks
          </span>
        </div>
      </div>

      {/* Main Vision Viewport */}
      <div className="relative aspect-video w-full bg-[#050914] overflow-hidden flex items-center justify-center">
        {/* Subtle camera scanlines & tech grid */}
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12),transparent_70%)]" />

        {/* Camera Corner Brackets */}
        <div className="pointer-events-none absolute inset-4 border border-cyan-400/20 rounded-xl">
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-cyan-400" />
        </div>

        {/* Animated Hand Landmark Skeleton */}
        <div className="relative h-4/5 w-4/5 flex items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 100 80">
            {/* Skeletal Vector Connections */}
            {current.points.map((pt, i) => {
              if (i === 0) return null
              const parent = i % 3 === 1 ? current.points[0] : current.points[i - 1]
              return (
                <line
                  key={`line-${i}`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={pt.x}
                  y2={pt.y}
                  stroke="rgba(34, 211, 238, 0.6)"
                  strokeWidth="1.2"
                  strokeDasharray={i % 2 === 0 ? 'none' : '2,2'}
                  className="transition-all duration-700 ease-out"
                />
              )
            })}

            {/* Glowing Joint Nodes */}
            {current.points.map((pt, i) => (
              <g key={`pt-${i}`} className="transition-all duration-700 ease-out">
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="1.8"
                  fill="#38bdf8"
                  className="animate-pulse"
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.5)"
                  strokeWidth="0.75"
                />
              </g>
            ))}
          </svg>

          {/* AI Bounding Box & Target Track */}
          <div className="absolute top-4 left-6 rounded-lg border border-cyan-400/40 bg-black/70 px-2.5 py-1.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-cyan-300">DETECTED:</span>
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                {current.name}
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 font-mono text-[10px] text-emerald-300">
                {current.confidence}
              </span>
            </div>
          </div>
        </div>

        {/* Live Translation Overlay (Bottom of Viewport) */}
        <div className="absolute inset-x-4 bottom-3 rounded-xl border border-white/10 bg-surface/90 p-3 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              Real-time Speech Synthesis:
            </span>
            <span className="font-mono text-[10px] text-mist/70">PyTorch LSTM Output</span>
          </div>
          <p className="mt-1 text-sm sm:text-base font-semibold text-cloud flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-cyan-200">{current.translation}</span>
          </p>
        </div>
      </div>

      {/* Simulator Interactive Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] p-3.5">
        <div className="flex items-center gap-2">
          {GESTURES.map((g, idx) => (
            <button
              key={g.name}
              type="button"
              onClick={() => setGestureIdx(idx)}
              className={`rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-all ${
                gestureIdx === idx
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                  : 'text-mist/70 hover:text-cloud hover:bg-white/5 border border-transparent'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>

        <span className="font-mono text-[11px] text-mist/60 flex items-center gap-1.5">
          <RefreshCw className="h-3 w-3 animate-spin text-cyan-400" />
          Continuous Real-time Inference
        </span>
      </div>
    </div>
  )
}
