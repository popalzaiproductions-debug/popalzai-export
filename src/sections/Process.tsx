import Reveal from '../components/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/SectionHead'
import NumberedList from '../components/NumberedList'
import { process } from '../data/site'
import { leadTag, type HeadingLevel } from '../components/Heading'

export default function Process({ level = 2 }: { level?: HeadingLevel }) {
  const H = leadTag(level)
  return (
    <Section tone="black">
      <SectionHead label="Process" meta={`${process.length} steps`} />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="sticky-col">
            <Reveal>
              <H className="h-section" style={{ marginBottom: '1.5rem' }}>
                Measurement to final press.
              </H>
              <p className="prose-body" style={{ fontSize: '0.9375rem', maxWidth: '32ch' }}>
                Built around operational reality. We work around service hours and keep disruption to
                daily trading close to zero.
              </p>
            </Reveal>
          </div>
        </div>

        <NumberedList
          items={process.map(step => ({
            num: step.num,
            title: step.title,
            body: (
              <>
                <p className="prose-body" style={{ fontSize: '0.9375rem', marginBottom: '1rem' }}>
                  {step.description}
                </p>
                <p className="label label-strong">{step.note}</p>
              </>
            ),
          }))}
        />
      </div>
    </Section>
  )
}
