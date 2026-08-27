import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { leadTag, type HeadingLevel } from '../components/Heading'
import {
  ONSITE_NAME,
  onSiteProvided,
  onSiteRequired,
  onSiteScope,
  onSiteSteps,
  onSiteFaqs,
} from '../data/site'

type Row = { term: string; value: string }

/** Two-column term list used for the "we provide / you provide" split. */
function TermList({ rows, dark = false }: { rows: Row[]; dark?: boolean }) {
  const rule = dark ? 'var(--rule-dark)' : 'var(--rule)'
  return (
    <dl style={{ margin: 0 }}>
      {rows.map((row, i) => (
        <div
          key={row.term}
          style={{
            borderTop: `1px solid ${rule}`,
            borderBottom: i === rows.length - 1 ? `1px solid ${rule}` : undefined,
            paddingBlock: '1.25rem',
          }}
        >
          <dt
            className="mono"
            style={{
              fontSize: '0.9375rem',
              letterSpacing: '-0.02em',
              marginBottom: '0.4rem',
              color: dark ? 'var(--paper)' : 'var(--black)',
            }}
          >
            {row.term}
          </dt>
          <dd
            style={{
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: dark ? 'var(--paper-45)' : 'var(--ink-70)',
              maxWidth: '46ch',
            }}
          >
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

type Props = { level?: HeadingLevel; preview?: boolean }

export default function OnSite({ level = 2, preview = false }: Props) {
  const H = leadTag(level)

  /* Homepage teaser — the headline, the split, and a link through. */
  if (preview) {
    return (
      <section
        className="on-black"
        style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '6.5rem' }}
      >
        <div className="container">
          <SectionHead label={ONSITE_NAME} meta="Subscription" />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <H style={{ fontSize: 'clamp(1.75rem, 3.6vw, 3rem)', color: 'var(--paper)', marginBottom: '1.75rem' }}>
                  Or put the tailor inside the building.
                </H>
                <p className="prose-body" style={{ marginBottom: '2.5rem' }}>
                  We bring master tailors into the UAE, sponsor them, equip them, and place them full
                  time inside your property. Uniforms made on site. Alterations done the same day.
                  You provide a room and accommodation — everything else is ours.
                </p>
                <Link to="/on-site" className="btn btn-invert">
                  How {ONSITE_NAME} works
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="label" style={{ marginBottom: '1rem' }}>Included every month</p>
                <ul style={{ listStyle: 'none' }}>
                  {onSiteProvided.map((row, i) => (
                    <li
                      key={row.term}
                      className="mono"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--paper-70)',
                        borderTop: '1px solid var(--rule-dark)',
                        borderBottom: i === onSiteProvided.length - 1 ? '1px solid var(--rule-dark)' : undefined,
                        paddingBlock: '0.875rem',
                      }}
                    >
                      {row.term}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* Full page */
  return (
    <>
      {/* Lead */}
      <section
        className="on-black"
        style={{ background: 'var(--black)', color: 'var(--paper)', paddingBlock: '6.5rem' }}
      >
        <div className="container">
          <SectionHead label={ONSITE_NAME} meta="Monthly subscription" />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Reveal>
                <H
                  style={{
                    fontSize: 'clamp(2.25rem, 6vw, 5rem)',
                    lineHeight: 0.98,
                    color: 'var(--paper)',
                    marginBottom: '2rem',
                  }}
                >
                  A master tailor,<br />on your floor.
                </H>
                <p className="prose-body" style={{ fontSize: '1.0625rem', maxWidth: '54ch' }}>
                  Sending uniforms out to be made and altered costs you time you do not have. So we
                  bring the tailor to you instead — recruited abroad, brought into the country,
                  sponsored, equipped, and working full time inside your property on a monthly
                  subscription.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="prose-body" style={{ fontSize: '0.9375rem' }}>
                  Built for hotels and hospitality groups carrying enough uniform volume — and enough
                  staff turnover — to keep a tailor busy.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The split: what we bring vs what you provide */}
      <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="The arrangement" meta="What sits where" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', marginBottom: '1.5rem' }}>
                  We provide
                </h2>
                <TermList rows={onSiteProvided} />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', marginBottom: '1.5rem' }}>
                  You provide
                </h2>
                <TermList rows={onSiteRequired} />
                <p
                  className="label"
                  style={{ marginTop: '1.5rem', display: 'block', lineHeight: 1.7 }}
                >
                  That is the whole ask.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Day-to-day scope */}
          <div className="mt-20">
            <Reveal>
              <p className="label" style={{ marginBottom: '1.5rem' }}>What the tailor does day to day</p>
              <ul className="grid sm:grid-cols-2 gap-px" style={{ background: 'var(--rule)', listStyle: 'none' }}>
                {onSiteScope.map((item) => (
                  <li
                    key={item}
                    style={{
                      background: 'var(--paper)',
                      padding: '1.5rem 1.25rem',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.875rem',
                      color: 'var(--ink-70)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it runs */}
      <section style={{ background: 'var(--paper-dim)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="Getting a tailor in" meta={`${onSiteSteps.length} steps`} />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 2.5rem)' }}>
                <Reveal>
                  <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', marginBottom: '1.5rem' }}>
                    From scope to installed.
                  </h2>
                  <p className="prose-body" style={{ fontSize: '0.9375rem', maxWidth: '32ch' }}>
                    You approve the tailor before anyone moves. Nothing is mobilised on your behalf
                    without sign-off.
                  </p>
                </Reveal>
              </div>
            </div>

            <ol className="lg:col-span-8" style={{ listStyle: 'none' }}>
              {onSiteSteps.map((step, i) => (
                <Reveal key={step.num} as="li" delay={0.04}>
                  <div
                    className="grid md:grid-cols-12 gap-4 md:gap-6 items-start"
                    style={{
                      borderTop: '1px solid var(--rule)',
                      paddingBlock: '2.5rem',
                      borderBottom: i === onSiteSteps.length - 1 ? '1px solid var(--rule)' : undefined,
                    }}
                  >
                    <div className="md:col-span-2">
                      <span className="label">{step.num}</span>
                    </div>
                    <div className="md:col-span-10" style={{ maxWidth: '58ch' }}>
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '0.875rem' }}>{step.title}</h3>
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

      {/* Pricing + questions */}
      <section style={{ background: 'var(--paper)', paddingBlock: '6.5rem' }}>
        <div className="container">
          <SectionHead label="Terms" meta="Priced per tailor" />

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', marginBottom: '1.25rem' }}>
                  One monthly figure.
                </h2>
                <p className="prose-body" style={{ fontSize: '0.9375rem', marginBottom: '2rem' }}>
                  The tailor, the visa, the machine and the materials allowance are a single
                  subscription, priced per tailor. The rate depends on the skill level the work needs
                  and the allowance you want, so we quote it per property rather than publish it.
                </p>
                <Link to="/inquiry" className="btn">
                  Request a quote
                  <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={0.1}>
                <dl style={{ margin: 0 }}>
                  {onSiteFaqs.map((faq, i) => (
                    <div
                      key={faq.q}
                      style={{
                        borderTop: '1px solid var(--rule)',
                        borderBottom: i === onSiteFaqs.length - 1 ? '1px solid var(--rule)' : undefined,
                        paddingBlock: '1.5rem',
                      }}
                    >
                      <dt
                        className="mono"
                        style={{ fontSize: '0.9375rem', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}
                      >
                        {faq.q}
                      </dt>
                      <dd className="prose-body" style={{ margin: 0, fontSize: '0.9375rem' }}>
                        {faq.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
