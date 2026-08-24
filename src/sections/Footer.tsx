import { Link } from 'react-router-dom'
import { nav, EMAIL, LOCATION, INSTAGRAM, INSTAGRAM_HANDLE } from '../data/site'

const year = new Date().getFullYear()

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.8125rem',
  color: 'var(--paper-45)',
  textDecoration: 'none',
  transition: 'color 0.18s ease',
  width: 'fit-content',
}

export default function Footer() {
  return (
    <footer
      className="on-black"
      style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '5rem 2.5rem' }}
    >
      <div className="container">
        {/* Closing CTA */}
        <div
          className="grid lg:grid-cols-12 gap-8 items-end"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '3rem', paddingBottom: '4rem' }}
        >
          <div className="lg:col-span-8">
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--paper)' }}>
              No minimums. No standard sizes.
            </h2>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <Link to="/inquiry" className="btn btn-invert">
              Start a project
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div
          className="grid md:grid-cols-12 gap-10"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '3rem', paddingBottom: '3rem' }}
        >
          <div className="md:col-span-5">
            <img
              src="/logo-white.png"
              alt="Popalzai"
              width={1200}
              height={430}
              style={{ height: '30px', width: 'auto', marginBottom: '1.25rem' }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--paper-45)', lineHeight: 1.7, maxWidth: '34ch' }}>
              Made-to-measure garments for hospitality groups, independent brands, and private clients.
              UAE-based production.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <p className="label" style={{ marginBottom: '1.25rem' }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {nav.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--paper-45)')}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/inquiry"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--paper-45)')}
              >
                Contact
              </Link>
            </div>
          </nav>

          <div className="md:col-span-4">
            <p className="label" style={{ marginBottom: '1.25rem' }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={`mailto:${EMAIL}`}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--paper-45)')}
              >
                {EMAIL}
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer noopener"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--paper)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--paper-45)')}
              >
                {INSTAGRAM_HANDLE}
              </a>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.8125rem', color: 'var(--paper-28)' }}>
                {LOCATION}
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          style={{ borderTop: '1px solid var(--rule-dark)', paddingTop: '2rem' }}
        >
          <p className="label">© {year} Popalzai Clothing Production</p>
          <p className="label">UAE-based production · All seven emirates</p>
        </div>
      </div>
    </footer>
  )
}
