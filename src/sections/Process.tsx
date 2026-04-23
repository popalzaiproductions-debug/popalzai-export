const steps = [
  {
    num: '01',
    title: 'Consultation',
    description: 'We meet to understand your environment, your brand, or your personal requirements. A kitchen demands different durability than a concierge desk; a private client demands different discretion than a group rollout. We discuss timeline, proportion, and design direction.',
    note: '1–2 hours · No charge',
    image: '/consultation.jpg',
  },
  {
    num: '02',
    title: 'Measurement',
    description: 'Individual sessions using portable fitting equipment. We record 26 measurements per person, scheduled at your convenience. Available across all UAE emirates.',
    note: 'On-site or in-studio',
    image: '/measurment.jpg',
  },
  {
    num: '03',
    title: 'Pattern & Sampling',
    description: 'Patterns drafted by hand in our UAE studio. For orders over 15 garments or multi-piece private commissions, we produce approval samples before full production. All patterns are digitised and archived indefinitely.',
    note: '3–6 days · Patterns archived indefinitely',
    image: '/pattern.jpg',
  },
  {
    num: '04',
    title: 'Production & Quality Control',
    description: 'Single-layer cutting for grain alignment. Three-stage QC: after cutting, after construction, after pressing. Weekly progress updates throughout.',
    note: '2–3 weeks · In-house production',
    image: '/pexels-cottonbro-studio-4622397.jpg',
  },
  {
    num: '05',
    title: 'Delivery & Fitting',
    description: 'Individually packaged with labelling and care instructions. Optional on-site fitting session for final adjustments. Delivery across all seven emirates.',
    note: 'All emirates · Optional on-site fitting',
    image: '/delivery.jpg',
  },
]

export default function Process() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Process</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>05 Steps</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-4">
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.5rem' }}>
                How we<br />
                <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>work</span>
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.75, maxWidth: '32ch' }}>
                A straightforward process designed around operational realities. We work around service hours and
                minimise disruption to daily operations.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <div
                key={i}
                className="grid md:grid-cols-12 gap-6 items-start"
                style={{ borderTop: '1px solid var(--rule)', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}
              >
                <div className="md:col-span-1">
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '0.9rem', color: 'var(--ink-faint)', fontStyle: 'italic' }}>{step.num}</span>
                </div>
                <div className="md:col-span-7">
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', fontWeight: 400, marginBottom: '0.75rem' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.83rem', color: 'var(--ink-muted)', lineHeight: 1.8, marginBottom: '0.75rem' }}>{step.description}</p>
                  <p className="eyebrow" style={{ fontSize: '0.58rem', color: 'var(--accent)' }}>{step.note}</p>
                </div>
                <div className="md:col-span-4 img-hover" style={{ borderRadius: '2px', overflow: 'hidden', aspectRatio: '1' }}>
                  <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)' }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
