import { useState } from 'react'
import { BrainCircuit, Code2, Database, Layers, Sparkles, Users, Wrench, type LucideIcon } from 'lucide-react'
import { skillGroups, type SkillGroup } from '../data/profile'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

const ICONS: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  brain: BrainCircuit,
  database: Database,
  layers: Layers,
  wrench: Wrench,
  users: Users,
}

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Domains' },
    { id: 'brain', label: 'AI & Machine Learning' },
    { id: 'code', label: 'Languages' },
    { id: 'database', label: 'Data & Systems' },
  ]

  const filteredGroups = skillGroups.filter((group) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'brain') return group.icon === 'brain'
    if (activeFilter === 'code') return group.icon === 'code'
    if (activeFilter === 'database') return group.icon === 'database' || group.icon === 'layers'
    return true
  })

  return (
    <Section
      id="skills"
      eyebrow="Technical Arsenal"
      title="Skills & Technologies"
      lead="Core competencies spanning Artificial Intelligence, Machine Learning algorithms, backend databases, and modern software engineering."
    >
      {/* Category Filter Pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveFilter(cat.id)}
            className={`rounded-full px-4 py-2 text-xs font-mono font-medium transition-all duration-300 ${
              activeFilter === cat.id
                ? 'bg-gradient-to-r from-brand to-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-cyan-400/40'
                : 'border border-white/10 bg-white/5 text-mist hover:border-white/20 hover:text-cloud'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group, index) => {
          const Icon = ICONS[group.icon]
          const isHighlight = group.icon === 'brain' || group.icon === 'code'

          return (
            <Reveal key={group.title} delay={index * 80}>
              <TiltCard
                className={`flex h-full flex-col p-6 sm:p-7 ${
                  isHighlight ? 'border-cyan-500/30' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <span className="font-mono text-[11px] rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-mist">
                    {group.skills.length} skills
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold tracking-tight text-cloud">
                  {group.title}
                </h3>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="group/chip inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-mist transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-200 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    >
                      <span className="h-1 w-1 rounded-full bg-cyan-400 opacity-60 group-hover/chip:opacity-100" />
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-mist/60">
                  <span>Domain verified</span>
                  <Sparkles className="h-3 w-3 text-cyan-400" />
                </div>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
