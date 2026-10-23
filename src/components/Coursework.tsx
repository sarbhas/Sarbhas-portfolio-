import { BookOpen, Sparkles } from 'lucide-react'
import { coursework } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

export function Coursework() {
  return (
    <Section
      id="coursework"
      eyebrow="Curriculum & Theory"
      title="Relevant Coursework"
      lead="Rigorous computer science and engineering coursework completed during the B.E. programme."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coursework.map((item, index) => (
          <Reveal key={item} delay={(index % 3) * 90}>
            <TiltCard className="flex h-full items-center gap-4 p-5 sm:p-6">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <span className="font-mono text-[11px] text-mist/60 block">Course Module 0{index + 1}</span>
                <span className="text-base font-semibold leading-snug text-cloud">{item}</span>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs font-mono text-mist/80">
        <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
        <span>Official academic coursework verified at AJ Institute of Engineering & Technology.</span>
      </div>
    </Section>
  )
}
