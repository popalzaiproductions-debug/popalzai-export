/**
 * Garment blanks for the sample maker.
 *
 * Every blank is a technical flat drawn by Popalzai's own pattern room — the
 * same flats that go out on a tech pack. They are used as raster images rather
 * than traced to vector: tracing lost the collar ribbing, cuff stitching and
 * pocket edges every time, because on a tech pack those are short straight
 * segments indistinguishable from the leader lines running out to the labels.
 *
 * Each source sheet in `refs/` carries two or three views of one garment.
 * `tools/crop-views.ps1` separates them and writes each out 900px tall. Height
 * is the stable dimension — sleeve spread makes width vary enormously — so
 * `cmPerUnit` comes from a real body length, not a width, and is shared by
 * every view of a garment.
 *
 * All geometry below is in each IMAGE's own pixel space, which is also that
 * view's viewBox. `printArea` and `placements` are set by hand against the
 * render, then checked with `tools/check-print-areas.ps1`, which ray-casts
 * every corner against the image. Deriving them from ink extents does not
 * work: these are outlines on white, so a dark pixel says nothing about
 * whether you are on cloth, and a garment's own sleeves hang into the rows you
 * would want to measure the body at.
 */

export type Placement = {
  id: string
  label: string
  /** Top-left of the artwork box, in viewBox units. */
  x: number
  y: number
  /** Artwork width in viewBox units. */
  w: number
}

export type GarmentView = {
  id: string
  label: string
  viewBox: string
  /** The technical flat. Sized in the image's own pixels. */
  mockup: { src: string; w: number; h: number }
  /** Region artwork is expected to sit within; drawn as a dashed guide. */
  printArea: { x: number; y: number; w: number; h: number }
  placements: Placement[]
}

export type Garment = {
  id: string
  name: string
  category: string
  /**
   * Centimetres per viewBox unit. The garment's real body length over its ink
   * height in the image (900px less the 6px crop padding each side). Every
   * measurement the customer sees depends on this number, and all of them are
   * still estimates — they want replacing with pattern-room measurements.
   */
  cmPerUnit: number
  views: GarmentView[]
}

/** ink height in each 900px-tall crop: 900 less 6px padding top and bottom */
const INK = 888

