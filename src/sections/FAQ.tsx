import { useState, useId } from 'react'
import Reveal from '../components/Reveal'
import SectionHead from '../components/SectionHead'
import { faqs } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

export default function FAQ({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)
  const [open, setOpen] = useState<number | null>(0)
  const uid = useId()

  return (
    <section style={{ background: 'var(--paper-dim)', paddingBlock: '6.5rem' }}>
      <div className="container">
        <SectionHead label="FAQ" meta={`${faqs.length} questions`} />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <H style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)' }}>
                The things people ask first.
              </H>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            {faqs.map((faq, i) => {
              const isOpen = open === i
              const panelId = `${uid}-panel-${i}`
              const buttonId = `${uid}-button-${i}`

              return (
                <div
                  key={faq.q}
                  style={{
                    borderTop: '1px solid var(--rule)',
                    borderBottom: i === faqs.length - 1 ? '1px solid var(--rule)' : undefined,
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        padding: '1.5rem 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        font: 'inherit',
                        fontFamily: 'var(--mono)',
                        fontSize: '0.9375rem',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        color: 'var(--black)',
                      }}
                    >
                      {faq.q}
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          fontSize: '1.125rem',
                          lineHeight: 1,
                          color: 'var(--ink-45)',
                          transition: 'transform 0.25s ease',
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                        }}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows 0fr → 1fr animates to the content's real height,
                      so long answers are never clipped the way a max-height cap clips them */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    style={{
                      display: 'grid',
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.32s cubic-bezier(0.22,0.61,0.36,1)',
                    }}
                  >
                    <div style={{ overflow: 'hidden' }}>
                      <p
                        className="prose-body"
                        style={{ fontSize: '0.9375rem', paddingBottom: '1.75rem', maxWidth: '64ch' }}
                        // keep it out of the a11y tree and tab order while collapsed
                        {...(!isOpen ? { 'aria-hidden': true } : {})}
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
