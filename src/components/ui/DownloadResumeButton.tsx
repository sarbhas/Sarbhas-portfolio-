import { useEffect, useRef, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import { profile } from '../../data/profile'

interface Props {
  variant?: 'solid' | 'outline'
  className?: string
  label?: string
}

/**
 * Downloads  public/resume.pdf.
 * If the PDF has not been uploaded yet, the click is intercepted and a clear
 * instruction is shown instead of navigating to a dead link.
 */
export function DownloadResumeButton({
  variant = 'solid',
  className = '',
  label = 'Download Resume',
}: Props) {
  const [note, setNote] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const notify = (message: string) => {
    setNote(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNote(null), 5000)
  }

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    try {
      const response = await fetch(profile.resumePath, { headers: { Range: 'bytes=0-3' } })
      const bytes = new Uint8Array(await response.arrayBuffer())
      // "%PDF" magic number — guards against single-page-app servers that answer
      // a missing file with a 200 HTML page instead of a real PDF.
      const isPdf =
        bytes.length >= 4 &&
        bytes[0] === 0x25 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x44 &&
        bytes[3] === 0x46

      if (response.ok && isPdf) {
        const anchor = document.createElement('a')
        anchor.href = profile.resumePath
        anchor.download = profile.resumeFileName
        document.body.appendChild(anchor)
        anchor.click()
        anchor.remove()
        setNote(null)
        return
      }
    } catch {
      /* network error — fall through to the guidance message */
    }

    notify('Resume PDF not uploaded yet — add it at public/resume.pdf (see README).')
  }

  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300'
  const styles =
    variant === 'solid'
      ? 'bg-gradient-to-r from-brand via-brand-2 to-cyan-500 text-white shadow-[0_10px_30px_-12px_rgba(6,182,212,0.8)] hover:brightness-110 hover:shadow-[0_16px_36px_-10px_rgba(99,102,241,0.85)]'
      : 'border border-white/15 bg-white/5 text-cloud hover:border-cyan-400/60 hover:bg-white/10 hover:text-cyan-300'

  return (
    <span className="relative inline-flex">
      <a
        href={profile.resumePath}
        download={profile.resumeFileName}
        onClick={handleClick}
        className={`${base} ${styles} ${className}`}
        aria-label={`${label} (PDF)`}
      >
        {variant === 'solid' ? (
          <Download className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FileText className="h-4 w-4 text-cyan-400" aria-hidden="true" />
        )}
        {label}
      </a>

      {note ? (
        <span
          role="status"
          className="absolute top-full left-1/2 z-50 mt-2 w-max max-w-[18rem] -translate-x-1/2 rounded-xl border border-cyan-400/30 bg-surface/95 px-3.5 py-2 text-xs font-mono leading-snug text-cyan-200 shadow-2xl backdrop-blur-xl"
        >
          {note}
        </span>
      ) : null}
    </span>
  )
}
