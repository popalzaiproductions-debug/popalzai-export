import type { ReactNode, CSSProperties } from 'react'

/**
 * A page band: full-bleed tone, standard vertical rhythm, contained children.
 *
 * Every section on the site was repeating the same three-part style object
 * plus its own `<div className="container">`. The three tones are the whole
 * palette — there is no fourth — so they are named rather than passed as
 * colours, which also keeps `on-black` and its paper text colour from being
 * set in one place and forgotten in another.
 */

export type Tone = 'paper' | 'dim' | 'black'

const TONE: Record<Tone, CSSProperties> = {
  paper: { background: 'var(--paper)' },
  dim:   { background: 'var(--paper-dim)' },
  black: { background: 'var(--black)', color: 'var(--paper)' },
}

type Props = {
  tone?: Tone
  /** Vertical padding. Defaults to the standard rhythm. */
  pad?: string
  /** Extra styles on the band itself, not the container. */
  style?: CSSProperties
  /** Extra classes on the band. `on-black` is added for you on the black tone. */
  className?: string
  children: ReactNode
}

export default function Section({
  tone = 'paper',
  pad = '6.5rem',
  style,
  className,
  children,
}: Props) {
  const classes = [tone === 'black' ? 'on-black' : '', className].filter(Boolean).join(' ')
  return (
    <section
      {...(classes ? { className: classes } : {})}
      style={{ ...TONE[tone], paddingBlock: pad, ...style }}
    >
      <div className="container">{children}</div>
    </section>
  )
}
