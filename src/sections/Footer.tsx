import { Link } from 'react-router-dom'

const links = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/process', label: 'Process' },
  { to: '/studio', label: 'Studio' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--cream)', padding: '4rem 0 2.5rem' }}>
      <div className="container">

        <div className="grid md:grid-cols-3 gap-10 mb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <img src="/Final.png" alt="PCP" style={{ height: '2.25rem', marginBottom: '1rem', filter: 'invert(1)' }} />
            <p style={{ fontSize: '0.78rem', color: 'rgba(245,242,237,0.4)', lineHeight: 1.7 }}>
              Made-to-measure garments for hospitality groups, independent brands, and private clients.
              UAE-based production.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="eyebrow mb-5" style={{ color: 'rgba(245,242,237,0.3)' }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  style={{ fontSize: '0.8rem', color: 'rgba(245,242,237,0.5)', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,242,237,0.5)')}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow mb-5" style={{ color: 'rgba(245,242,237,0.3)' }}>Contact</p>
            <a
              href="mailto:popalzaiproductions@gmail.com"
              style={{ fontSize: '0.8rem', color: 'rgba(245,242,237,0.5)', display: 'block', marginBottom: '0.5rem', textDecoration: 'none' }}
            >
              popalzaiproductions@gmail.com
            </a>
            <p style={{ fontSize: '0.78rem', color: 'rgba(245,242,237,0.3)' }}>United Arab Emirates</p>
            <Link
              to="/inquiry"
              className="btn-primary"
              style={{
                marginTop: '1.5rem',
                display: 'inline-flex',
                background: 'var(--cream)',
                color: 'var(--ink)',
                fontSize: '0.62rem',
                padding: '0.7rem 1.4rem',
              }}
            >
              Start Project
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,242,237,0.25)' }}>© 2026 Popalzai Clothing Production</p>
          <p style={{ fontSize: '0.7rem', color: 'rgba(245,242,237,0.25)' }}>UAE-Based Production · All Seven Emirates</p>
        </div>

      </div>
    </footer>
  )
}
