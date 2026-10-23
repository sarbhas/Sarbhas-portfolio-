import { useRef, useState, type FormEvent } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react'
import { profile } from '../data/profile'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'
import { Section } from './ui/Section'
import { SocialLinks } from './ui/SocialLinks'
import { TiltCard } from './ui/TiltCard'
import { Toast } from './ui/Toast'

type FieldName = 'name' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<FieldName, string>>

const DETAILS = [
  { icon: Mail, label: 'Email', value: profile.email, copyValue: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, copyValue: profile.phone, href: `tel:${profile.phoneHref}` },
  { icon: MapPin, label: 'Location', value: profile.location, copyValue: profile.location, href: '' },
]

const FIELDS: { name: FieldName; label: string; type: string; placeholder: string }[] = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Mohammed Sarbhas' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Collaboration on AI/ML Project' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please add a subject.'
  if (values.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}

const emptyValues: Record<FieldName, string> = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const [values, setValues] = useState<Record<FieldName, string>>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const [toastMessage, setToastMessage] = useState<string>('')
  const [showToast, setShowToast] = useState<boolean>(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const refs: Record<FieldName, { current: HTMLElement | null }> = {
    name: nameRef as never,
    email: emailRef as never,
    subject: subjectRef as never,
    message: messageRef as never,
  }

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const copyToClipboard = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        triggerToast(`Copied ${label} to clipboard!`)
      })
    }
  }

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'error', text: 'Please complete all required fields correctly.' })
      const first = (Object.keys(found) as FieldName[])[0]
      refs[first].current?.focus()
      return
    }

    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')

    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      values.subject.trim(),
    )}&body=${encodeURIComponent(body)}`

    setStatus({
      kind: 'success',
      text: `Opening your email client to send message to ${profile.email}...`,
    })

    window.location.href = mailto
    setValues(emptyValues)
  }

  const fieldClass = (field: FieldName) =>
    `w-full rounded-2xl border bg-ink/70 px-4 py-3.5 text-sm font-sans text-cloud placeholder:text-mist/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 ${
      errors[field] ? 'border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20'
    }`

  return (
    <Section
      id="contact"
      eyebrow="Initiate Contact"
      title="Let's Build Something Exceptional"
      lead={profile.contactIntro}
    >
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        {/* Contact Info Cards */}
        <Reveal className="space-y-5">
          <ul className="space-y-4">
            {DETAILS.map(({ icon: Icon, label, value, copyValue, href }) => {
              return (
                <li key={label}>
                  <TiltCard className="flex items-center justify-between p-4 sm:p-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand/20 to-cyan-500/20 text-cyan-300 ring-1 ring-inset ring-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="mt-1 block truncate text-base font-medium text-cloud transition-colors hover:text-cyan-300"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="mt-1 block truncate text-base font-medium text-cloud">
                            {value}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard(copyValue, label)}
                      title={`Copy ${label}`}
                      aria-label={`Copy ${label}`}
                      className="ml-3 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-mist transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </TiltCard>
                </li>
              )
            })}
          </ul>

          {/* Social Profiles */}
          <TiltCard className="p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Developer Ecosystem
            </h3>
            <SocialLinks showLabels className="mt-4" />
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-mist/70">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Available for engineering collaborations</span>
            </div>
          </TiltCard>
        </Reveal>

        {/* The Modern Contact Form */}
        <Reveal delay={120}>
          <TiltCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-cloud">Send Direct Transmission</h3>
                <p className="mt-1 font-mono text-xs text-cyan-300">
                  Response SLA: Typically within 24 hours
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <div
                    key={field.name}
                    className={field.name === 'subject' ? 'sm:col-span-2' : undefined}
                  >
                    <label
                      htmlFor={`contact-${field.name}`}
                      className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-cloud"
                    >
                      {field.label}
                      <span aria-hidden="true" className="ml-1 text-cyan-400">
                        *
                      </span>
                    </label>
                    <input
                      id={`contact-${field.name}`}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'off'}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(e) => update(field.name, e.target.value)}
                      ref={refs[field.name] as never}
                      className={fieldClass(field.name)}
                    />
                    {errors[field.name] && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wider text-cloud"
                  >
                    Your Message
                    <span aria-hidden="true" className="ml-1 text-cyan-400">
                      *
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Describe your project, internship opportunity, or research collaboration..."
                    value={values.message}
                    onChange={(e) => update('message', e.target.value)}
                    ref={messageRef}
                    className={`${fieldClass('message')} resize-y`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {status && (
                <div
                  role="status"
                  className={`mt-5 flex items-start gap-2.5 rounded-2xl border p-4 text-sm ${
                    status.kind === 'success'
                      ? 'border-cyan-400/40 bg-cyan-950/30 text-cyan-200'
                      : 'border-red-500/40 bg-red-950/30 text-red-200'
                  }`}
                >
                  {status.kind === 'success' ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <MagneticButton
                  strength={0.2}
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-brand via-brand-2 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-5px_rgba(6,182,212,0.6)]"
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Launch Transmission
                  </span>
                </MagneticButton>

                <span className="font-mono text-[11px] text-mist/60">
                  Pre-fills securely in your email client
                </span>
              </div>
            </form>
          </TiltCard>
        </Reveal>
      </div>

      {/* Floating Clipboard Feedback Toast */}
      <Toast show={showToast} message={toastMessage} />
    </Section>
  )
}
