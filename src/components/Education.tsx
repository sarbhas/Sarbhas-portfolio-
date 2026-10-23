import { CalendarDays, GraduationCap, Landmark, MapPin, type LucideIcon } from 'lucide-react'
import { education } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

const KIND_ICON: Record<string, LucideIcon> = {
  degree: GraduationCap,
  qualification: Landmark,
}

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Academic Background"
      title="Education & Qualifications"
      lead="Formal engineering education in Artificial Intelligence and Machine Learning, backed by core scientific foundation."
    >
      <div className="relative">
        {/* Glowing cyber timeline rail */}
        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500/30 opacity-70"
        />

        <div className="space-y-8">
          {education.map((entry, index) => {
            const Icon = KIND_ICON[entry.kind] ?? GraduationCap

            return (
              <Reveal key={entry.title} delay={index * 120} className="relative pl-12 sm:pl-16">
                {/* Glowing Node on Rail */}
                <div
                  aria-hidden="true"
                  className="absolute left-2.5 sm:left-4.5 top-6 -translate-x-1/2 flex items-center justify-center"
                >
                  <span className="h-4 w-4 rounded-full bg-cyan-400 ring-4 ring-ink shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-pulse" />
                </div>

                <TiltCard className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                          {entry.kind === 'degree' ? 'Undergraduate Degree' : 'Pre-University Course'}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-mist font-mono">
                          <CalendarDays className="h-3.5 w-3.5 text-indigo-400" />
                          <span>{entry.period}</span>
                        </div>
                      </div>
                    </div>

                    {entry.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        {entry.status}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-cloud sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-base text-mist flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                    {entry.institution}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {entry.kind === 'degree' ? (
                      <>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          AIML Specialization
                        </span>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Deep Learning & Neural Networks
                        </span>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Computer Vision Systems
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Physics
                        </span>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Chemistry
                        </span>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Mathematics
                        </span>
                        <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 font-mono text-xs text-mist">
                          Computer Science
                        </span>
                      </>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
