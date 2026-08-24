import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import SectionHead from '../components/SectionHead'

export default function NotFound() {
  return (
    <>
      <Meta title="Page not found" description="That page doesn’t exist." />
      <section
        className="on-black"
        style={{
          background: 'var(--black)',
          color: 'var(--paper)',
          paddingBlock: '6.5rem',
          minHeight: 'calc(100svh - var(--header-h))',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container w-full">
          <SectionHead label="404" meta="Not found" />
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'var(--paper)', marginBottom: '1.5rem' }}>
            No pattern on file.
          </h1>
          <p className="prose-body" style={{ marginBottom: '2.5rem', maxWidth: '42ch' }}>
            That page doesn’t exist — it may have moved, or the link may be mistyped.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="btn btn-invert">
              Back to the start
              <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link to="/work" className="btn btn-outline-invert">View the work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
