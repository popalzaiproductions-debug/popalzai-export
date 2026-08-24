import { useState, useRef, useEffect, type FormEvent } from 'react'
import SectionHead from '../components/SectionHead'
import { EMAIL, LOCATION, FORM_ENDPOINT, projectTypes, INSTAGRAM, INSTAGRAM_HANDLE } from '../data/site'

type Fields = {
  name: string
  company: string
  email: string
  projectType: string
  message: string
}

const EMPTY: Fields = { name: '', company: '', email: '', projectType: '', message: '' }

// Deliberately loose: just enough to catch typos, not to reject valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Inquiry() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  // Spam honeypot — a real person never fills this in.
  const honeypot = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  const set = (key: keyof Fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFields(prev => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  function validate(f: Fields) {
    const next: Partial<Record<keyof Fields, string>> = {}
    if (!f.name.trim()) next.name = 'Please tell us your name.'
    if (!f.email.trim()) next.email = 'We need an email to reply to.'
    else if (!EMAIL_RE.test(f.email.trim())) next.email = 'That address doesn’t look right.'
    if (!f.message.trim()) next.message = 'A sentence or two about the project is enough.'
    return next
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    if (honeypot.current?.value) return // bot

    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          company: fields.company,
          email: fields.email,
          projectType: fields.projectType,
          message: fields.message,
          _subject: `New inquiry — ${fields.company || fields.name}`,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setFields(EMPTY)
        return
      }

      // Formspree returns { errors: [{ message }] } on validation failure.
      const body = await res.json().catch(() => null)
      const detail = body?.errors?.[0]?.message
      setFormError(detail ?? `Submission failed. Please email us directly at ${EMAIL}.`)
      setStatus('idle')
    } catch {
      setFormError(`Network error — please email us directly at ${EMAIL}.`)
      setStatus('idle')
    }
  }

  const describedBy = (key: keyof Fields) => (errors[key] ? `${key}-error` : undefined)

  return (
    <section
      className="on-black"
      style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '6.5rem', minHeight: '70vh' }}
    >
      <div className="container">
        <SectionHead label="Start a project" meta="Reply within 24 hours" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5">
            <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', color: 'var(--paper)', marginBottom: '1.75rem' }}>
              Tell us what you need made.
            </h1>
            <p className="prose-body" style={{ maxWidth: '38ch', marginBottom: '3rem' }}>
              Your team, your timeline, and what isn’t working about what you have now. We’ll come back
              with next steps and a consultation slot.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <p className="label" style={{ marginBottom: '0.5rem' }}>Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mono"
                  style={{ fontSize: '0.9375rem', color: 'var(--paper)', textDecoration: 'none', borderBottom: '1px solid var(--rule-dark)', paddingBottom: '0.2rem' }}
                >
                  {EMAIL}
                </a>
              </div>
              <div>
                <p className="label" style={{ marginBottom: '0.5rem' }}>Instagram</p>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono"
                  style={{ fontSize: '0.9375rem', color: 'var(--paper)', textDecoration: 'none', borderBottom: '1px solid var(--rule-dark)', paddingBottom: '0.2rem' }}
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>
              <div>
                <p className="label" style={{ marginBottom: '0.5rem' }}>Location</p>
                <p className="mono" style={{ fontSize: '0.9375rem', color: 'var(--paper-70)' }}>
                  {LOCATION} — all seven emirates
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            {status === 'sent' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                style={{ border: '1px solid var(--rule-dark)', padding: '3rem 2rem', outline: 'none' }}
              >
                <h2 style={{ fontSize: '1.5rem', color: 'var(--paper)', marginBottom: '1rem' }}>
                  Received.
                </h2>
                <p className="prose-body" style={{ fontSize: '0.9375rem', marginBottom: '2rem' }}>
                  Thank you — your inquiry is with us and we’ll be in touch within 24 hours.
                </p>
                <button type="button" className="btn btn-outline-invert" onClick={() => setStatus('idle')}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {formError && (
                  <p role="alert" className="field-error">{formError}</p>
                )}

                {/* honeypot — hidden from people and assistive tech alike */}
                <input
                  ref={honeypot}
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="field">
                    <label className="field-label" htmlFor="name">Name *</label>
                    <input
                      id="name" name="name" type="text" autoComplete="name"
                      className="field-input"
                      value={fields.name} onChange={set('name')}
                      aria-invalid={!!errors.name} aria-describedby={describedBy('name')}
                    />
                    {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
                  </div>

                  <div className="field">
                    <label className="field-label" htmlFor="company">Company / property</label>
                    <input
                      id="company" name="company" type="text" autoComplete="organization"
                      className="field-input"
                      value={fields.company} onChange={set('company')}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email" autoComplete="email" inputMode="email"
                    className="field-input"
                    value={fields.email} onChange={set('email')}
                    aria-invalid={!!errors.email} aria-describedby={describedBy('email')}
                  />
                  {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="projectType">Type of project</label>
                  <select
                    id="projectType" name="projectType"
                    className="field-input"
                    value={fields.projectType} onChange={set('projectType')}
                  >
                    <option value="">Select one — optional</option>
                    {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="message">Project details *</label>
                  <textarea
                    id="message" name="message" rows={5}
                    className="field-input"
                    style={{ resize: 'vertical' }}
                    placeholder="Team size, timeline, what you're producing…"
                    value={fields.message} onChange={set('message')}
                    aria-invalid={!!errors.message} aria-describedby={describedBy('message')}
                  />
                  {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
                </div>

                <div>
                  <button type="submit" className="btn btn-invert" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send inquiry'}
                    {status !== 'sending' && <span className="arrow" aria-hidden="true">→</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
