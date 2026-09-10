import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { leadTag, type HeadingLevel } from '../components/Heading'
import {
  EMAIL,
  produceLead,
  produceSummary,
  produceStages,
  produceCost,
  produceTiming,
  produceFaqs,
  produceClose,
  type Para,
} from '../data/site'

/**
 * Renders a paragraph stored as text-and-link segments.
 *
 * The copy links to /sample-maker and /inquiry mid-sentence. Those have to be
 * router links — a plain <a> would drop the SPA and reload the whole bundle —
 * but the sentences still belong in src/data/site.ts with the rest of the
 * copy, so they are stored as segments and assembled here.
 */
function Prose({ para, className = 'prose-body', style }: {
  para: Para
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <p className={className} style={style}>
      {para.map((seg, i) =>
        typeof seg === 'string' ? (
          seg
        ) : (
          <Link key={i} to={seg.to} className="prose-link">
            {seg.text}
          </Link>
        ),
      )}
    </p>
  )
}

export default function Produce({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)

  return (
    <>
      {/* Lead */}
      <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="Guide" meta="Concept to production" />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <H
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    lineHeight: 1.02,
                    marginBottom: '2rem',
                  }}
                >
                  {produceLead.heading}
                </H>
                <p className="prose-body" style={{ fontSize: '1.0625rem', maxWidth: '58ch' }}>
                  {produceLead.paragraphs[0]}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="prose-body" style={{ fontSize: '0.9375rem' }}>
                  {produceLead.paragraphs[1]}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The short version */}
      <section style={{ background: 'var(--paper-dim)', paddingBlock: '5rem' }}>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="label label-strong" style={{ letterSpacing: '0.16em' }}>
                  {produceSummary.heading}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <p className="prose-body" style={{ fontSize: '1.0625rem', maxWidth: '62ch' }}>
                  {produceSummary.body}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The four stages */}
      <section
        className="on-black"
        style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '6.5rem' }}
      >
        <div className="container">
          <SectionHead label="The four stages" meta={`${produceStages.length} stages`} />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2.5rem)' }}>
                <Reveal>
                  <h2
                    style={{
                      fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                      marginBottom: '1.5rem',
                      color: 'var(--paper)',
                    }}
                  >
                    Specification, sample, fitting, production.
                  </h2>
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-8" style={{ listStyle: 'none' }}>
              {produceStages.map((stage, i) => (
                <Reveal key={stage.num} delay={0.04} as="li">
                  <div
                    className="grid md:grid-cols-12 gap-4 md:gap-6 items-start"
                    style={{
                      borderTop: '1px solid var(--rule-dark)',
                      paddingBlock: '2.5rem',
                      borderBottom:
                        i === produceStages.length - 1 ? '1px solid var(--rule-dark)' : undefined,
                    }}
                  >
                    <div className="md:col-span-2">
                      <span className="label">{stage.num}</span>
                    </div>
                    <div className="md:col-span-10" style={{ maxWidth: '58ch' }}>
                      <h3
                        style={{ fontSize: '1.125rem', marginBottom: '0.875rem', color: 'var(--paper)' }}
                      >
                        {stage.title}
                      </h3>
                      {stage.paragraphs.map((para, k) => (
                        <Prose
                          key={k}
                          para={para}
                          style={{
                            fontSize: '0.9375rem',
                            marginBottom: k === stage.paragraphs.length - 1 ? 0 : '1rem',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Cost */}
      <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="Cost" meta="No published prices" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}>
                  {produceCost.heading}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                <p
                  className="prose-body"
                  style={{ fontSize: '1.0625rem', maxWidth: '62ch', marginBottom: '1.5rem' }}
                >
                  {produceCost.intro}
                </p>
                <p
                  className="prose-body"
                  style={{
                    fontSize: '0.9375rem',
                    maxWidth: '62ch',
                    borderTop: '1px solid var(--rule)',
                    borderBottom: '1px solid var(--rule)',
                    paddingBlock: '1.75rem',
                    marginBottom: '1.75rem',
                  }}
                >
                  {produceCost.body}
                </p>
                <Prose
                  para={produceCost.close}
                  style={{ fontSize: '0.9375rem', maxWidth: '62ch' }}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timing */}
      <section style={{ background: 'var(--paper-dim)', paddingBlock: '5rem' }}>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 className="label label-strong" style={{ letterSpacing: '0.16em' }}>
                  {produceTiming.heading}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.05}>
                {produceTiming.paragraphs.map((text, i) => (
                  <p
                    key={i}
                    className="prose-body"
                    style={{ fontSize: '1.0625rem', maxWidth: '62ch' }}
                  >
                    {text}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently asked */}
      <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="Frequently asked" meta={`${produceFaqs.length} questions`} />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}>
                  Before you write in.
                </h2>
              </Reveal>
            </div>

            <dl className="lg:col-span-8" style={{ margin: 0 }}>
              {produceFaqs.map((faq, i) => (
                <Reveal key={faq.q} delay={0.04}>
                  <div
                    style={{
                      borderTop: '1px solid var(--rule)',
                      borderBottom: i === produceFaqs.length - 1 ? '1px solid var(--rule)' : undefined,
                      paddingBlock: '1.75rem',
                    }}
                  >
                    <dt
                      className="mono"
                      style={{
                        fontSize: '0.9375rem',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {faq.q}
                    </dt>
                    <dd className="prose-body" style={{ margin: 0, fontSize: '0.9375rem', maxWidth: '64ch' }}>
                      {faq.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Close */}
      <section
        className="on-black"
        style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '5rem' }}
      >
        <div className="container">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-6">
                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: 'var(--paper)' }}>
                  {produceClose.heading}
                </h2>
              </div>
              <div
                className="lg:col-span-6 flex flex-wrap lg:justify-end items-center"
                style={{ gap: '1.5rem' }}
              >
                {produceClose.links.map(link => (
                  <Link key={link.to} to={link.to} className="link-underline">
                    {link.text}
                  </Link>
                ))}
                <a href={`mailto:${EMAIL}`} className="link-underline">
                  {EMAIL}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
