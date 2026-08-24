import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav } from '../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the drawer on navigation.
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock background scroll while the drawer is open, and close on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontFamily: 'var(--mono)',
    fontSize: '0.6875rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    color: isActive ? 'var(--black)' : 'var(--ink-45)',
    paddingBottom: '0.25rem',
    borderBottom: `1px solid ${isActive ? 'var(--black)' : 'transparent'}`,
    transition: 'color 0.18s ease, border-color 0.18s ease',
  })

  return (
    <div className="fixed top-0 w-full z-50" style={{ height: 'var(--header-h)' }}>
      <header
        style={{
          background: 'var(--paper)',
          borderBottom: '1px solid var(--rule)',
          height: 'var(--nav-h)',
        }}
      >
        <div className="container flex items-center justify-between h-full gap-6">
          <Link to="/" aria-label="Popalzai Clothing Production — home" className="shrink-0 flex items-center">
            <img
              src="/logo.png"
              alt="Popalzai"
              width={1200}
              height={430}
              style={{ height: '26px', width: 'auto', display: 'block' }}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {nav.map(({ to, label }) => (
              <NavLink key={to} to={to} style={linkStyle}>{label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/inquiry"
              className="btn hidden lg:inline-flex"
              style={{ padding: '0.6875rem 1.375rem', fontSize: '0.625rem' }}
            >
              Start a project
            </Link>

            <button
              type="button"
              className="lg:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span
                className="block w-6 h-px transition-transform duration-300"
                style={{ background: 'var(--black)', transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block w-6 h-px transition-transform duration-300"
                style={{ background: 'var(--black)', transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className="lg:hidden"
        style={{
          position: 'fixed',
          inset: 'var(--header-h) 0 0 0',
          background: 'var(--paper)',
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          // visibility flips instantly on open, but waits for the slide-out to
          // finish on close — transitioning it over a duration just makes the
          // panel un-hittable while it is still on screen.
          transition: open
            ? 'transform 0.35s cubic-bezier(0.22,0.61,0.36,1), opacity 0.25s ease, visibility 0s'
            : 'transform 0.35s cubic-bezier(0.22,0.61,0.36,1), opacity 0.25s ease, visibility 0s linear 0.35s',
          overflowY: 'auto',
        }}
      >
        <div className="container py-10 flex flex-col gap-1">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="display"
              style={({ isActive }) => ({
                fontSize: '1.75rem',
                textDecoration: 'none',
                color: isActive ? 'var(--black)' : 'var(--ink-45)',
                borderTop: '1px solid var(--rule)',
                padding: '1.125rem 0',
              })}
            >
              {label}
            </NavLink>
          ))}

          <Link
            to="/inquiry"
            className="btn mt-8 self-start"
          >
            Start a project
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
