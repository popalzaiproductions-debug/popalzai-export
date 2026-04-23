const services = [
  {
    num: '01',
    title: 'Made-to-Measure Programs',
    description: 'Complete garment solutions for new openings, brand launches, or private wardrobe builds. Individual measurement sessions, sample approvals, and full production with individual labelling.',
    features: ['Individual 26-point measurement', 'Pattern drafting & indefinite storage', '2–6 week production', 'No minimum order'],
  },
  {
    num: '02',
    title: 'Private Client Tailoring',
    description: 'Individual commissions for clients who require precise fit and personal oversight. From single garments to seasonal wardrobe development.',
    features: ['Dedicated fitting sessions', 'Pattern archive for life', 'Seasonal wardrobe planning', 'Discreet, personal service'],
  },
  {
    num: '03',
    title: 'Brand Production',
    description: 'Small-batch production for independent labels and emerging brands. Pattern development, sampling, and controlled runs with consistent quality.',
    features: ['Custom pattern drafting', 'Sample prototyping', 'Function & wear testing', 'Brand alignment consultation'],
  },
  {
    num: '04',
    title: 'New Hire & Team Onboarding',
    description: 'Maintain your pattern library for ongoing staffing needs. Two-week turnaround for additions, consistent with your existing programme.',
    features: ['2-week turnaround for additions', 'Consistent with existing programme', 'Direct delivery to property', 'Size record maintenance'],
  },
  {
    num: '05',
    title: 'Alterations & Maintenance',
    description: 'Lifetime alterations on all garments we produce. Pattern adjustments stored indefinitely — weight changes, comfort refinements, wear-test feedback.',
    features: ['Free alterations for life', 'Pattern adjustments stored', 'Individual garment replacement', 'Same-fabric matching'],
  },
  {
    num: '06',
    title: 'Material Sourcing & Development',
    description: 'In-house fabric library spanning technical hospitality cloths to premium shirtings. Industrial-tested and climate-appropriate for UAE conditions.',
    features: ['Pre-washed, shrink-tested fabrics', 'Industrial laundry certified', 'Climate-specific weights', 'Stain-resistant options available'],
  },
]

export default function Services() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Services</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>06 Offerings</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              What we offer
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              From individual replacements to full staff rollouts, we accommodate programmes of any scale
              without minimums or compromise on quality.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--rule)' }}>
          {services.map((s) => (
            <div
              key={s.num}
              style={{ background: 'var(--cream)', padding: '2.5rem 2rem', transition: 'background 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--cream)')}
            >
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1.25rem', color: 'var(--ink-faint)' }}>{s.num}</span>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', marginBottom: '0.75rem', fontWeight: 400 }}>{s.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.75, marginBottom: '1.25rem' }}>{s.description}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {s.features.map((f) => (
                  <li key={f} style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '12px', height: '1px', background: 'var(--accent)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
