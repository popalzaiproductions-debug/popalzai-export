import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { clients } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

type Props = { preview?: boolean; level?: HeadingLevel }

export default function Work({ preview = false, level = 2 }: Props) {
  const H = leadTag(level)

  return (
    <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="Work" meta="Selected 2025 — 2026" />

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-7">
            <Reveal>
              <H style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}>
                Garments in service, not on a hanger.
              </H>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <Reveal delay={0.08}>
              <p className="prose-body" style={{ fontSize: '0.9375rem' }}>
                Current production for barbershops, concept stores, events companies, and independent
                labels across the Emirates.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Client index — unnumbered on purpose: a numbered list reads as a ranking */}
        <ul style={{ listStyle: 'none' }}>
          {clients.map((c, i) => (
            <Reveal key={c.name} as="li" delay={0.03}>
              <div
                className="grid grid-cols-12 gap-x-4 gap-y-1 items-baseline"
                style={{
                  borderTop: '1px solid var(--rule)',
                  paddingBlock: '1.75rem',
                  borderBottom: i === clients.length - 1 ? '1px solid var(--rule)' : undefined,
                }}
              >
                <p
                  className="col-span-12 sm:col-span-6"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 'clamp(1rem, 2vw, 1.375rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {c.name}
                </p>
                <p className="label col-span-12 sm:col-span-6 sm:text-right">
                  {c.sector} · UAE
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            {preview ? (
              <Link to="/work" className="link-underline">Full client index →</Link>
            ) : (
              <Link to="/inquiry" className="btn">
                Start a project
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
