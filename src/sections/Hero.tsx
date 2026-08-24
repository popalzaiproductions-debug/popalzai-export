import { Link } from 'react-router-dom'
import { FOUNDED } from '../data/site'

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
          <span className="label">Est. UAE · {FOUNDED}</span>
          <span className="label">Made-to-measure</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingBlock: '3rem 2.5rem' }}>
          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-12 w-full items-end">
            <div className="lg:col-span-8">
              <p
                className="rise rise-2 display"
                style={{
                  fontSize: 'clamp(1.25rem, 2.6vw, 2rem)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.03em',
                  color: 'var(--paper-45)',
                  maxWidth: '26ch',
                  marginBottom: '2rem',
                }}
              >
                Clothing production here has meant a choice between two bad options.
              </p>

              <ol
                className="rise rise-3 mono"
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '2.5rem',
                  fontSize: 'clamp(0.8125rem, 1.4vw, 1rem)',
                  color: 'var(--paper-45)',
                  maxWidth: '30rem',
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    borderTop: '1px solid var(--rule-dark)',
                    paddingBlock: '0.75rem',
                  }}
                >
                  <span style={{ color: 'var(--paper-28)' }}>A.</span> local, inconsistent
                </li>
                <li
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    borderTop: '1px solid var(--rule-dark)',
                    borderBottom: '1px solid var(--rule-dark)',
                    paddingBlock: '0.75rem',
                  }}
                >
                  <span style={{ color: 'var(--paper-28)' }}>B.</span> overseas, unpredictable
                </li>
              </ol>

              <h1
                className="rise rise-3"
                style={{
                  fontSize: 'clamp(2.75rem, 8.2vw, 7rem)',
                  lineHeight: 0.94,
                  marginBottom: '2.5rem',
                  color: 'var(--paper)',
                }}
              >
                There is<br />a third.
              </h1>

              <div className="rise rise-4 flex flex-wrap gap-3">
                <Link to="/inquiry" className="btn btn-invert">
                  Start a project
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
                <Link to="/process" className="btn btn-outline-invert">How it works</Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <p
                className="rise rise-4 prose-body"
                style={{ fontSize: '0.9375rem', maxWidth: '36ch' }}
              >
                Individual pattern drafting for independent brands, hospitality groups, and private
                clients. Produced locally in the UAE with direct oversight from first measurement to
                final press. No minimums.
              </p>
            </div>
          </div>
        </div>

        <div
          className="rise rise-4 flex items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '0.75rem' }}
        >
          <span className="label">United Arab Emirates</span>
          <span className="label">All seven emirates</span>
        </div>
      </div>
    </section>
  )
}
