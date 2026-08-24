import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { stats } from '../data/site'

export default function Manifesto() {
  return (
    <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="Why proportions matter" meta="01 / Position" />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.6vw, 3rem)', marginBottom: '2rem' }}>
                Most people are wearing a size that was never measured.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="prose-body" style={{ marginBottom: '1.25rem' }}>
                Standard sizing is a manufacturing convenience, not a fitting method. A size chart is
                graded from a single fit model and then stretched across thousands of bodies that
                share none of that model's posture, proportion, or range of movement.
              </p>
              <p className="prose-body">
                We draft a pattern from twenty-six measurements taken off the individual wearing the
                garment. Nothing is graded. Nothing is approximated. The pattern is then archived, so
                the next garment — a replacement, a second colourway, a new hire two years from now —
                comes off the same block.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="img-frame img-threshold" style={{ aspectRatio: '4 / 5' }}>
                <img
                  src="/img/detail-tools.jpg"
                  alt="Barber's apron with shears, combs and brushes in fitted tool pockets"
                  width={1600}
                  height={2844}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="label" style={{ marginTop: '0.875rem' }}>
                Tool-pocket apron · No Cap Barbershop
              </p>
            </Reveal>
          </div>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          style={{ borderTop: '1px solid var(--rule)', paddingTop: '2.5rem' }}
        >
          {stats.map(({ value, label }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <p className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1 }}>
                {value}
              </p>
              <p className="label" style={{ marginTop: '0.625rem' }}>{label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
