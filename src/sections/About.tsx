export default function About() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">About PCP</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Sticky heading */}
          <div className="lg:col-span-4">
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.5rem' }}>
                Why we don't use<br />
                <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>standard sizes</span>
              </h2>
              <div style={{ width: '2.5rem', height: '1px', background: 'var(--accent)' }} />
            </div>
          </div>

          {/* Body */}
          <div className="lg:col-span-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '60ch' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                Popalzai Clothing Production was founded on a simple observation: most people—whether they are
                front-of-house staff, brand founders, or private clients—are wearing garments graded from arbitrary
                size charts that ignore posture, movement, and individual proportion.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                We operate production units in the UAE, maintaining direct oversight of every stage from initial
                measurement to final pressing. This local presence allows us to offer services that outsourced
                manufacturing cannot: individual pattern drafting, indefinite pattern archiving, and lifetime alterations.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                Our clients range from single-location cafés to multi-property hotel groups, and from emerging fashion
                labels to individuals who require precise, consistent fit. What unites them is the understanding that
                well-fitting garments are part of identity—whether that identity is a brand or a personal wardrobe.
              </p>
            </div>

            {/* Three pillars */}
            <div className="grid md:grid-cols-3 gap-8 mt-14" style={{ borderTop: '1px solid var(--rule)', paddingTop: '2.5rem' }}>
              {[
                { title: 'Local', body: 'UAE-based production with direct oversight. No outsourcing to third-party facilities.' },
                { title: 'Individual', body: 'Every pattern drafted from individual measurements. No grading from standard sizes.' },
                { title: 'Ongoing', body: 'Patterns archived indefinitely. Easy onboarding for new hires at any time.' },
              ].map(({ title, body }) => (
                <div key={title}>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', marginBottom: '0.6rem' }}>{title}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
