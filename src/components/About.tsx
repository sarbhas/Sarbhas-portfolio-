import { Cpu, GraduationCap, MapPin, Sparkles, type LucideIcon } from 'lucide-react'
import { profile, type InfoCard } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

const ICONS: Record<InfoCard['icon'], LucideIcon> = {
  'graduation-cap': GraduationCap,
  cpu: Cpu,
  'map-pin': MapPin,
}

export function About() {
  const { heading, body, cards } = profile.about

  return (
    <Section id="about" eyebrow="Profile Overview" title={heading} lead={body}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => {
          const Icon = ICONS[card.icon]
          return (
            <Reveal key={card.title} delay={index * 100}>
              <TiltCard className="h-full p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 via-cyan-500/20 to-violet/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="font-mono text-[11px] text-mist/60 uppercase tracking-widest">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {card.title}
                </h3>
                <p className="mt-2 text-base sm:text-lg leading-snug font-medium text-cloud">
                  {card.value}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-mist/70">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Verified academic detail</span>
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
