import { useId, type ReactNode } from 'react'
import { colourways, type Garment, type ColourwayId } from '../data/garments'

/**
 * Renders a garment flat extracted from a tech pack.
 *
 * The geometry is real — see `src/data/garments.ts` — so this only has to
 * colour it in: fill the silhouette with the colourway, stroke the detail on
 * top, and add a light vertical gradient so it doesn't read as a paper cut-out.
 *
 * No blur filters. An earlier version faked fabric with stacked Gaussian blurs
 * and the result was murky rather than drawn.
 */

type Props = {
  garment: Garment
  colourway: ColourwayId
  /** Overlaid artwork, selection chrome, guides. */
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  svgRef?: React.Ref<SVGSVGElement>
  title?: string
  /** Picker thumbnails: silhouette only — the detail is illegible at 48px. */
  simple?: boolean
}

export default function GarmentFlat({
  garment: g,
  colourway,
  children,
  className,
  style,
  svgRef,
  title,
  simple = false,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const c = colourways.find(x => x.id === colourway) ?? colourways[0]
  const grad = `cloth-${uid}`
  const round = `round-${uid}`

  // A licensed photographic mockup replaces the vector flat entirely. Its
  // geometry is authored in the image's own pixel space, so nothing rescales.
  if (g.mockup) {
    const m = g.mockup
    return (
      <svg
        ref={simple ? undefined : svgRef}
        viewBox={g.viewBox}
        className={className}
        style={style}
        {...(simple ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
      >
        <image href={m.src} x="0" y="0" width={m.w} height={m.h} preserveAspectRatio="xMidYMid meet" />
        {!simple && children}
      </svg>
    )
  }

  // One path made of every CLOSED subpath, used only for the fill. Open paths
  // (hem lines, topstitching, creases) get implicitly closed when filled, which
  // throws stray triangles across the garment — so they are excluded.
  // Outline pieces, each force-closed so open strokes still fill.
  const fillD = g.fill
    .map(d => (d.trimEnd().endsWith('Z') ? d : d + 'Z'))
    .join(' ')

  const defs = (
    <>
      <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={c.fill} />
        <stop offset="1" stopColor={c.fillLo} />
      </linearGradient>
      {/* a hint of roundness across the body; deliberately subtle */}
      <linearGradient id={round} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.16" />
        <stop offset="0.30" stopColor="#000" stopOpacity="0.02" />
        <stop offset="0.48" stopColor="#fff" stopOpacity="0.05" />
        <stop offset="0.72" stopColor="#000" stopOpacity="0.03" />
        <stop offset="1" stopColor="#000" stopOpacity="0.16" />
      </linearGradient>
    </>
  )

  if (simple) {
    return (
      <svg viewBox={g.viewBox} className={className} style={style} aria-hidden="true">
        <defs>{defs}</defs>
        <path d={fillD} fill={`url(#${grad})`} stroke="none" fillRule="nonzero" />
        <path d={g.silhouette} fill="none" stroke={c.line} strokeWidth={9} strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg
      ref={svgRef}
      viewBox={g.viewBox}
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      <defs>{defs}</defs>

      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Fill the union of every subpath. These tech-pack outlines are not one
            closed path — a jeans leg, a shirt front and a sleeve are separate
            strokes — so filling a single "silhouette" leaves holes. Concatenated
            under nonzero they resolve to the solid garment. */}
        <path d={fillD} fill={`url(#${grad})`} stroke="none" fillRule="nonzero" />
        <path d={fillD} fill={`url(#${round})`} stroke="none" fillRule="nonzero" />
        <path d={g.silhouette} fill="none" stroke={c.line} strokeWidth={3} />
        {g.detail.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={c.detail} strokeWidth={1.8} />
        ))}
      </g>

      {children}
    </svg>
  )
}
