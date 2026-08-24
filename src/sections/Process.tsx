import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { process } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

export default function Process({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)
  return (
    <section
      className="on-black"
      style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '6.5rem' }}
    >
      <div className="container">
        <SectionHead label="Process" meta={`${process.length} steps`} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2.5rem)' }}>
              <Reveal>
                <H style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: '1.5rem', color: 'var(--paper)' }}>
                  Measurement to final press.
                </H>
                <p className="prose-body" style={{ fontSize: '0.9375rem', maxWidth: '32ch' }}>
                  Built around operational reality. We work around service hours and keep disruption to
                  daily trading close to zero.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-8" style={{ listStyle: 'none' }}>
            {process.map((step, i) => (
              <Reveal key={step.num} delay={0.04} as="li">
                <div
                  className="grid md:grid-cols-12 gap-4 md:gap-6 items-start"
                  style={{
                    borderTop: '1px solid var(--rule-dark)',
                    paddingBlock: '2.5rem',
                    borderBottom: i === process.length - 1 ? '1px solid var(--rule-dark)' : undefined,
                  }}
                >
                  <div className="md:col-span-2">
                    <span className="label">{step.num}</span>
                  </div>
                  <div className="md:col-span-10" style={{ maxWidth: '58ch' }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '0.875rem', color: 'var(--paper)' }}>
                      {step.title}
                    </h3>
                    <p className="prose-body" style={{ fontSize: '0.9375rem', marginBottom: '1rem' }}>
                      {step.description}
                    </p>
                    <p className="label label-strong">{step.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
