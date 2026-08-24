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
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* Ground */}
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <img
          src="/img/hero.jpg"
          alt=""
          width={2400}
          height={1350}
          fetchPriority="high"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 42%',
            filter: 'grayscale(1) contrast(1.25) brightness(0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </div>

      <div className="container relative flex flex-col justify-between" style={{ paddingBlock: '3.5rem 2.5rem', zIndex: 1 }}>
        <div className="rise rise-1 flex items-baseline justify-between gap-4" style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '0.75rem' }}>
          <span className="label">Est. UAE · {FOUNDED}</span>
          <span className="label">Made-to-measure</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-end" style={{ paddingBlock: '4rem 0', flex: 1, alignContent: 'center' }}>
          <div className="lg:col-span-8">
            <p
              className="rise rise-2 display"
              style={{
                fontSize: 'clamp(1.35rem, 3.1vw, 2.5rem)',
                lineHeight: 1.22,
                letterSpacing: '-0.03em',
                color: 'var(--paper-70)',
                maxWidth: '24ch',
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
                gap: '0.5rem',
                marginBottom: '2.75rem',
                fontSize: 'clamp(0.875rem, 1.5vw, 1.0625rem)',
                color: 'var(--paper-45)',
              }}
            >
              <li style={{ display: 'flex', gap: '0.875rem' }}>
                <span style={{ color: 'var(--paper-28)' }}>A.</span> local, inconsistent
              </li>
              <li style={{ display: 'flex', gap: '0.875rem' }}>
                <span style={{ color: 'var(--paper-28)' }}>B.</span> overseas, unpredictable
              </li>
            </ol>

            <h1
              className="rise rise-3"
              style={{
                fontSize: 'clamp(2.75rem, 8.5vw, 6.5rem)',
                lineHeight: 0.95,
                marginBottom: '2.5rem',
                color: 'var(--paper)',
              }}
            >
              There is a third.
            </h1>

            <div className="rise rise-4 flex flex-wrap gap-3">
              <Link to="/inquiry" className="btn btn-invert">
                Start a project
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/work" className="btn btn-outline-invert">View the work</Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <p
              className="rise rise-4 prose-body"
              style={{ fontSize: '0.9375rem', maxWidth: '34ch', marginLeft: 'auto' }}
            >
              Individual pattern drafting for independent brands, hospitality groups, and private
              clients. Produced locally in the UAE with direct oversight from first measurement to
              final press. No minimums.
            </p>
          </div>
        </div>

        <div
          className="rise rise-4 flex items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '0.75rem' }}
        >
          <span className="label">United Arab Emirates</span>
          <span className="label">Scroll ↓</span>
        </div>
      </div>
    </section>
  )
}
