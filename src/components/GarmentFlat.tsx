import type { ReactNode } from 'react'
import type { GarmentView } from '../data/garments'

/**
 * Renders one view of a garment blank.
 *
 * The blanks are Popalzai's own technical flats (see `src/data/garments.ts`),
 * so there is nothing to draw — this places the image and gives the overlay a
 * coordinate space to sit in. `children` is the customer's artwork, the
 * selection chrome and the print-area guide, all authored in the same pixel
 * space as the image.
 */

type Props = {
  view: GarmentView
  /**
   * Image to draw instead of the view's own file — the recoloured flat from
   * src/lib/tint.ts. Same dimensions, so every coordinate still lines up.
   */
  href?: string
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
  view,
  href,
  children,
  className,
  style,
  svgRef,
  title,
  simple = false,
}: Props) {
  const m = view.mockup
  return (
    <svg
      ref={simple ? undefined : svgRef}
      viewBox={view.viewBox}
      className={className}
      style={style}
      {...(simple ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
    >
      <image href={href ?? m.src} x="0" y="0" width={m.w} height={m.h} preserveAspectRatio="xMidYMid meet" />
      {!simple && children}
    </svg>
  )
}
