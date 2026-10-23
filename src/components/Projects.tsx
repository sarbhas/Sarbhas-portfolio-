import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Code2,
  Cpu,
  Github,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { TiltCard } from './ui/TiltCard'

// Technical architecture breakdowns for anti-vibe engineering depth
const ARCHITECTURES: Record<string, string[]> = {
  'sign-language': [
    'Video Stream Capture (OpenCV / MediaPipe landmark detector)',
    'Real-time Spatial Feature Extraction (21 3D Hand Coordinates)',
    'Temporal Classification (LSTM / CNN gesture recognition)',
    'Low-Latency Video Pipeline with WebRTC communication',
  ],
  'vehicle-service': [
    'Layered Client-Server Architecture (Java Backend + Relational DB)',
    'Service Booking & Customer State Management Flow',
    'PostgreSQL Normalized Schema (Vehicles, Appointments, Services)',
    'Automated Service Scheduling & Availability Resolver',
  ],
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview')
  const architecture = ARCHITECTURES[project.id] || []

  return (
    <Reveal delay={index * 140}>
      <TiltCard className="flex h-full flex-col overflow-hidden border border-white/10 hover:border-cyan-400/40">
        {/* Top Header Banner */}
        <div className="relative border-b border-white/10 bg-gradient-to-br from-brand/20 via-cyan-500/10 to-violet/20 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Project 0{index + 1}
                </span>
                {project.duration && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
                    <Clock3 className="h-3 w-3" />
                    {project.duration}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-cloud sm:text-3xl">
                {project.title}
              </h3>
            </div>

            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface/80 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <Cpu className="h-6 w-6" />
            </span>
          </div>

          {/* Interactive Mode Toggle */}
          <div className="mt-6 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                  : 'text-mist hover:text-cloud hover:bg-white/5'
              }`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all ${
                activeTab === 'architecture'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
                  : 'text-mist hover:text-cloud hover:bg-white/5'
              }`}
            >
              System Pipeline
            </button>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {activeTab === 'overview' ? (
            <>
              <p className="text-[15px] leading-relaxed text-mist">{project.description}</p>

              <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {project.bulletsTitle}
              </h4>
              <ul className="mt-3 space-y-2.5">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-sm text-cloud/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5" />
                Technical Execution Pipeline
              </h4>
              <div className="space-y-2.5">
                {architecture.map((step, stepIdx) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs font-mono text-cloud/90"
                  >
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-cyan-500/20 text-[10px] text-cyan-300 font-bold">
                      {stepIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="mt-7">
            <span className="block mb-2.5 font-mono text-[11px] uppercase tracking-wider text-mist/70">
              Tech Stack
            </span>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-mist transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div className="mt-auto pt-7 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <MagneticButton
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-brand to-cyan-500 px-5 py-2.5 text-xs font-semibold text-white shadow-md"
              >
                <span className="flex items-center gap-1.5">
                  Launch Demo
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </MagneticButton>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-cyan-400/30 bg-cyan-950/20 px-4 py-2 text-xs font-mono text-cyan-300/80">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                Under Active Engineering
              </span>
            )}

            {project.repoUrl ? (
              <MagneticButton
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-cloud hover:border-cyan-400/50"
              >
                <span className="flex items-center gap-1.5">
                  <Github className="h-3.5 w-3.5" />
                  Source Code
                </span>
              </MagneticButton>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-mist transition-colors hover:border-white/20 hover:text-cloud"
              >
                <Code2 className="h-3.5 w-3.5" />
                Request Code Walkthrough
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </Reveal>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Engineering Portfolio"
      title="Featured Projects"
      lead="Practical software applications and computer vision systems designed to address real-world challenges through intelligent algorithms."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  )
}
