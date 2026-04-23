import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('https://formspree.io/f/xvzvwgla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', company: '', email: '', message: '' })
      } else {
        setError('Submission failed. Please try again or email us directly.')
      }
    } catch {
      setError('Network error. Please email us at info@popalzai.com')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section style={{ padding: '6rem 0', background: 'var(--ink)', color: 'var(--cream)' }}>
      <div className="container">

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '4rem', paddingTop: '0.25rem' }}
          className="flex justify-between items-center">
          <span className="eyebrow" style={{ color: 'rgba(245,242,237,0.4)' }}>Start a Project</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left */}
          <div className="lg:col-span-5">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: 'var(--cream)', marginBottom: '1.5rem' }}>
              Ready to discuss<br />
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>your team?</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(245,242,237,0.55)', lineHeight: 1.8, maxWidth: '36ch', marginBottom: '3rem' }}>
              Tell us about your property, your current uniform situation, and what you're looking to improve.
              We'll respond within 24 hours to schedule a consultation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="mailto:info@popalzai.com" style={{ fontSize: '0.85rem', color: 'rgba(245,242,237,0.55)', textDecoration: 'none' }}>
                info@popalzai.com
              </a>
              <p style={{ fontSize: '0.85rem', color: 'rgba(245,242,237,0.35)' }}>United Arab Emirates</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            {submitted ? (
              <div style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', color: 'var(--cream)', marginBottom: '0.75rem' }}>
                  Thank you.
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245,242,237,0.5)' }}>
                  We've received your inquiry and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {error && (
                  <p style={{ fontSize: '0.78rem', color: '#e07070' }}>{error}</p>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="field-group">
                    <label className="field-label" style={{ color: 'rgba(245,242,237,0.4)' }}>Name</label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={handleChange}
                      className="field-input field-input-dark"
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label" style={{ color: 'rgba(245,242,237,0.4)' }}>Property / Company</label>
                    <input
                      type="text" name="company" required
                      value={form.company} onChange={handleChange}
                      className="field-input field-input-dark"
                    />
                  </div>
                </div>
                <div className="field-group">
                  <label className="field-label" style={{ color: 'rgba(245,242,237,0.4)' }}>Email</label>
                  <input
                    type="email" name="email" required
                    value={form.email} onChange={handleChange}
                    className="field-input field-input-dark"
                  />
                </div>
                <div className="field-group">
                  <label className="field-label" style={{ color: 'rgba(245,242,237,0.4)' }}>Message</label>
                  <textarea
                    name="message" rows={4} required
                    value={form.message} onChange={handleChange}
                    placeholder="Tell us about your team, timeline, and requirements…"
                    className="field-input field-input-dark"
                    style={{ resize: 'none' }}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ background: 'var(--cream)', color: 'var(--ink)', opacity: submitting ? 0.6 : 1 }}
                  >
                    {submitting ? 'Sending…' : 'Send Inquiry'}
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
