import { Link } from 'react-router-dom'

const clients = [
  { name: 'La Gente', sub: 'Specialty Coffee Roastery · Dubai' },
  { name: 'Sea Level Cafe', sub: 'Coastal Café · Kite Beach UAE' },
  { name: 'No Cap Barbershop', sub: 'Grooming Studio · Dubai' },
  { name: 'Lost Boys', sub: 'Abu Dhabi Brand · UAE' },
]

export default function Hero() {
  return (
    <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: 'var(--cream)' }}>
      <div className="container">

        {/* Top rule + label */}
        <div className="rule mb-12 pt-1 flex items-center justify-between">
          <span className="eyebrow">Est. UAE</span>
          <span className="eyebrow">Made-to-Measure</span>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left — headline + CTAs */}
          <div className="lg:col-span-5 fade-up fade-up-1">
            <h1
              className="mb-8 leading-none"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
            >
              Production<br />
              <span className="serif-italic" style={{ color: 'var(--ink-muted)' }}>without</span>{' '}
              standard sizes.
            </h1>
            <p
              className="mb-10 leading-relaxed"
              style={{ color: 'var(--ink-muted)', fontSize: '1rem', maxWidth: '38ch', fontWeight: 300 }}
            >
              Individual pattern drafting for hospitality groups, independent brands, and private clients.
              No minimums. Produced locally in the UAE with direct oversight from first measurement to final press.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/inquiry" className="btn-primary">Request Consultation</Link>
              <Link to="/work" className="btn-ghost">View Work</Link>
            </div>
          </div>

          {/* Center — hero image */}
          <div className="lg:col-span-4 fade-up fade-up-2">
            <div className="img-hover" style={{ aspectRatio: '3/4', borderRadius: '2px', overflow: 'hidden' }}>
              <img
                src="/hero-suit.jpg"
                alt="Made-to-measure garment"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Right — clients list */}
          <div className="lg:col-span-3 fade-up fade-up-3 flex flex-col justify-end h-full">
            <div style={{ paddingTop: '2rem' }}>
              <p className="eyebrow mb-6">Selected Clients</p>
              <div className="flex flex-col" style={{ gap: '0' }}>
                {clients.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      borderTop: '1px solid var(--rule)',
                      paddingTop: '1rem',
                      paddingBottom: '1rem',
                    }}
                  >
                    <p style={{ fontWeight: 400, fontSize: '0.875rem', color: 'var(--ink)' }}>{c.name}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '0.15rem' }}>{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom stats strip */}
        <div className="rule mt-16 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 fade-up fade-up-4">
          {[
            { num: '26', label: 'Measurements per person' },
            { num: '2–3 wk', label: 'Production timeline' },
            { num: '0', label: 'Standard sizes used' },
            { num: '∞', label: 'Pattern archive' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', lineHeight: 1 }}>{num}</p>
              <p className="eyebrow mt-1" style={{ fontSize: '0.6rem' }}>{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
