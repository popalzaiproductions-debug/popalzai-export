import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { services } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

type Props = {
  /** Show only the first N offerings, with a link through to the full page. */
  limit?: number
  level?: HeadingLevel
}

export default function Services({ limit, level = 2 }: Props) {
  const H = leadTag(level)
  const shown = limit ? services.slice(0, limit) : services

  return (
    <section style={{ background: 'var(--paper-dim)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead
          label="Services"
          meta={limit ? `${String(limit).padStart(2, '0')} of ${services.length}` : `${services.length} offerings`}
        />

        <div className="grid lg:grid-cols-12 gap-8 mb-14">
          <div className="lg:col-span-6">
            <Reveal>
              <H style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
                What we make, and how we make it available.
              </H>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <Reveal delay={0.08}>
              <p className="prose-body" style={{ fontSize: '0.9375rem' }}>
                From a single replacement garment to a full staff rollout, we take programmes of any
                scale — without minimums, and without compromising the fit at either end.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--rule)' }}>
          {shown.map((s, i) => (
            <Reveal key={s.num} delay={(i % 3) * 0.06}>
              <article
                style={{
                  background: 'var(--paper)',
                  padding: '2.25rem 1.75rem',
                  height: '100%',
                  transition: 'background 0.2s ease',
                }}
              >
                <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>{s.num}</span>
                <h3 style={{ fontSize: '1.0625rem', letterSpacing: '-0.02em', marginBottom: '0.875rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-70)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {s.description}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="mono"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--ink-45)',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.625rem',
                      }}
                    >
                      <span aria-hidden="true" style={{ color: 'var(--ink-28)' }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {limit && (
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Link to="/services" className="link-underline">
                All {services.length} services →
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
