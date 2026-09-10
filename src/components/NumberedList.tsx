import type { ReactNode } from 'react'
import Reveal from './Reveal'

/**
 * The numbered-row list used by Process, On-Site and Produce: a counter in a
 * narrow column, the content in a wide one, hairlines between.
 *
 * Rules come from the `rule-top`/`rule-bottom` classes rather than an inline
 * border, so a list inside an `on-black` band picks up the lighter rule colour
 * on its own instead of each caller passing a flag down.
 */

export type NumberedItem = {
  num: string
  title: string
  body: ReactNode
}

export default function NumberedList({ items }: { items: NumberedItem[] }) {
  return (
    <ol className="lg:col-span-8" style={{ listStyle: 'none' }}>
      {items.map((item, i) => (
        <Reveal key={item.num} as="li" delay={0.04}>
          <div
            className={
              'grid md:grid-cols-12 gap-4 md:gap-6 items-start rule-top' +
              (i === items.length - 1 ? ' rule-bottom' : '')
            }
            style={{ paddingBlock: '2.5rem' }}
          >
            <div className="md:col-span-2">
              <span className="label">{item.num}</span>
            </div>
            <div className="md:col-span-10" style={{ maxWidth: '58ch' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.875rem' }}>{item.title}</h3>
              {item.body}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
