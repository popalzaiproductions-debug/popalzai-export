import type { ReactNode } from 'react'
import type { Garment, ColourwayId } from '../data/garments'

/**
 * Renders a garment blank for the sample maker.
 *
 * The blanks are Popalzai's own technical flats (see `src/data/garments.ts`),
 * so there is nothing to draw — this places the image and gives the overlay a
 * coordinate space to sit in. `children` is the customer's artwork, the
 * selection chrome and the print-area guide, all authored in the same pixel
 * space as the image.
 *
 * An earlier version traced these to vector and recoloured them. It kept
 * losing real construction detail, and recolouring a line drawing only ever
 * looked like a tinted line drawing.
 */

type Props = {
  garment: Garment
  /** Unused by the flat itself; kept so callers can stay uniform. */
  colourway?: ColourwayId
  /** Overlaid artwork, selection chrome, guides. */
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
  svgRef?: React.Ref<SVGSVGElement>
  title?: string
  /** Picker thumbnails: no overlay, and hidden from assistive tech. */
  simple?: boolean
}

export default function GarmentFlat({
  garment: g,
  children,
  className,
  style,
  svgRef,
  title,
  simple = false,
}: Props) {
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
