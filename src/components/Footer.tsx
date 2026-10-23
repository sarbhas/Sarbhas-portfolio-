import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { DownloadResumeButton } from './ui/DownloadResumeButton'
import { MagneticButton } from './ui/MagneticButton'
import { SocialLinks } from './ui/SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-navy/90 backdrop-blur-2xl">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-tr from-brand to-cyan-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                {profile.initials}
              </span>
              <div className="leading-tight">
                <p className="text-base font-bold text-cloud">{profile.name}</p>
                <p className="font-mono text-xs text-cyan-300">{profile.role}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-mist max-w-sm">
              Engineering intelligent systems with deep learning, computer vision, and high-performance software architectures.
            </p>

            <ul className="mt-6 space-y-2.5 font-mono text-xs text-mist">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan-300">
                  <Mail className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phoneHref}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan-300">
                  <Phone className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {profile.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer Navigation">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Navigation Index
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-mono text-xs text-mist transition-colors duration-200 hover:text-cyan-300"
                  >
                    // {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Profiles & Resume */}
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Telemetry &amp; Dossier
            </h2>
            <SocialLinks showLabels className="mt-4" />
            <div className="mt-6">
              <DownloadResumeButton variant="outline" className="w-full sm:w-auto rounded-full!" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-mist/70">
            © {year} {profile.name} • High-Craft Portfolio
          </p>

          <div className="flex items-center gap-6">
            <p className="font-mono text-[11px] text-mist/60">
              React 19 • TypeScript • Tailwind v4
            </p>
            <MagneticButton
              href="#home"
              strength={0.25}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-mist transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 shadow-md"
            >
              <ArrowUp className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  )
}
