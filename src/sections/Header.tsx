import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/process',  label: 'Process' },
  { to: '/studio',   label: 'Studio' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed w-full z-50 top-0" style={{ height: 'var(--header-h)' }}>
      {/* Announcement bar */}
      <div style={{ background: 'var(--ink)', color: 'var(--cream)' }}
        className="text-center py-2.5">
        <p className="eyebrow" style={{ color: 'rgba(245,242,237,0.65)', fontSize: '0.6rem' }}>
          UAE-based production &nbsp;·&nbsp; All seven emirates &nbsp;·&nbsp; No minimums
        </p>
      </div>

      {/* Main header */}
      <header
        style={{
          background: 'var(--cream)',
          borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div className="container flex items-center justify-between" style={{ height: '72px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/Final.png" alt="PCP" className="h-9" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="eyebrow transition-colors"
                style={{
                  color: pathname === to ? 'var(--ink)' : 'var(--ink-muted)',
                  fontSize: '0.62rem',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === to ? 'var(--ink)' : 'var(--ink-muted)')}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/inquiry" className="btn-primary hidden lg:inline-flex" style={{ padding: '0.6rem 1.4rem', fontSize: '0.62rem' }}>
              Start Project
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
            >
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: 'var(--ink)',
                  transform: open ? 'translateY(5px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-4 h-px transition-all duration-300"
                style={{
                  background: 'var(--ink)',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-px transition-all duration-300"
                style={{
                  background: 'var(--ink)',
                  transform: open ? 'translateY(-5px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? '400px' : '0',
            borderTop: open ? '1px solid var(--rule)' : 'none',
            background: 'var(--cream)',
          }}
        >
          <div className="container py-8 flex flex-col gap-6">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="eyebrow"
                style={{ fontSize: '0.7rem', color: pathname === to ? 'var(--ink)' : 'var(--ink-muted)' }}
              >
                {label}
              </Link>
            ))}
            <div className="pt-4 rule">
              <Link to="/inquiry" className="btn-primary mt-6" style={{ fontSize: '0.62rem' }}>
                Start Project
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