export const garments: Garment[] = [
  {
    id: 'tee',
    name: 'T-Shirt',
    category: 'Tops',
    cmPerUnit: 72 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 1255 900',
        mockup: { src: '/mockups/tee-front.png', w: 1255, h: 900 },
        printArea: { x: 405, y: 200, w: 444, h: 430 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 737, y: 210, w: 111 },
          { id: 'right-chest', label: 'Right chest', x: 406, y: 210, w: 111 },
          { id: 'centre', label: 'Centre chest', x: 442, y: 230, w: 370 },
          { id: 'full', label: 'Full front', x: 405, y: 200, w: 444 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 1249 900',
        mockup: { src: '/mockups/tee-back.png', w: 1249, h: 900 },
        printArea: { x: 402, y: 200, w: 444, h: 430 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 550, y: 210, w: 148 },
          { id: 'centre-back', label: 'Centre back', x: 439, y: 280, w: 370 },
          { id: 'full-back', label: 'Full back', x: 402, y: 230, w: 444 },
        ],
      },
    ],
  },
  {
    id: 'tank',
    name: 'Tank Top',
    category: 'Tops',
    cmPerUnit: 72 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 609 900',
        mockup: { src: '/mockups/tank-front.png', w: 609, h: 900 },
        printArea: { x: 154, y: 250, w: 300, h: 380 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 339, y: 270, w: 111 },
          { id: 'right-chest', label: 'Right chest', x: 159, y: 270, w: 111 },
          { id: 'centre', label: 'Centre chest', x: 169, y: 290, w: 270 },
          { id: 'full', label: 'Full front', x: 154, y: 250, w: 300 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 608 900',
        mockup: { src: '/mockups/tank-back.png', w: 608, h: 900 },
        printArea: { x: 154, y: 250, w: 300, h: 380 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 230, y: 260, w: 148 },
          { id: 'centre-back', label: 'Centre back', x: 169, y: 300, w: 270 },
          { id: 'full-back', label: 'Full back', x: 154, y: 280, w: 300 },
        ],
      },
    ],
  },
  {
    id: 'longsleeve',
    name: 'Long Sleeve',
    category: 'Tops',
    cmPerUnit: 72 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 892 900',
        mockup: { src: '/mockups/longsleeve-front.png', w: 892, h: 900 },
        // Narrower than the ray-cast body: on a long sleeve the cuffs hang
        // alongside the hem, so the measured span is body plus both sleeves.
        printArea: { x: 261, y: 200, w: 370, h: 380 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 511, y: 230, w: 111 },
          { id: 'right-chest', label: 'Right chest', x: 271, y: 230, w: 111 },
          { id: 'centre', label: 'Centre chest', x: 296, y: 250, w: 300 },
          { id: 'full', label: 'Full front', x: 261, y: 200, w: 370 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 894 900',
        mockup: { src: '/mockups/longsleeve-back.png', w: 894, h: 900 },
        printArea: { x: 262, y: 200, w: 370, h: 380 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 373, y: 220, w: 148 },
          { id: 'centre-back', label: 'Centre back', x: 297, y: 280, w: 300 },
          { id: 'full-back', label: 'Full back', x: 262, y: 240, w: 370 },
        ],
      },
    ],
  },
  {
    id: 'polo',
    name: 'Polo Shirt',
    category: 'Tops',
    cmPerUnit: 74 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 698 900',
        mockup: { src: '/mockups/polo-front.png', w: 698, h: 900 },
        // The placket runs about a third of the way down, so nothing centred
        // sits above it.
        printArea: { x: 150, y: 280, w: 400, h: 430 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 389, y: 300, w: 108 },
          { id: 'right-chest', label: 'Right chest', x: 199, y: 300, w: 108 },
          { id: 'lower', label: 'Lower front', x: 148, y: 380, w: 400 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 698 900',
        mockup: { src: '/mockups/polo-back.png', w: 698, h: 900 },
        printArea: { x: 148, y: 280, w: 400, h: 430 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 276, y: 300, w: 144 },
          { id: 'centre-back', label: 'Centre back', x: 178, y: 380, w: 340 },
          { id: 'full-back', label: 'Full back', x: 148, y: 330, w: 400 },
        ],
      },
    ],
  },
  {
    id: 'shirt',
    name: 'Button Shirt',
    category: 'Tops',
    cmPerUnit: 80 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 885 900',
        mockup: { src: '/mockups/shirt-front.png', w: 885, h: 900 },
        printArea: { x: 242, y: 280, w: 400, h: 380 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 487, y: 300, w: 100 },
          { id: 'right-chest', label: 'Right chest', x: 297, y: 300, w: 100 },
          { id: 'lower', label: 'Lower front', x: 267, y: 400, w: 350 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 883 900',
        mockup: { src: '/mockups/shirt-back.png', w: 883, h: 900 },
        printArea: { x: 240, y: 280, w: 400, h: 380 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 374, y: 290, w: 133 },
          { id: 'centre-back', label: 'Centre back', x: 270, y: 380, w: 340 },
          { id: 'full-back', label: 'Full back', x: 240, y: 330, w: 400 },
        ],
      },
    ],
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    category: 'Tops',
    // 88 here made the sleeve span 169cm. This is a very wide drop-shoulder
    // cut — 1.9x as wide as it is tall — so the height has to come down for
    // the span to be a garment. Still an estimate.
    cmPerUnit: 80 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 1703 900',
        mockup: { src: '/mockups/hoodie-front.png', w: 1703, h: 900 },
        // Kept above the kangaroo pocket.
        printArea: { x: 650, y: 300, w: 400, h: 280 },
        placements: [
          { id: 'left-chest', label: 'Left chest', x: 900, y: 320, w: 100 },
          { id: 'right-chest', label: 'Right chest', x: 700, y: 320, w: 100 },
          { id: 'centre', label: 'Centre chest', x: 683, y: 340, w: 333 },
          { id: 'full', label: 'Full front', x: 650, y: 300, w: 400 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 1703 900',
        mockup: { src: '/mockups/hoodie-back.png', w: 1703, h: 900 },
        printArea: { x: 648, y: 300, w: 400, h: 280 },
        placements: [
          { id: 'upper-back', label: 'Upper back', x: 781, y: 310, w: 133 },
          { id: 'centre-back', label: 'Centre back', x: 681, y: 350, w: 333 },
          { id: 'full-back', label: 'Full back', x: 648, y: 320, w: 400 },
        ],
      },
    ],
  },
  {
    id: 'cap',
    name: 'Cap',
    category: 'Headwear',
    // Crown plus brim, front on — so the span is taller than the crown alone.
    cmPerUnit: 20 / INK,
    views: [
      {
        id: 'front',
        label: 'Front',
        viewBox: '0 0 1199 900',
        mockup: { src: '/mockups/cap-front.png', w: 1199, h: 900 },
        // A cap front is roughly 10cm across and 7cm tall of usable panel.
        // The guide has to be tall enough for a square at the placement width,
        // or the default artwork lands outside it the moment you pick a cap.
        printArea: { x: 376, y: 220, w: 444, h: 310 },
        placements: [
          { id: 'front-panel', label: 'Front panel', x: 465, y: 240, w: 266 },
          { id: 'small-front', label: 'Small front', x: 509, y: 260, w: 178 },
        ],
      },
      {
        id: 'side',
        label: 'Side',
        viewBox: '0 0 1935 900',
        mockup: { src: '/mockups/cap-side.png', w: 1935, h: 900 },
        // The brim sweeps out to the right of this view; the guide stays on
        // the crown's side panel.
        printArea: { x: 520, y: 250, w: 355, h: 266 },
        placements: [
          { id: 'side-panel', label: 'Side panel', x: 586, y: 270, w: 222 },
          { id: 'small-side', label: 'Small side', x: 631, y: 285, w: 133 },
        ],
      },
      {
        id: 'back',
        label: 'Back',
        viewBox: '0 0 1471 900',
        mockup: { src: '/mockups/cap-back.png', w: 1471, h: 900 },
        // Above the closure opening.
        printArea: { x: 601, y: 190, w: 266, h: 200 },
        placements: [
          { id: 'back-panel', label: 'Back panel', x: 645, y: 200, w: 178 },
          { id: 'small-back', label: 'Small back', x: 679, y: 210, w: 111 },
        ],
      },
    ],
  },
]

export const decorationMethods = [
  {
    id: 'print',
    label: 'Print',
    blurb: 'Screen or transfer print. Handles photographic detail, gradients and fine line work.',
    /** Beyond this the artwork is wider than a standard print platen. */
    maxWidthCm: 38,
  },
  {
    id: 'name',
    label: 'Name / text',
    blurb:
      'A name, role or line of text — printed, or embroidered where you want the stitched finish. Embroidery cannot hold photographic detail, so it is offered for text rather than artwork; for a stitched logo, send us the file and we will digitise it and come back with a stitch-out.',
    maxWidthCm: 30,
  },
] as const

export type MethodId = (typeof decorationMethods)[number]['id']

export const textFonts = [
  { id: 'mono',   label: 'Monospace', stack: "'IBM Plex Mono', ui-monospace, monospace" },
  { id: 'sans',   label: 'Sans',      stack: "'Inter', system-ui, sans-serif" },
  { id: 'serif',  label: 'Serif',     stack: "Georgia, 'Times New Roman', serif" },
  { id: 'script', label: 'Script',    stack: "'Segoe Script', 'Brush Script MT', cursive" },
]
