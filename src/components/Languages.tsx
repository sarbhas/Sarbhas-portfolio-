import { Globe2 } from 'lucide-react'
import { languages } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

const FLUENCY_MAP: Record<string, { level: string; desc: string }> = {
  English: {
    level: 'Professional Working Proficiency',
    desc: 'Fluent in technical communication, engineering documentation, and presentation.',
  },
  Malayalam: {
    level: 'Native / Mother Tongue',
    desc: 'Native command of spoken and written language.',
  },
}

export function Languages() {
  return (
    <Section
      id="languages"
      eyebrow="Global Communication"
      title="Languages"
      lead="Languages for global collaboration, technical writing, and localized teamwork."
    >
      <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
        {languages.map((language, index) => {
          const detail = FLUENCY_MAP[language] || {
            level: 'Fluent',
            desc: 'Effective communication skills.',
          }

          return (
            <Reveal key={language} delay={index * 120}>
              <TiltCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    >
                      <Globe2 className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-cloud">{language}</h3>
                      <span className="font-mono text-xs font-semibold text-cyan-300">
                        {detail.level}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-mist">{detail.desc}</p>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
