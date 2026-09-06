import { useId, type ReactNode } from 'react'
import { colourways, type Garment, type ColourwayId } from '../data/garments'

/**
 * Renders a garment as a flat-vector technical sketch.
 *
 * Deliberately no blur filters and no imitation photography. An earlier version
 * stacked Gaussian blurs to fake fabric and it read as murky rather than drawn.
 * What sells a flat is construction detail and a clear line hierarchy:
 *
 *   outline  3.2   the silhouette
 *   panel    2.2   separate pieces — collar, cuff, pocket, hood, brim
 *   line     1.7   seams, hems, creases
 *   hatch    1.2   ribbing and elastic gathers
 *   stitch   1.3   dashed topstitching
 *
 * The only shading is a two-stop vertical gradient at roughly 6% variation,
 * enough to keep it from looking like clip art without pretending to be a photo.
 *
 * A licensed photographic mockup can replace all of this — see `Garment.mockup`.
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
  /** Picker thumbnails drop the fine detail, which is illegible at 48px anyway. */
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

  // A licensed photographic mockup replaces the vector flat entirely. Its
  // viewBox, printArea, placements and cmPerUnit are authored in the image's own
  // pixel space, so nothing here needs rescaling.
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

  const cloth = (
    <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={c.fill} />
      <stop offset="1" stopColor={c.fillLo} />
    </linearGradient>
  )

  if (simple) {
    return (
      <svg viewBox={g.viewBox} className={className} style={style} aria-hidden="true">
        <defs>{cloth}</defs>
        <g strokeLinejoin="round" strokeLinecap="round">
          {g.partsBehind?.map((d, i) => (
            <path key={`b${i}`} d={d} fill={c.panel} stroke={c.line} strokeWidth={5} />
          ))}
          <path d={g.body} fill={`url(#${grad})`} stroke={c.line} strokeWidth={6} />
          {g.parts?.map((d, i) => (
            <path key={i} d={d} fill={c.panel} stroke={c.line} strokeWidth={5} />
          ))}
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
      <defs>{cloth}</defs>

      <g strokeLinejoin="round" strokeLinecap="round">
        {/* pieces that fall behind the body */}
        {g.partsBehind?.map((d, i) => (
          <path key={`b${i}`} d={d} fill={c.panel} stroke={c.line} strokeWidth={2.4} />
        ))}

        {/* silhouette */}
        <path d={g.body} fill={`url(#${grad})`} stroke={c.line} strokeWidth={3.2} />

        {/* separate pieces, a shade off the body */}
        {g.parts?.map((d, i) => (
          <path key={`p${i}`} d={d} fill={c.panel} stroke={c.line} strokeWidth={2.2} />
        ))}

        {/* seams, hems, creases */}
        {g.lines?.map((d, i) => (
          <path key={`l${i}`} d={d} fill="none" stroke={c.detail} strokeWidth={1.7} />
        ))}

        {/* ribbing and gathers */}
        {g.hatch?.map((d, i) => (
          <path key={`h${i}`} d={d} fill="none" stroke={c.detail} strokeWidth={1.2} />
        ))}

        {/* topstitching */}
        {g.stitches?.map((d, i) => (
          <path
            key={`s${i}`} d={d} fill="none" stroke={c.stitch}
            strokeWidth={1.3} strokeDasharray="6 5"
          />
        ))}

        {/* buttons and eyelets */}
        {g.dots?.map((dot, i) => (
          <circle
            key={`d${i}`}
            cx={dot.cx} cy={dot.cy} r={dot.r}
            fill={dot.hollow ? 'none' : c.panel}
            stroke={c.detail}
            strokeWidth={1.6}
          />
        ))}
      </g>

      {children}
    </svg>
  )
}
