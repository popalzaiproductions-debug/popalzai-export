/**
 * Garment blanks for the sample maker.
 *
 * Every blank is a front-view technical flat drawn by Popalzai's own pattern
 * room — the same flats that go out on a tech pack. They are used as raster
 * images rather than traced to vector: tracing lost the collar ribbing, cuff
 * stitching and pocket edges every time, because on a tech pack those are
 * short straight segments indistinguishable from leader lines.
 *
 * The source sheets carry two or three views (front, back, sometimes side).
 * `tools/crop-fronts.ps1` isolates the front view and scales it to 900px tall.
 * Height is the stable dimension — sleeve spread makes overall width vary
 * enormously — so `cmPerUnit` comes from a real body length, not a width.
 *
 * All geometry below is in the IMAGE's own pixel space, which is also the
 * viewBox. `printArea` and `placements` are set by hand against the render:
 * deriving them from ink extents kept failing on garments whose sleeves hang
 * down to the hem, where a row of pixels reads as body when it is cuff.
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

export type Garment = {
  id: string
  name: string
  category: string
  viewBox: string
  /** The technical flat. Sized in the image's own pixels. */
  mockup: { src: string; w: number; h: number }
  /** Region artwork is expected to sit within; drawn as a dashed guide. */
  printArea: { x: number; y: number; w: number; h: number }
  /**
   * Centimetres per viewBox unit. Derived from the garment's real body length
   * over its ink height in the image (900px less the 6px crop padding each
   * side). Every measurement the customer sees depends on this number.
   */
  cmPerUnit: number
  placements: Placement[]
}

/** ink height in each 900px-tall crop: 900 less 6px padding top and bottom */
const INK = 888

export const garments: Garment[] = [
  {
    id: 'tee',
    name: 'T-Shirt',
    category: 'Tops',
    viewBox: '0 0 1251 900',
    mockup: { src: '/mockups/tee.png', w: 1251, h: 900 },
    printArea: { x: 403, y: 190, w: 444, h: 430 },
    cmPerUnit: 72 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 735, y: 210, w: 111 },
      { id: 'right-chest', label: 'Right chest', x: 404, y: 210, w: 111 },
      { id: 'centre', label: 'Centre chest', x: 440, y: 230, w: 370 },
      { id: 'full', label: 'Full front', x: 403, y: 190, w: 444 },
    ],
  },
  {
    id: 'tank',
    name: 'Tank Top',
    category: 'Tops',
    viewBox: '0 0 609 900',
    mockup: { src: '/mockups/tank.png', w: 609, h: 900 },
    printArea: { x: 150, y: 250, w: 310, h: 380 },
    cmPerUnit: 72 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 328, y: 270, w: 111 },
      { id: 'right-chest', label: 'Right chest', x: 170, y: 270, w: 111 },
      { id: 'centre', label: 'Centre chest', x: 170, y: 290, w: 270 },
      { id: 'full', label: 'Full front', x: 150, y: 250, w: 310 },
    ],
  },
  {
    id: 'longsleeve',
    name: 'Long Sleeve',
    category: 'Tops',
    viewBox: '0 0 892 900',
    mockup: { src: '/mockups/longsleeve.png', w: 892, h: 900 },
    printArea: { x: 290, y: 200, w: 310, h: 380 },
    cmPerUnit: 72 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 470, y: 230, w: 111 },
      { id: 'right-chest', label: 'Right chest', x: 311, y: 230, w: 111 },
      { id: 'centre', label: 'Centre chest', x: 310, y: 250, w: 270 },
      { id: 'full', label: 'Full front', x: 290, y: 200, w: 310 },
    ],
  },
  {
    id: 'polo',
    name: 'Polo Shirt',
    category: 'Tops',
    viewBox: '0 0 698 900',
    mockup: { src: '/mockups/polo.png', w: 698, h: 900 },
    // The placket runs about a third of the way down, so nothing centred sits
    // above it.
    printArea: { x: 150, y: 280, w: 400, h: 430 },
    cmPerUnit: 74 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 396, y: 300, w: 108 },
      { id: 'right-chest', label: 'Right chest', x: 193, y: 300, w: 108 },
      { id: 'lower', label: 'Lower front', x: 150, y: 380, w: 400 },
    ],
  },
  {
    id: 'shirt',
    name: 'Button Shirt',
    category: 'Tops',
    viewBox: '0 0 883 900',
    mockup: { src: '/mockups/shirt.png', w: 883, h: 900 },
    printArea: { x: 290, y: 280, w: 300, h: 380 },
    cmPerUnit: 80 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 467, y: 300, w: 100 },
      { id: 'right-chest', label: 'Right chest', x: 315, y: 300, w: 100 },
      { id: 'lower', label: 'Lower front', x: 300, y: 400, w: 280 },
    ],
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    category: 'Tops',
    viewBox: '0 0 1703 900',
    mockup: { src: '/mockups/hoodie.png', w: 1703, h: 900 },
    // Kept above the kangaroo pocket.
    printArea: { x: 650, y: 300, w: 400, h: 280 },
    // 88 here made the sleeve span 169cm. This is a very wide drop-shoulder
    // cut — 1.9x as wide as it is tall — so the height has to come down for
    // the span to be a garment. Still an estimate; needs a real measurement.
    cmPerUnit: 80 / INK,
    placements: [
      { id: 'left-chest', label: 'Left chest', x: 900, y: 320, w: 100 },
      { id: 'right-chest', label: 'Right chest', x: 700, y: 320, w: 100 },
      { id: 'centre', label: 'Centre chest', x: 683, y: 340, w: 333 },
      { id: 'full', label: 'Full front', x: 650, y: 300, w: 400 },
    ],
  },
  {
    id: 'cap',
    name: 'Cap',
    category: 'Headwear',
    viewBox: '0 0 1224 900',
    mockup: { src: '/mockups/cap.png', w: 1224, h: 900 },
    // Crown plus brim, front on — so the real span is taller than the crown.
    printArea: { x: 380, y: 140, w: 470, h: 270 },
    cmPerUnit: 20 / INK,
    placements: [
      { id: 'front', label: 'Front panel', x: 390, y: 160, w: 450 },
      { id: 'small', label: 'Small front', x: 490, y: 200, w: 250 },
    ],
  },
]


