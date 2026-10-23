import { Github, Linkedin } from 'lucide-react'
import { profile } from '../../data/profile'

interface Props {
  className?: string
  showLabels?: boolean
}

interface SocialDef {
  key: 'github' | 'linkedin'
  label: string
  url: string
  Icon: typeof Github
}

const SOCIALS: SocialDef[] = [
  { key: 'github', label: 'GitHub', url: profile.githubUrl, Icon: Github },
  { key: 'linkedin', label: 'LinkedIn', url: profile.linkedinUrl, Icon: Linkedin },
]

/**
 * Renders a real link when the URL is set in src/data/profile.ts and a clearly
 * labelled disabled placeholder when it is still empty — never a dead link.
 */
export function SocialLinks({ className = '', showLabels = false }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIALS.map(({ key, label, url, Icon }) => {
        const ready = url.trim().length > 0
        const shared =
          'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-medium transition-all duration-300'

        return ready ? (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${shared} text-cloud hover:-translate-y-0.5 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]`}
          >
            <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            {showLabels ? label : <span className="sr-only">{profile.name} on {label}</span>}
            {!showLabels ? null : (
              <span aria-hidden="true" className="text-xs text-cyan-300">
                ↗
              </span>
            )}
          </a>
        ) : (
          <button
            key={key}
            type="button"
            disabled
            title={`Add your ${label} URL in src/data/profile.ts`}
            className={`${shared} cursor-not-allowed text-mist/60 border-dashed border-white/10 opacity-75`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {showLabels ? label : <span className="sr-only">{label} link — not added yet</span>}
            {showLabels ? (
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-mist">
                not configured
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
