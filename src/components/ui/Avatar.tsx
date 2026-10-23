import { useState } from 'react'
import { profile } from '../../data/profile'
import { Terminal } from 'lucide-react'

interface AvatarProps {
  size?: 'hero' | 'small'
}

/**
 * High-tech Bio-Avatar with holographic cyber rings, scanning sweep, and fallback initials.
 */
export function Avatar({ size = 'hero' }: AvatarProps) {
  const [failed, setFailed] = useState(false)

  const isHero = size === 'hero'
  const dims = isHero ? 'h-72 w-72 sm:h-80 sm:w-80 lg:h-92 lg:w-92' : 'h-20 w-20'

  return (
    <div className="relative isolate flex items-center justify-center">
      {/* Outer Counter-Rotating Ambient Rings (Hero only) */}
      {isHero && (
        <>
          <div
            aria-hidden="true"
            className="animate-spin-slow pointer-events-none absolute -inset-6 rounded-full border border-dashed border-cyan-400/20 sm:-inset-8"
          />
          <div
            aria-hidden="true"
            className="animate-spin-reverse pointer-events-none absolute -inset-12 rounded-full border border-indigo-500/15 sm:-inset-14"
          />
          {/* Luminous aurora background bloom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-brand/40 via-cyan-500/30 to-violet/40 blur-3xl opacity-60"
          />
        </>
      )}

      {/* Main Container */}
      <div
        className={`group relative shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-surface/90 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.3)] backdrop-blur-xl ${dims}`}
      >
        {!failed ? (
          <img
            src={profile.photoPath}
            alt={`${profile.name} profile`}
            width={380}
            height={380}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`${profile.name} bio avatar`}
            className="relative flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_40%_30%,#1e1b4b_0%,#090d1a_60%,#030712_100%)] p-6 text-center"
          >
            {/* Tech grid texture behind initials */}
            <div className="tech-grid absolute inset-0 opacity-40" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-cyan-300">
                <Terminal className="h-2.5 w-2.5" />
                AI • AIML
              </span>
              <span className={`font-extrabold tracking-tight text-gradient ${isHero ? 'text-7xl sm:text-8xl' : 'text-2xl'}`}>
                {profile.initials}
              </span>
              {isHero && (
                <span className="mt-2 text-xs font-mono tracking-wider text-mist/80">
                  Mohammed Sarbhas
                </span>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Holographic Scan Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-60 animate-[float_4s_ease-in-out_infinite]"
        />

        {/* Protective Specular Inner Ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/20"
        />
      </div>

      {/* Floating Status Pill (Hero only) */}
      {isHero && (
        <div
          aria-hidden="true"
          className="absolute -bottom-3 rounded-full border border-white/15 bg-surface/90 px-4 py-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:-bottom-4"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-medium text-cloud">
              {profile.location.split(',')[0]}, Kerala
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
