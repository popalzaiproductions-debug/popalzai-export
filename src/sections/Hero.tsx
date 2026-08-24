import { Link } from 'react-router-dom'

const points = [
  'No minimum order',
  '26 measurements per person',
  'Patterns kept for life',
]

export default function Hero() {
  return (
    <section
      className="on-black relative"
      style={{
        background: 'var(--black)',
        color: 'var(--paper)',
        minHeight: 'calc(100svh - var(--header-h))',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <div
        className="container relative flex flex-col justify-between"
        style={{ paddingBlock: '3rem 2.5rem', zIndex: 1 }}
      >
        <div
          className="rise rise-1 flex items-baseline justify-between gap-4"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '0.75rem' }}
        >
          <span className="label">Made-to-measure</span>
          <span className="label">United Arab Emirates</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingBlock: '3rem 2.5rem' }}>
          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 w-full items-end">
            <div className="lg:col-span-8">
              <h1
                className="rise rise-2"
                style={{
                  fontSize: 'clamp(2.5rem, 7.4vw, 6.25rem)',
                  lineHeight: 0.96,
                  marginBottom: '2.25rem',
                  color: 'var(--paper)',
                }}
              >
                Cut to the person,<br />not the chart.
              </h1>

              <p
                className="rise rise-3 prose-body"
                style={{ fontSize: '1.0625rem', maxWidth: '52ch', marginBottom: '2.75rem' }}
              >
                Uniforms and garments drafted from individual measurements and produced here in the
                UAE — under direct oversight from the first fitting to the final press. Nothing graded,
                nothing outsourced, nothing ordered by the container.
              </p>

              <div className="rise rise-4 flex flex-wrap gap-3">
                <Link to="/inquiry" className="btn btn-invert">
                  Start a project
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
                <Link to="/process" className="btn btn-outline-invert">How it works</Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <ul className="rise rise-4" style={{ listStyle: 'none' }}>
                {points.map((point, i) => (
                  <li
                    key={point}
                    className="mono"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--paper-70)',
                      borderTop: '1px solid var(--rule-dark)',
                      borderBottom: i === points.length - 1 ? '1px solid var(--rule-dark)' : undefined,
                      paddingBlock: '0.875rem',
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="rise rise-4 flex items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '0.75rem' }}
        >
          <span className="label">Independent brands · Hospitality · Private clients</span>
          <span className="label">All seven emirates</span>
        </div>
      </div>
    </section>
  )
}
