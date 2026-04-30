export default function Work() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Selected Work</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2014 – 2020</span>
        </div>

        {/* History paragraph */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
          <div className="lg:col-span-4">
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.5rem' }}>
                A decade of<br />
                <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>hotel production</span>
              </h2>
              <div style={{ width: '2.5rem', height: '1px', background: 'var(--accent)' }} />
            </div>
          </div>
          <div className="lg:col-span-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '60ch' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                From 2014 through 2020, Popalzai operated as one of the UAE's primary hospitality uniform
                producers — outfitting front-of-house teams across some of the country's most recognised
                hotel brands. Properties under Four Seasons, Waldorf Astoria, Mandarin Oriental, W Hotels,
                Renaissance, and FIVE were all dressed through this studio.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                The work was large in scale — hundreds of staff across multiple properties, with seasonal
                replenishment, new hire onboarding, and ongoing alterations handled throughout. Every
                programme required individual measurement sessions conducted on-site at the property,
                pattern drafting for each role, and fabric selection appropriate to the environment —
                whether a poolside bar, a fine dining room, or a concierge desk.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-soft)', fontWeight: 300 }}>
                That period built the operational foundations the studio runs on today — the pattern
                archiving system, the on-site measurement process, the quality control stages, and the
                understanding that fit is not a finishing touch but the starting point of everything.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem', marginBottom: '4rem' }}>
          <div className="flex justify-between items-baseline mb-12">
            <p className="eyebrow">Studio Timeline</p>
            <p className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2009 – Present</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              {
                year: '2009',
                title: 'Founded',
                body: 'Popalzai is established in the United Arab Emirates. Production begins serving the local hospitality sector.',
              },
              {
                year: '2014',
                title: 'First Major Hotel Commissions',
                body: 'Four Seasons Resort Jumeirah Beach and Waldorf Astoria Palm Jumeirah become the studio\'s first large-scale hotel clients. Individual measurement sessions and full FOH programmes are delivered.',
              },
              {
                year: '2016–2017',
                title: 'DIFC Expansion',
                body: 'Four Seasons DIFC and Waldorf Astoria DIFC follow — two of Dubai\'s most prominent business district properties. Renaissance Downtown Dubai and FIVE Palm Jumeirah are added the same year.',
              },
              {
                year: '2019',
                title: 'Peak Production Period',
                body: 'The studio\'s most active year: FIVE Jumeirah Village, Mandarin Oriental Jumeira, and W Dubai – The Palm are all outfitted. Multiple concurrent programmes are managed simultaneously.',
              },
              {
                year: '2020',
                title: 'W Abu Dhabi',
                body: 'W Abu Dhabi – Yas Island marks the studio\'s first Abu Dhabi hotel commission, extending reach beyond Dubai for the first time.',
              },
              {
                year: '2025',
                title: 'New Direction',
                body: 'Under second-generation leadership — trained in fashion and fabric science in Italy — the studio refocuses: fewer commissions, deeper craft, and individual pattern drafting returned to the centre of every project.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="grid lg:grid-cols-12 gap-6 items-start"
                style={{ borderTop: '1px solid var(--rule)', paddingTop: '2rem', paddingBottom: '2rem' }}
              >
                <div className="lg:col-span-2">
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '0.95rem', color: 'var(--ink-faint)', fontStyle: 'italic' }}>{item.year}</p>
                </div>
                <div className="lg:col-span-3">
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.05rem', fontWeight: 400, color: 'var(--ink)' }}>{item.title}</p>
                </div>
                <div className="lg:col-span-7">
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.8 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client grid */}
        <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '4rem' }}>
          <div className="flex justify-between items-baseline mb-10">
            <div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', fontWeight: 400, marginBottom: '0.3rem' }}>
                Hospitality Programmes
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>Verified commissions from the period 2014–2020</p>
            </div>
            <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>2014–2020</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--rule)' }}>
            {[
              { year: '2014', name: 'Four Seasons Resort Jumeirah Beach', location: 'Dubai' },
              { year: '2014', name: 'Waldorf Astoria Palm Jumeirah', location: 'Dubai' },
              { year: '2016', name: 'Four Seasons DIFC', location: 'Dubai' },
              { year: '2017', name: 'Waldorf Astoria DIFC', location: 'Dubai' },
              { year: '2017', name: 'Renaissance Downtown Dubai', location: 'Dubai' },
              { year: '2017', name: 'FIVE Palm Jumeirah', location: 'Dubai' },
              { year: '2019', name: 'FIVE Jumeirah Village', location: 'Dubai' },
              { year: '2019', name: 'Mandarin Oriental Jumeira', location: 'Dubai' },
              { year: '2019', name: 'W Dubai – The Palm', location: 'Dubai' },
              { year: '2020', name: 'W Abu Dhabi – Yas Island', location: 'Abu Dhabi' },
            ].map((c) => (
              <div key={c.name} style={{ background: 'var(--white)', padding: '1.5rem 2rem' }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--ink-faint)' }}>{c.year}</span>
                <p style={{ fontSize: '0.88rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.2rem' }}>{c.name}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>{c.location}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginTop: '1rem', fontStyle: 'italic' }}>
            Production records prior to 2014 are partial. The above represents verified programmes from the latter period.
          </p>
        </div>

      </div>
    </section>
  )
}
