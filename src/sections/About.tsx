import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { FOUNDED } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

const pillars = [
  { title: 'Local',      body: 'UAE-based production under direct oversight. No outsourcing to third-party facilities.' },
  { title: 'Individual', body: 'Every pattern drafted from individual measurements. Nothing graded from a standard size.' },
  { title: 'Ongoing',    body: 'Patterns archived indefinitely, so new hires can be added at any time without drift.' },
]

export default function About({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)

  return (
    <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="About" meta={`Est. ${FOUNDED}`} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            {/* sticky works now that overflow-x:hidden is off the root elements */}
            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2.5rem)' }}>
              <Reveal>
                <H style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: '1.5rem' }}>
                  A production house, not a factory.
                </H>
                <div style={{ width: '2.5rem', height: '1px', background: 'var(--black)' }} />
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p className="prose-body">
                  Popalzai Clothing Production began in {FOUNDED} on a simple observation: most people —
                  front-of-house staff, brand founders, private clients alike — are wearing garments
                  graded from arbitrary size charts that ignore posture, movement, and individual
                  proportion.
                </p>
                <p className="prose-body">
                  We operate production in the UAE and keep direct oversight of every stage from first
                  measurement to final pressing. That local presence is what makes the rest possible:
                  individual pattern drafting, indefinite pattern archiving, and lifetime alterations —
                  none of which outsourced manufacturing can offer.
                </p>
                <p className="prose-body">
                  The first decade was spent outfitting restaurants and hospitality groups across the
                  Emirates. The studio is now moving in a different direction. Returning from training
                  in fashion and fabric science in Italy, the second generation has refocused the
                  practice toward fewer projects, deeper craft, and individual pattern drafting at the
                  centre of every commission — alongside a widening mix of regional brands and creative
                  companies.
                </p>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-px mt-14" style={{ background: 'var(--rule)' }}>
              {pillars.map(({ title, body }, i) => (
                <Reveal key={title} delay={i * 0.07}>
                  <div style={{ background: 'var(--paper)', padding: '2rem 1.5rem 1.5rem', height: '100%' }}>
                    <p className="label label-strong" style={{ marginBottom: '0.875rem' }}>{title}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-70)', lineHeight: 1.7 }}>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-4 mt-14">
                <div className="img-frame" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src="/img/barber-work.jpg"
                    alt="Barber in a Popalzai-made uniform shirt and apron at work in the shop"
                    width={1600}
                    height={2844}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="img-frame" style={{ aspectRatio: '3 / 4' }}>
                  <img
                    src="/img/detail-apron.jpg"
                    alt="Detail of an apron's fitted tool pockets holding brushes and a comb"
                    width={1600}
                    height={2844}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
