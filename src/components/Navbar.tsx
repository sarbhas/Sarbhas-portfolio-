import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { navItems, profile, sectionIds } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { DownloadResumeButton } from './ui/DownloadResumeButton'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds, 'home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-1' : 'py-3'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Floating Logo Island */}
        <a
          href="#home"
          onClick={close}
          className="group relative flex items-center gap-3 rounded-full border border-white/10 bg-surface/70 px-3.5 py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-surface/90"
          aria-label={`${profile.name} — home`}
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-brand to-cyan-500 text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-transform duration-300 group-hover:scale-105"
            >
              {profile.initials}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-emerald-400 animate-pulse" />
          </div>
          <span className="hidden flex-col pr-1 sm:flex">
            <span className="text-sm font-semibold tracking-tight text-cloud group-hover:text-cyan-300 transition-colors">
              {profile.name}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-mist">
              AI / ML Engineer
            </span>
          </span>
        </a>

        {/* Floating Center Nav Island (Desktop) */}
        <nav
          aria-label="Primary"
          className="hidden items-center rounded-full border border-white/10 bg-surface/65 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:flex"
        >
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(99,102,241,0.3)] border border-white/15'
                        : 'text-mist hover:text-cloud hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 rounded-full"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <DownloadResumeButton variant="outline" className="py-2! px-4! text-xs! font-medium rounded-full!" />
          <a
            href="#contact"
            className="group btn-premium inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-2 to-cyan-500 px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-[0_8px_25px_-6px_rgba(6,182,212,0.6)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_10px_35px_-5px_rgba(99,102,241,0.8)]"
          >
            <span>Connect</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-cloud backdrop-blur-xl transition-all hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5 text-cyan-300" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Slide-down Overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/15 bg-surface/95 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-3xl lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={isActive ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-brand/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'text-mist hover:bg-white/5 hover:text-cloud'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="h-4 w-4 text-cyan-400" />}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
            <DownloadResumeButton className="w-full justify-center" />
            <a
              href="#contact"
              onClick={close}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Contact Me
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
