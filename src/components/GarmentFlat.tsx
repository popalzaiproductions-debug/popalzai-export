import { useId, type ReactNode } from 'react'
import type { Garment } from '../data/garments'
import { colourways, type ColourwayId } from '../data/garments'

/**
 * Renders a garment as shaded cloth rather than a filled outline.
 *
 * The realism comes from stacking cheap effects inside a clip of the garment
 * silhouette:
 *   1. a horizontal ramp (dark edge → lit centre) that reads as a torso turning
 *      away from the light
 *   2. a vertical ramp for top lighting falling off toward the hem
 *   3. blurred fold "ridges" — each crease drawn twice, dark then light and
 *      offset, which is what makes fabric look like fabric
 *   4. a thick blurred stroke of the silhouette, clipped, giving an inner
 *      shadow that rounds the edges
 *   5. a soft cast shadow beneath the whole thing
 *
 * Everything is vector, so it stays a few hundred bytes and scales cleanly.
 * A licensed photographic mockup can replace it — see `Garment.mockup`.
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
  /** Small picker thumbnails skip the expensive filters. */
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

  // Light cloth needs far gentler shading — the same opacities that read as
  // folds on black read as dirt on white.
  const light = colourway === 'white' || colourway === 'sand'
  const sh = {
    crease:  light ? 0.09 : 0.42,
    sheen:   light ? 0.70 : 0.13,
    fold:    light ? 0.04 : 0.22,
    edge:    light ? 0.22 : 0.55,
    seam:    light ? 0.16 : 0.45,
    topLite: light ? 0.60 : 0.16,
    hemDark: light ? 0.10 : 0.30,
    cast:    light ? 0.14 : 0.20,
  }

  const clip = `clip-${uid}`
  const ramp = `ramp-${uid}`
  const vert = `vert-${uid}`
  const soft = `soft-${uid}`
  const softer = `softer-${uid}`
  const drop = `drop-${uid}`

  const allShapes = [g.body, ...(g.parts ?? [])]

  if (simple) {
    return (
      <svg viewBox={g.viewBox} className={className} style={style} aria-hidden="true">
        <defs>
          <linearGradient id={ramp} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={c.edge} />
            <stop offset="0.5" stopColor={c.lit} />
            <stop offset="1" stopColor={c.edge} />
          </linearGradient>
        </defs>
        <g stroke={c.line} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
          <path d={g.body} fill={`url(#${ramp})`} />
          {g.parts?.map((d, i) => <path key={i} d={d} fill={c.mid} />)}
        </g>
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
      <defs>
        <clipPath id={clip}>
          {allShapes.map((d, i) => <path key={i} d={d} />)}
        </clipPath>

        {/* torso turning away from the light */}
        <linearGradient id={ramp} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c.edge} />
          <stop offset="0.18" stopColor={c.mid} />
          <stop offset="0.44" stopColor={c.lit} />
          <stop offset="0.62" stopColor={c.mid} />
          <stop offset="1" stopColor={c.edge} />
        </linearGradient>

        {/* top lighting falling off toward the hem */}
        <linearGradient id={vert} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity={sh.topLite} />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="1" stopColor="#000000" stopOpacity={sh.hemDark} />
        </linearGradient>

        <filter id={soft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={softer} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id={drop} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* cast shadow on the surface behind */}
      <g filter={`url(#${drop})`} opacity={sh.cast}>
        <path d={g.body} fill="#000" transform="translate(10 16)" />
      </g>

      {/* cloth */}
      <g clipPath={`url(#${clip})`}>
        <path d={g.body} fill={`url(#${ramp})`} />
        {g.parts?.map((d, i) => <path key={`p${i}`} d={d} fill={`url(#${ramp})`} />)}

        {/* creases: a dark ridge with a light edge just above it */}
        {g.wrinkles?.map((d, i) => (
          <g key={`w${i}`}>
            <path
              d={d} fill="none" stroke="#000" strokeOpacity={sh.crease}
              strokeWidth={light ? 6 : 11} strokeLinecap="round" filter={`url(#${soft})`}
            />
            <path
              d={d} fill="none" stroke="#fff" strokeOpacity={sh.sheen}
              strokeWidth={7} strokeLinecap="round" filter={`url(#${soft})`}
              transform="translate(-7 -7)"
            />
          </g>
        ))}

        {g.folds?.map((d, i) => (
          <path
            key={`f${i}`} d={d} fill="none" stroke="#000" strokeOpacity={sh.fold}
            strokeWidth={light ? 8 : 14} strokeLinecap="round" filter={`url(#${softer})`}
          />
        ))}

        {/* top-to-hem lighting */}
        <path d={g.body} fill={`url(#${vert})`} />
        {g.parts?.map((d, i) => <path key={`pv${i}`} d={d} fill={`url(#${vert})`} />)}

        {/* inner shadow: a fat blurred outline, clipped, rounds the edges */}
        {allShapes.map((d, i) => (
          <path
            key={`e${i}`} d={d} fill="none" stroke="#000" strokeOpacity={sh.edge}
            strokeWidth={26} filter={`url(#${softer})`}
          />
        ))}

        {/* seam-line shading for applied panels (pocket, hood, brim) */}
        {g.parts?.map((d, i) => (
          <path
            key={`ps${i}`} d={d} fill="none" stroke="#000" strokeOpacity={sh.seam}
            strokeWidth={9} filter={`url(#${soft})`}
          />
        ))}
      </g>

      {/* crisp silhouette + construction lines */}
      <g fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d={g.body} stroke={c.line} strokeWidth={2.5} />
        {g.parts?.map((d, i) => <path key={`po${i}`} d={d} stroke={c.line} strokeWidth={2} />)}
        {g.seams?.map((d, i) => (
          <path key={`s${i}`} d={d} stroke={c.ink} strokeOpacity={0.22} strokeWidth={2} />
        ))}
        {g.stitches?.map((d, i) => (
          <path
            key={`t${i}`} d={d} stroke={c.ink} strokeOpacity={0.3}
            strokeWidth={1.8} strokeDasharray="7 6"
          />
        ))}
      </g>

      {children}
    </svg>
  )
}
