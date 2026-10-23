import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead?: string
  children: ReactNode
  className?: string
}

/** Consistent section frame: eyebrow label, heading, optional lead paragraph. */
export function Section({ id, eyebrow, title, lead, children, className = '' }: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={`relative py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
          <h2 id={headingId} className="text-3xl font-extrabold tracking-tight text-cloud sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {lead ? <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{lead}</p> : null}
          <div aria-hidden="true" className="mt-6 h-0.5 w-28 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-transparent" />
        </Reveal>

        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  )
}
