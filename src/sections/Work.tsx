export default function Work() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Selected Work</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2025 – 2026</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

          {/* La Gente */}
          <div className="grid lg:grid-cols-12 gap-10 items-start" style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="lg:col-span-5 img-hover" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/la-gente.jpg" alt="La Gente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="lg:col-span-7 lg:pt-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.6rem', fontWeight: 400, marginBottom: '0.3rem' }}>La Gente</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>Specialty Coffee Roastery · Dubai</p>
                  </div>
                  <span className="eyebrow">2025</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <p className="eyebrow mb-3">The Brief</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                      Full front-of-house uniform programme for new opening. Required breathable fabrics for a
                      high-energy service environment and easy movement for table-side presentations.
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Our Solution</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                      Washed linen-blend service shirts with reinforced underarm gussets. Cross-back apron design
                      to distribute weight evenly during long shifts. Individual sizing for 24 staff members.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
                {[['Scope', 'FOH Service Team'], ['Materials', 'Linen-Cotton Blend'], ['Timeline', '2 Weeks']].map(([l, v]) => (
                  <div key={l}>
                    <p className="eyebrow mb-1">{l}</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 400 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sea Level */}
          <div className="grid lg:grid-cols-12 gap-10 items-start" style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="lg:col-span-7 lg:order-2 img-hover" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/sea-level.jpg" alt="Sea Level Cafe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="lg:col-span-5 lg:order-1 lg:pt-4 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-baseline mb-8">
                  <div>
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.6rem', fontWeight: 400, marginBottom: '0.3rem' }}>Sea Level Cafe</h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>Coastal Café · Kite Beach UAE</p>
                  </div>
                  <span className="eyebrow">2026</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div>
                    <p className="eyebrow mb-3">The Brief</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                      Industrial laundry durability, coastal colour palette, and consistent sizing across all staff transfers.
                    </p>
                  </div>
                  <div>
                    <p className="eyebrow mb-3">Our Solution</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                      Heavyweight cotton twill, pre-shrunk and industrial wash-tested to 150 cycles. Individual name embroidery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4" style={{ borderTop: '1px solid var(--rule)', paddingTop: '1.5rem' }}>
                {[['Scope', '1 Location'], ['Materials', 'Cotton Twill'], ['Service', 'Ongoing']].map(([l, v]) => (
                  <div key={l}>
                    <p className="eyebrow mb-1">{l}</p>
                    <p style={{ fontSize: '0.85rem', fontWeight: 400 }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* No Cap + Lost Boys */}
          <div className="grid md:grid-cols-2 gap-8" style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div>
              <div className="img-hover mb-6" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img src="/no-cap.jpg" alt="No Cap Barbershop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', fontWeight: 400 }}>No Cap Barbershop</h3>
                <span className="eyebrow">2025</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '0.5rem' }}>Grooming Studio · Satwa, Dubai</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                Heavyweight canvas sets with tool-specific pocketing and chemical-resistant treatment. Streetwear aesthetic with professional durability.
              </p>
            </div>
            <div>
              <div className="img-hover mb-6" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '16/10' }}>
                <img src="/room-5.jpg" alt="Lost Boys" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', fontWeight: 400 }}>Lost Boys</h3>
                <span className="eyebrow">2026</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '0.5rem' }}>Abu Dhabi Brand · UAE</p>
              <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
                An Abu Dhabi brand built on street energy and raw expression, with a distinct, polished edge. Custom production run developed from initial concept through sampling.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
