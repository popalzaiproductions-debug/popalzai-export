export default function Studio() {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--white)' }}>
      <div className="container">

        <div className="rule mb-16 pt-1 flex justify-between items-center">
          <span className="eyebrow">Studio</span>
          <span className="eyebrow" style={{ color: 'var(--ink-faint)' }}>Dubai, UAE</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>
              Our<br />
              <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>workshop</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-muted)', lineHeight: 1.75 }}>
              Located in Dubai, our studio houses pattern drafting equipment, an extensive fabric archive,
              and full in-house production facilities. Every stage of production remains under direct oversight.
            </p>
          </div>
        </div>

        {/* Image grid — placeholder tiles with refined styling */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            style={{
              gridColumn: 'span 2',
              aspectRatio: '16/9',
              background: 'var(--cream)',
              borderRadius: '2px',
              border: '1px solid var(--rule)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem',
            }}
          >
            <span className="eyebrow" style={{ fontSize: '0.58rem', color: 'var(--ink-faint)' }}>Studio — Wide View</span>
            <p style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginTop: '0.25rem' }}>Photography coming soon</p>
          </div>
          {[
            'Production Detail',
            'Pattern Archive',
            'Finished Garments',
            'Materials Storage',
          ].map((label) => (
            <div
              key={label}
              style={{
                aspectRatio: '1',
                background: 'var(--cream)',
                borderRadius: '2px',
                border: '1px solid var(--rule)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1rem',
              }}
            >
              <span className="eyebrow" style={{ fontSize: '0.55rem', color: 'var(--ink-faint)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Studio facts */}
        <div className="grid md:grid-cols-4 gap-8 mt-14" style={{ borderTop: '1px solid var(--rule)', paddingTop: '2.5rem' }}>
          {[
            { label: 'Location', value: 'Dubai, UAE' },
            { label: 'Capacity', value: 'Full production in-house' },
            { label: 'Archive', value: 'All client patterns held indefinitely' },
            { label: 'Visits', value: 'Open by appointment' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="eyebrow mb-1.5">{label}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{value}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
