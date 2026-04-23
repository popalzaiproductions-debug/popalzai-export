import { useState } from 'react'

const faqs = [
  {
    q: 'What is your minimum order?',
    a: 'We have no minimum order quantity. We regularly produce single garments for individual new hires at established clients, as well as full staff complements for new openings.',
  },
  {
    q: 'How long does the process take?',
    a: 'Initial measurement sessions can be scheduled within a week. Production takes 2–3 weeks from measurement completion. Rush orders for single replacements can be accommodated in 1 week.',
  },
  {
    q: 'Do you serve all of the UAE?',
    a: 'Yes. We are based in the UAE with production units locally operated. We conduct on-site measurements and deliver finished garments to all seven emirates.',
  },
  {
    q: 'What happens when we hire new staff?',
    a: 'We keep all patterns archived indefinitely. New team members can be measured and garments produced to the exact specifications of your existing programme, ensuring consistency. Turnaround for additions is 2 weeks.',
  },
  {
    q: 'Are alterations really included?',
    a: 'Yes. Weight fluctuations, adjustments for comfort, or refinements after wear-testing are all covered. We adjust the pattern and the garment at no additional cost.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">FAQ</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Common<br />
              <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>questions</span>
            </h2>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderTop: '1px solid var(--rule)', cursor: 'pointer' }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex justify-between items-center" style={{ padding: '1.5rem 0' }}>
                  <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'var(--ink)', paddingRight: '2rem' }}>{faq.q}</p>
                  <span
                    style={{
                      color: 'var(--ink-muted)',
                      fontSize: '1.2rem',
                      transition: 'transform 0.2s ease',
                      transform: open === i ? 'rotate(45deg)' : 'none',
                      flexShrink: 0,
                    }}
                  >+</span>
                </div>
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: open === i ? '200px' : '0',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.8, paddingBottom: '1.5rem' }}>{faq.a}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--rule)' }} />
          </div>
        </div>

      </div>
    </section>
  )
}
