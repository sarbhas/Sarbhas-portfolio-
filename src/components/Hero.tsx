import { useState, useEffect } from 'react'
import {
  ArrowUpRight,
  BrainCircuit,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'
import { profile } from '../data/profile'
import { Avatar } from './ui/Avatar'
import { DownloadResumeButton } from './ui/DownloadResumeButton'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'

const ROLES = [
  'AI & Machine Learning Engineering Student',
  'Computer Vision & Deep Learning Explorer',
  'Python & Intelligent Software Builder',
  'Problem Solver & Systems Thinker',
]

const quickFacts = [
  { icon: MapPin, label: profile.location },
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phoneHref}` },
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length)
        setFade(true)
      }, 300)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-36"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          {/* ---------------------------------------------------------- Copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-surface/80 px-4 py-1.5 shadow-[0_4px_20px_rgba(6,182,212,0.15)] backdrop-blur-xl">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-wider text-cyan-300">
                  AJIET • B.E. Artificial Intelligence &amp; ML
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                id="home-heading"
                className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-cloud sm:text-5xl lg:text-6xl"
              >
                Hi, I'm <br className="hidden sm:inline" />
                <span className="text-gradient drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
                  {profile.name}
                </span>
              </h1>
            </Reveal>

            {/* Dynamic Role Rotator with Fluid Fade */}
            <Reveal delay={160}>
              <div className="mt-4 flex items-center gap-2 h-9">
                <BrainCircuit className="h-5 w-5 text-cyan-400 shrink-0" />
                <p
                  className={`text-lg sm:text-xl font-semibold text-cyan-300 transition-all duration-300 transform ${
                    fade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                >
                  {ROLES[roleIndex]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                {profile.hero.intro}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <MagneticButton
                  href="#projects"
                  strength={0.2}
                  className="rounded-full bg-gradient-to-r from-brand via-brand-2 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_-8px_rgba(6,182,212,0.6)] hover:shadow-[0_16px_45px_-5px_rgba(99,102,241,0.8)]"
                >
                  <span className="flex items-center gap-2">
                    View Selected Projects
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </MagneticButton>

                <DownloadResumeButton variant="outline" className="px-6 py-3.5 rounded-full!" />

                <MagneticButton
                  href="#contact"
                  strength={0.15}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-cloud backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/10 hover:text-cyan-300"
                >
                  Get in Touch
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-mist/90">
                {quickFacts.map(({ icon: Icon, label, href }) => {
                  const content = (
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 backdrop-blur">
                      <Icon className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                      {label}
                    </span>
                  )
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="transition-colors hover:text-cloud">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          {/* --------------------------------------------------------- Photo */}
          <Reveal delay={260} className="order-first justify-self-center lg:order-last lg:justify-self-end">
            <Avatar size="hero" />
          </Reveal>
        </div>

        {/* Fluid Scroll Cue */}
        <a
          href="#about"
          className="group mx-auto mt-16 hidden w-fit flex-col items-center gap-2 text-mist transition-colors hover:text-cyan-300 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70 group-hover:text-cyan-300">
            Explore Portfolio
          </span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <span className="h-1.5 w-1 rounded-full bg-cyan-400 animate-[float_2s_ease-in-out_infinite]" />
          </div>
        </a>
      </div>
    </section>
  )
}
