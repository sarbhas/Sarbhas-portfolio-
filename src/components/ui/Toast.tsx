import { CheckCircle2 } from 'lucide-react'

interface ToastProps {
  show: boolean
  message: string
}

export function Toast({ show, message }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-cyan-400/40 bg-surface/90 px-4 py-3 text-sm font-medium text-cloud shadow-[0_16px_36px_-10px_rgba(6,182,212,0.35)] backdrop-blur-xl transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100 scale-100' : 'pointer-events-none translate-y-4 opacity-0 scale-95'
      }`}
    >
      <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-500/20 text-cyan-300">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <span>{message}</span>
    </div>
  )
}