/**
 * Garment colourways. `panel` is unused by the extracted flats (they have no
 * separate filled pieces) but is kept for the swatch chips; `detail` is the
 * linework, which has to invert between dark and light cloth to stay legible.
 */
export const colourways = [
  { id: 'black', label: 'Black',
    fill: '#1b1c1f', fillLo: '#0e0f11', panel: '#26282c', line: '#000000',
    detail: 'rgba(255,255,255,0.38)', stitch: 'rgba(255,255,255,0.44)', ink: '#ffffff' },
  { id: 'white', label: 'White',
    fill: '#ffffff', fillLo: '#f0f0ee', panel: '#e8e8e5', line: '#2b2b29',
    detail: 'rgba(0,0,0,0.42)', stitch: 'rgba(0,0,0,0.40)', ink: '#111111' },
  { id: 'grey',  label: 'Grey',
    fill: '#a1a6ac', fillLo: '#8b9096', panel: '#8f949b', line: '#3a3d41',
    detail: 'rgba(0,0,0,0.40)', stitch: 'rgba(255,255,255,0.5)', ink: '#111111' },
  { id: 'navy',  label: 'Navy',
    fill: '#24334f', fillLo: '#162034', panel: '#2e3f62', line: '#0a0f1a',
    detail: 'rgba(255,255,255,0.34)', stitch: 'rgba(255,255,255,0.40)', ink: '#ffffff' },
  { id: 'sand',  label: 'Sand',
    fill: '#e7dac5', fillLo: '#d6c8b0', panel: '#dbcdb6', line: '#6f6350',
    detail: 'rgba(0,0,0,0.38)', stitch: 'rgba(0,0,0,0.34)', ink: '#1a1a1a' },
] as const

export type ColourwayId = (typeof colourways)[number]['id']

export const decorationMethods = [
  {
    id: 'print',
    label: 'Print',
    blurb: 'Screen or transfer print. Handles photographic detail, gradients and fine line work.',
    /** Beyond this the artwork is wider than a standard print platen. */
    maxWidthCm: 38,
  },
  {
    id: 'embroidery',
    label: 'Embroidery',
    blurb:
      'Stitched into the cloth. Durable and the usual choice for uniforms, but it cannot hold photographic detail — artwork reduces to solid shapes in a limited thread palette.',
    maxWidthCm: 28,
  },
  {
    id: 'name',
    label: 'Name / text',
    blurb: 'A name, role or line of text, stitched or printed. No artwork file needed.',
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
