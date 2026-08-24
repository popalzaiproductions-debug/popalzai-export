import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { clients } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

type Shot = {
  src: string
  alt: string
  w: number
  h: number
  /** Aspect the frame is cropped to. */
  ratio: string
  /** Extra grid classes — the span has to sit on the grid item, not the frame. */
  span?: string
  caption: string
}

const gallery: Shot[] = [
  { src: '/img/field-wide.jpg',       w: 2000, h: 1125, ratio: '16 / 9', span: 'sm:col-span-2', caption: '8 Studios — lookbook, night pitch',  alt: 'Figure in an 8 Studios uniform standing in a football goal under floodlights' },
  { src: '/img/tee-black-box.jpg',    w: 1400, h: 788,  ratio: '16 / 9', caption: '8 Studios — box logo tee',          alt: 'Black oversized tee with a white box logo, laid flat on concrete' },
  { src: '/img/field-front.jpg',      w: 1600, h: 2844, ratio: '3 / 4',  caption: '8 Studios — full look',             alt: 'Full-length view of a white tee and wide black trousers on a floodlit pitch' },
  { src: '/img/tote-8.jpg',           w: 1400, h: 788,  ratio: '16 / 9', caption: '8 Studios — canvas tote',           alt: 'Natural canvas tote bag with a black box logo, laid flat on concrete' },
  { src: '/img/tee-white-8ball.jpg',  w: 1400, h: 788,  ratio: '16 / 9', caption: '8 Studios — eight-ball tee',        alt: 'White tee with a black eight-ball graphic at the chest, laid flat on concrete' },
  { src: '/img/barber-chair.jpg',     w: 1600, h: 2844, ratio: '3 / 4',  caption: 'No Cap — floor uniform in service', alt: 'Barber in a white uniform shirt and dark apron working at the chair' },
  { src: '/img/tank-black.jpg',       w: 1400, h: 788,  ratio: '16 / 9', caption: '8 Studios — ribbed tank',           alt: 'Black ribbed tank top laid flat on concrete' },
  { src: '/img/tote-studios.jpg',     w: 1400, h: 788,  ratio: '16 / 9', caption: '8 Studios — printed tote',          alt: 'Natural canvas tote with a printed STUDIOS. label, laid flat on concrete' },
  { src: '/img/field-back.jpg',       w: 1600, h: 900,  ratio: '16 / 9', caption: '8 Studios — reverse print',         alt: 'Back view of a black tee showing a large white box logo across the shoulders' },
]

type Props = { preview?: boolean; level?: HeadingLevel }

export default function Work({ preview = false, level = 2 }: Props) {
  const H = leadTag(level)
  const shots = preview ? gallery.slice(0, 5) : gallery

  return (
    <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="Work" meta="Selected 2025 — 2026" />

        <div className="grid lg:grid-cols-12 gap-8 mb-14">
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
                Recent production for barbershops, concept stores, and independent labels across the
                Emirates.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Gallery — `align-items: start` lets each card keep its own aspect
            instead of being stretched to the tallest cell in its row. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-start">
          {shots.map((shot, i) => (
            <Reveal key={shot.src} delay={(i % 3) * 0.06} className={shot.span}>
              <figure style={{ margin: 0 }}>
                <div className="img-frame" style={{ aspectRatio: shot.ratio, width: '100%' }}>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.w}
                    height={shot.h}
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <figcaption className="label" style={{ marginTop: '0.75rem' }}>{shot.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {preview && (
          <Reveal delay={0.1}>
            <div className="mt-12">
              <Link to="/work" className="link-underline">See the full archive →</Link>
            </div>
          </Reveal>
        )}

        {/* Client index */}
        <div className="mt-24">
          <SectionHead label="Current clients" meta={`${clients.length} active`} />
          <ol style={{ listStyle: 'none' }}>
            {clients.map((c, i) => (
              <Reveal key={c.name} as="li" delay={0.03}>
                <div
                  className="grid grid-cols-12 gap-4 items-baseline"
                  style={{
                    borderTop: '1px solid var(--rule)',
                    paddingBlock: '1.5rem',
                    borderBottom: i === clients.length - 1 ? '1px solid var(--rule)' : undefined,
                  }}
                >
                  <span className="label col-span-2 sm:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <p className="col-span-10 sm:col-span-5" style={{ fontFamily: 'var(--mono)', fontSize: '1rem', letterSpacing: '-0.02em' }}>
                    {c.name}
                  </p>
                  <p className="label col-start-3 col-span-10 sm:col-start-7 sm:col-span-6">
                    {c.sector} · UAE
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
