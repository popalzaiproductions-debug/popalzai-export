export default function Work() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Work</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2025 – Present</span>
        </div>

        {/* Current clients */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-4">
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.5rem' }}>
                Current<br />
                <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>commissions</span>
              </h2>
              <div style={{ width: '2.5rem', height: '1px', background: 'var(--accent)' }} />
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.75, marginTop: '1.5rem' }}>
                Work produced under new leadership — independent brands and clients where
                individual craft is the brief, not a secondary consideration.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8" style={{ display: 'flex', flexDirection: 'column' }}>

            {/* La Gente */}
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '3rem', paddingBottom: '3rem' }}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 img-hover" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '4/5' }}>
                  <img src="/la-gente.jpg" alt="La Gente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="md:col-span-7">
                  <div className="flex justify-between items-baseline mb-6">
                    <div>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.25rem' }}>La Gente</h3>
                      <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Specialty Coffee Roastery · Dubai</p>
                    </div>
                    <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2025</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    Full front-of-house uniform programme for new opening. Washed linen-blend service shirts
                    with reinforced underarm gussets and a cross-back apron design built for long shifts.
                    Individual sizing for the full service team.
                  </p>
                  <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem' }}>
                    {[['Scope', 'Full FOH Team'], ['Material', 'Linen-Cotton'], ['Timeline', '2 Weeks']].map(([l, v]) => (
                      <div key={l}>
                        <p className="eyebrow mb-1" style={{ fontSize: '0.55rem' }}>{l}</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: 400 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sea Level */}
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '3rem', paddingBottom: '3rem' }}>
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-5 img-hover" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '4/5' }}>
                  <img src="/sea-level.jpg" alt="Sea Level Cafe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="md:col-span-7">
                  <div className="flex justify-between items-baseline mb-6">
                    <div>
                      <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.25rem' }}>Sea Level Cafe</h3>
                      <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Coastal Café · Kite Beach UAE</p>
                    </div>
                    <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2026</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    Industrial laundry durability with a coastal colour palette. Heavyweight cotton twill,
                    pre-shrunk and wash-tested to 150 cycles, with individual name embroidery throughout.
                  </p>
                  <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.25rem' }}>
                    {[['Scope', 'Full Team'], ['Material', 'Cotton Twill'], ['Service', 'Ongoing']].map(([l, v]) => (
                      <div key={l}>
                        <p className="eyebrow mb-1" style={{ fontSize: '0.55rem' }}>{l}</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: 400 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* No Cap + Lost Boys */}
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '3rem' }}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="img-hover mb-5" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '1' }}>
                    <img src="/no-cap.jpg" alt="No Cap Barbershop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', fontWeight: 400 }}>No Cap Barbershop</h3>
                    <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2025</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.5rem' }}>Grooming Studio · Satwa, Dubai</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                    Heavyweight canvas sets with tool-specific pocketing and chemical-resistant treatment.
                    Streetwear aesthetic built on professional durability.
                  </p>
                </div>
                <div>
                  <div className="img-hover mb-5" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '1' }}>
                    <img src="/room-5.jpg" alt="Lost Boys" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.1rem', fontWeight: 400 }}>Lost Boys</h3>
                    <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2026</span>
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '0.5rem' }}>Independent Brand · Abu Dhabi</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                    An Abu Dhabi brand built on street energy and a distinct, polished edge.
                    Developed from initial concept through sampling and full production run.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>



      </div>
    </section>
  )
}
