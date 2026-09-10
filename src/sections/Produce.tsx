import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/SectionHead'
import NumberedList from '../components/NumberedList'
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
function Prose({ para, style }: { para: Para; style?: React.CSSProperties }) {
  return (
    <p className="prose-body" style={style}>
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

/** Label-left, prose-right band. Used for the two short interlude sections. */
function Aside({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      <div className="lg:col-span-4">
        <Reveal>
          <h2 className="label label-strong" style={{ letterSpacing: '0.16em' }}>
            {heading}
          </h2>
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <Reveal delay={0.05}>{children}</Reveal>
      </div>
    </div>
  )
}

export default function Produce({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)

  return (
    <>
      {/* Lead */}
      <Section>
        <SectionHead label="Guide" meta="Concept to production" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <H style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.02, marginBottom: '2rem' }}>
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
      </Section>

      {/* The short version */}
      <Section tone="dim" pad="5rem">
        <Aside heading={produceSummary.heading}>
          <p className="prose-body" style={{ maxWidth: '62ch' }}>
            {produceSummary.body}
          </p>
        </Aside>
      </Section>

      {/* The four stages */}
      <Section tone="black">
        <SectionHead label="The four stages" meta={`${produceStages.length} stages`} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="sticky-col">
              <Reveal>
                <h2 className="h-section" style={{ marginBottom: '1.5rem' }}>
                  Specification, sample, fitting, production.
                </h2>
              </Reveal>
            </div>
          </div>

          <NumberedList
            items={produceStages.map(stage => ({
              num: stage.num,
              title: stage.title,
              body: stage.paragraphs.map((para, k) => (
                <Prose
                  key={k}
                  para={para}
                  style={{
                    fontSize: '0.9375rem',
                    marginBottom: k === stage.paragraphs.length - 1 ? 0 : '1rem',
                  }}
                />
              )),
            }))}
          />
        </div>
      </Section>

      {/* Cost */}
      <Section>
        <SectionHead label="Cost" meta="No published prices" />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="h-section">{produceCost.heading}</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <p className="prose-body" style={{ maxWidth: '62ch', marginBottom: '1.5rem' }}>
                {produceCost.intro}
              </p>
              <p
                className="prose-body rule-top rule-bottom"
                style={{
                  fontSize: '0.9375rem',
                  maxWidth: '62ch',
                  paddingBlock: '1.75rem',
                  marginBottom: '1.75rem',
                }}
              >
                {produceCost.body}
              </p>
              <Prose para={produceCost.close} style={{ fontSize: '0.9375rem', maxWidth: '62ch' }} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Timing */}
      <Section tone="dim" pad="5rem">
        <Aside heading={produceTiming.heading}>
          {produceTiming.paragraphs.map((text, i) => (
            <p key={i} className="prose-body" style={{ maxWidth: '62ch' }}>
              {text}
            </p>
          ))}
        </Aside>
      </Section>

      {/* Frequently asked */}
      <Section>
        <SectionHead label="Frequently asked" meta={`${produceFaqs.length} questions`} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="h-section">Before you write in.</h2>
            </Reveal>
          </div>

          <dl className="lg:col-span-8" style={{ margin: 0 }}>
            {produceFaqs.map((faq, i) => (
              <Reveal key={faq.q} delay={0.04}>
                <div
                  className={'rule-top' + (i === produceFaqs.length - 1 ? ' rule-bottom' : '')}
                  style={{ paddingBlock: '1.75rem' }}
                >
                  <dt
                    className="mono"
                    style={{ fontSize: '0.9375rem', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}
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
      </Section>

      {/* Close */}
      <Section tone="black" pad="5rem">
        <Reveal>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-6">
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>{produceClose.heading}</h2>
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
      </Section>
    </>
  )
}
