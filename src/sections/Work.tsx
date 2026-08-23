export default function Work() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Work</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2025 – Present</span>
        </div>

        {/* Current clients */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { name: 'Swey', sub: 'Concept Store · UAE' },
            { name: 'Bad Berry Club', sub: 'Apparel · UAE' },
            { name: 'No Cap Barbershop', sub: 'Grooming & Retail · UAE' },
            { name: '8 Studios', sub: 'Barbershop & Creative Hub · UAE' },
            { name: 'Lostboys Studios', sub: 'Creative Production · UAE' },
            { name: 'WIP Workinprogress', sub: 'Streetwear & Apparel · UAE' },
            { name: 'The Karak', sub: 'Events Company · UAE' },
            { name: 'Losing Dog Company', sub: 'Apparel & Design · UAE' },
          ].map((client, i) => (
            <div
              key={i}
              className="grid lg:grid-cols-12 gap-6 items-baseline"
              style={{ borderTop: '1px solid var(--rule)', paddingTop: '2rem', paddingBottom: '2rem' }}
            >
              <div className="lg:col-span-1">
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '0.9rem', color: 'var(--ink-faint)', fontStyle: 'italic' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="lg:col-span-5">
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', fontWeight: 400 }}>{client.name}</p>
              </div>
              <div className="lg:col-span-6">
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{client.sub}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>



      </div>
    </section>
  )
}
