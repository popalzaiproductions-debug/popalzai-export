/**
 * Garment blanks for the sample maker.
 *
 * Technical flats — the drawing convention apparel factories work from.
 * Vector rather than photography: they scale cleanly, cost a few hundred bytes
 * each, and sit inside the site's black-and-white system.
 *
 * PROPORTIONS ARE DERIVED FROM REAL MEASUREMENTS, not eyeballed. Each drawing
 * is laid out at 7 viewBox units per centimetre against a size-M spec, e.g. the
 * tee is 52 cm chest (364 units) by 72 cm length (~504 units). Getting this
 * wrong is what makes a flat read as a nightshirt instead of a t-shirt.
 *
 * Layers, drawn in this order:
 *   body     one closed silhouette, filled with the cloth gradient and stroked
 *   parts    additional closed shapes over the body (pockets, hoods, brims)
 *   seams    thin solid construction lines (hems, waistbands, plackets)
 *   stitches dashed topstitching
 *   folds    very light lines suggesting drape
 *
 * `cmPerUnit` converts viewBox units back to centimetres so the tool can report
 * a physical artwork width — the number production actually needs.
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
  body: string
  parts?: string[]
  seams?: string[]
  stitches?: string[]
  folds?: string[]
  /** Soft creases, rendered as blurred ridges to give the cloth depth. */
  wrinkles?: string[]
  /**
   * Optional licensed photographic mockup. Stock mockups are copyrighted, so
   * none ship with the repo — buy a pack, drop the file in /public/mockups,
   * and point this at it. When set it replaces the vector flat, and printArea
   * is interpreted against the image's own pixel dimensions.
   */
  mockup?: { src: string; w: number; h: number }
  /** Region artwork is expected to sit within; drawn as a dashed guide. */
  printArea: { x: number; y: number; w: number; h: number }
  cmPerUnit: number
  placements: Placement[]
}

export const garments: Garment[] = [
  {
    // 52 cm chest × 72 cm length. Body 98–462, sleeves set in at the shoulder.
    id: 'tee',
    name: 'T-Shirt',
    category: 'Tops',
    viewBox: '0 0 560 600',
    body:
      'M217 44 C190 46 150 52 119 62 C86 88 46 120 18 150 ' +
      'C36 186 60 214 86 230 C92 220 96 208 98 196 ' +
      'C100 300 102 430 104 544 C160 552 400 552 456 544 ' +
      'C458 430 460 300 462 196 C464 208 468 220 474 230 ' +
      'C500 214 524 186 542 150 C514 120 474 88 441 62 ' +
      'C410 52 370 46 343 44 C338 68 312 84 280 84 C248 84 222 68 217 44 Z',
    seams: [
      'M226 48 C232 72 254 90 280 90 C306 90 328 72 334 48',
      'M106 522 C160 530 400 530 454 522',
      'M26 158 C44 192 66 218 92 234',
      'M534 158 C516 192 494 218 468 234',
    ],
    stitches: [
      'M108 512 C160 520 400 520 452 512',
      'M32 152 C50 186 72 212 98 228',
      'M528 152 C510 186 488 212 462 228',
    ],
    folds: ['M170 220 C176 320 174 430 170 512', 'M390 220 C384 320 386 430 390 512'],
    wrinkles: [
      'M150 130 C168 150 178 176 176 208',
      'M410 130 C392 150 382 176 384 208',
      'M132 250 C158 268 176 300 180 344',
      'M428 250 C402 268 384 300 380 344',
      'M206 400 C232 428 250 470 254 516',
      'M354 400 C328 428 310 470 306 516',
      'M118 400 C140 440 150 480 150 520',
      'M442 400 C420 440 410 480 410 520',
    ],
    printArea: { x: 140, y: 150, w: 280, h: 260 },
    cmPerUnit: 52 / 364,
    placements: [
      { id: 'left-chest',  label: 'Left chest',   x: 310, y: 176, w: 80 },
      { id: 'right-chest', label: 'Right chest',  x: 170, y: 176, w: 80 },
      { id: 'centre',      label: 'Centre chest', x: 200, y: 200, w: 160 },
      { id: 'full',        label: 'Full front',   x: 140, y: 170, w: 280 },
    ],
  },

  {
    // 46 cm chest. Narrow straps, scooped armholes.
    id: 'tank',
    name: 'Tank Top',
    category: 'Tops',
    viewBox: '0 0 560 600',
    body:
      'M232 44 C220 45 208 47 200 50 C204 110 186 170 152 214 ' +
      'C140 262 128 400 120 540 C176 548 384 548 440 540 ' +
      'C432 400 420 262 408 214 C374 170 356 110 360 50 ' +
      'C352 47 340 45 328 44 C322 72 304 88 280 88 C256 88 238 72 232 44 Z',
    seams: [
      'M240 48 C246 74 262 92 280 92 C298 92 314 74 320 48',
      'M122 520 C176 528 384 528 438 520',
      'M208 58 C212 112 196 168 164 208',
      'M352 58 C348 112 364 168 396 208',
    ],
    stitches: ['M124 510 C176 518 384 518 436 510'],
    folds: ['M186 280 C190 370 188 450 185 510', 'M374 280 C370 370 372 450 375 510'],
    wrinkles: [
      'M164 220 C182 254 190 300 188 348',
      'M396 220 C378 254 370 300 372 348',
      'M212 400 C236 434 250 474 252 514',
      'M348 400 C324 434 310 474 308 514',
    ],
    printArea: { x: 156, y: 150, w: 248, h: 260 },
    cmPerUnit: 46 / 320,
    placements: [
      { id: 'left-chest', label: 'Left chest',   x: 300, y: 180, w: 74 },
      { id: 'centre',     label: 'Centre chest', x: 208, y: 200, w: 144 },
      { id: 'full',       label: 'Full front',   x: 156, y: 176, w: 248 },
    ],
  },

  {
    // Tee body with sleeves run out to the wrist.
    id: 'longsleeve',
    name: 'Long Sleeve',
    category: 'Tops',
    viewBox: '0 0 560 600',
    body:
      'M217 44 C190 46 150 52 119 62 C88 120 44 250 10 360 ' +
      'C26 382 48 394 74 398 C84 330 92 252 98 200 ' +
      'C100 300 102 430 104 544 C160 552 400 552 456 544 ' +
      'C458 430 460 300 462 200 C468 252 476 330 486 398 ' +
      'C512 394 534 382 550 360 C516 250 472 120 441 62 ' +
      'C410 52 370 46 343 44 C338 68 312 84 280 84 C248 84 222 68 217 44 Z',
    seams: [
      'M226 48 C232 72 254 90 280 90 C306 90 328 72 334 48',
      'M106 522 C160 530 400 530 454 522',
      'M16 344 C32 366 54 378 80 382',
      'M544 344 C528 366 506 378 480 382',
    ],
    stitches: ['M108 512 C160 520 400 520 452 512'],
    folds: ['M170 220 C176 320 174 430 170 512', 'M390 220 C384 320 386 430 390 512'],
    wrinkles: [
      'M150 130 C168 150 178 176 176 208',
      'M410 130 C392 150 382 176 384 208',
      'M56 230 C78 254 90 292 92 330',
      'M504 230 C482 254 470 292 468 330',
      'M206 400 C232 428 250 470 254 516',
      'M354 400 C328 428 310 470 306 516',
    ],
    printArea: { x: 140, y: 150, w: 280, h: 260 },
    cmPerUnit: 52 / 364,
    placements: [
      { id: 'left-chest', label: 'Left chest',   x: 310, y: 176, w: 80 },
      { id: 'centre',     label: 'Centre chest', x: 200, y: 200, w: 160 },
      { id: 'full',       label: 'Full front',   x: 140, y: 170, w: 280 },
      { id: 'sleeve',     label: 'Sleeve',       x: 44,  y: 268, w: 56 },
    ],
  },

  {
    // 56 cm chest — cut fuller than the tee. Hood, kangaroo pocket, ribbed hem.
    id: 'hoodie',
    name: 'Hoodie',
    category: 'Tops',
    viewBox: '0 0 560 620',
    body:
      'M214 66 C186 70 146 78 112 92 C78 178 46 314 26 430 ' +
      'C42 446 62 456 84 458 C90 360 94 258 96 190 ' +
      'C90 300 86 440 84 566 C146 574 414 574 476 566 ' +
      'C474 440 470 300 464 190 C466 258 470 360 476 458 ' +
      'C498 456 518 446 534 430 C514 314 482 178 448 92 ' +
      'C414 78 374 70 346 66 C336 90 312 102 280 102 C248 102 224 90 214 66 Z',
    parts: [
      'M196 96 C172 12 388 12 364 96 C330 122 306 132 280 132 C254 132 230 122 196 96 Z',
      'M156 396 C156 388 404 388 404 396 L410 496 C410 504 150 504 150 496 Z',
    ],
    seams: [
      'M86 534 C146 542 414 542 474 534',
      'M30 414 C46 430 66 440 88 442',
      'M530 414 C514 430 494 440 472 442',
      'M212 100 C238 122 260 132 280 132 C300 132 322 122 348 100',
      'M280 132 L280 168',
    ],
    stitches: ['M88 524 C146 532 414 532 472 524', 'M162 402 C162 394 398 394 398 402'],
    folds: ['M170 250 C176 330 174 430 170 524', 'M390 250 C384 330 386 430 390 524'],
    wrinkles: [
      'M146 170 C168 192 180 224 178 258',
      'M414 170 C392 192 380 224 382 258',
      'M64 268 C88 296 102 336 104 376',
      'M496 268 C472 296 458 336 456 376',
      'M200 240 C214 288 218 340 214 384',
      'M360 240 C346 288 342 340 346 384',
    ],
    printArea: { x: 150, y: 170, w: 260, h: 210 },
    cmPerUnit: 56 / 392,
    placements: [
      { id: 'left-chest', label: 'Left chest',   x: 306, y: 196, w: 76 },
      { id: 'centre',     label: 'Centre chest', x: 208, y: 216, w: 144 },
      { id: 'full',       label: 'Full front',   x: 150, y: 186, w: 260 },
    ],
  },

  {
    // Tee block with a rib collar and a two-button placket.
    id: 'polo',
    name: 'Polo Shirt',
    category: 'Tops',
    viewBox: '0 0 560 600',
    body:
      'M222 46 C194 48 152 54 119 62 C86 88 46 120 18 150 ' +
      'C36 186 60 214 86 230 C92 220 96 208 98 196 ' +
      'C100 300 102 430 104 544 C160 552 400 552 456 544 ' +
      'C458 430 460 300 462 196 C464 208 468 220 474 230 ' +
      'C500 214 524 186 542 150 C514 120 474 88 441 62 ' +
      'C408 54 366 48 338 46 C330 66 308 80 280 86 C252 80 230 66 222 46 Z',
    parts: [
      'M218 46 C226 86 244 116 264 132 L280 96 L246 52 Z',
      'M342 46 C334 86 316 116 296 132 L280 96 L314 52 Z',
    ],
    seams: [
      'M260 106 L260 226',
      'M300 106 L300 226',
      'M106 522 C160 530 400 530 454 522',
      'M26 158 C44 192 66 218 92 234',
      'M534 158 C516 192 494 218 468 234',
    ],
    stitches: ['M108 512 C160 520 400 520 452 512'],
    folds: ['M170 250 C176 330 174 430 170 512', 'M390 250 C384 330 386 430 390 512'],
    wrinkles: [
      'M150 140 C168 160 178 186 176 218',
      'M410 140 C392 160 382 186 384 218',
      'M132 260 C158 278 176 310 180 354',
      'M428 260 C402 278 384 310 380 354',
      'M206 410 C232 438 250 476 254 516',
      'M354 410 C328 438 310 476 306 516',
    ],
    printArea: { x: 140, y: 240, w: 280, h: 190 },
    cmPerUnit: 52 / 364,
    placements: [
      { id: 'left-chest', label: 'Left chest',   x: 316, y: 236, w: 76 },
      { id: 'centre',     label: 'Centre chest', x: 210, y: 270, w: 140 },
    ],
  },

  {
    // 40 cm flat waist, 102 cm outseam.
    id: 'trousers',
    name: 'Trousers',
    category: 'Bottoms',
    viewBox: '0 0 560 800',
    body:
      'M140 40 C200 34 360 34 420 40 C430 120 440 200 442 280 ' +
      'C444 440 440 620 436 760 C400 766 330 766 294 760 ' +
      'C292 620 288 460 280 330 C272 460 268 620 266 760 ' +
      'C230 766 160 766 124 760 C120 620 116 440 118 280 ' +
      'C120 200 130 120 140 40 Z',
    seams: [
      'M136 96 C200 90 360 90 424 96',
      'M280 96 C286 130 286 164 280 200',
      'M154 108 C176 136 202 152 228 158',
      'M406 108 C384 136 358 152 332 158',
      'M126 730 C160 736 232 736 266 730',
      'M294 730 C328 736 400 736 434 730',
    ],
    stitches: ['M136 86 C200 80 360 80 424 86', 'M274 200 C277 250 279 292 280 322'],
    folds: ['M196 220 C192 400 190 600 189 730', 'M364 220 C368 400 370 600 371 730'],
    wrinkles: [
      'M158 260 C182 292 196 340 198 400',
      'M402 260 C378 292 364 340 362 400',
      'M150 480 C178 512 194 566 196 620',
      'M410 480 C382 512 366 566 364 620',
      'M144 640 C170 672 184 710 186 744',
      'M416 640 C390 672 376 710 374 744',
    ],
    printArea: { x: 150, y: 190, w: 110, h: 220 },
    cmPerUnit: 40 / 280,
    placements: [
      { id: 'thigh',    label: 'Thigh',     x: 160, y: 230, w: 88 },
      { id: 'hip',      label: 'Hip',       x: 156, y: 140, w: 70 },
      { id: 'abovehem', label: 'Above hem', x: 160, y: 640, w: 70 },
    ],
  },

  {
    id: 'shorts',
    name: 'Shorts',
    category: 'Bottoms',
    viewBox: '0 0 560 480',
    body:
      'M140 40 C200 34 360 34 420 40 C430 110 440 180 442 240 ' +
      'C444 320 442 380 440 430 C402 436 332 436 296 430 ' +
      'C292 370 288 300 280 250 C272 300 268 370 264 430 ' +
      'C228 436 158 436 120 430 C118 380 116 320 118 240 ' +
      'C120 180 130 110 140 40 Z',
    seams: [
      'M136 96 C200 90 360 90 424 96',
      'M280 96 C286 126 286 156 280 190',
      'M154 108 C176 136 202 152 228 158',
      'M406 108 C384 136 358 152 332 158',
      'M122 402 C158 408 228 408 264 402',
      'M296 402 C332 408 402 408 438 402',
    ],
    stitches: ['M136 86 C200 80 360 80 424 86'],
    folds: ['M196 210 C192 300 190 370 189 402', 'M364 210 C368 300 370 370 371 402'],
    wrinkles: [
      'M158 240 C182 272 196 316 198 366',
      'M402 240 C378 272 364 316 362 366',
      'M146 330 C170 358 184 388 186 416',
      'M414 330 C390 358 376 388 374 416',
    ],
    printArea: { x: 150, y: 180, w: 110, h: 180 },
    cmPerUnit: 40 / 280,
    placements: [
      { id: 'thigh', label: 'Thigh', x: 160, y: 220, w: 86 },
      { id: 'hip',   label: 'Hip',   x: 156, y: 136, w: 68 },
    ],
  },

  {
    id: 'apron',
    name: 'Apron',
    category: 'Workwear',
    viewBox: '0 0 560 620',
    body:
      'M200 70 C250 64 310 64 360 70 C362 120 364 170 366 212 ' +
      'C400 228 432 250 450 272 C458 360 460 470 456 560 ' +
      'C380 568 180 568 104 560 C100 470 102 360 110 272 ' +
      'C128 250 160 228 194 212 C196 170 198 120 200 70 Z',
    parts: ['M176 380 C176 372 384 372 384 380 L384 470 C384 478 176 478 176 470 Z'],
    seams: [
      'M200 70 C196 12 364 12 360 70',
      'M110 330 C70 340 40 352 14 368',
      'M450 330 C490 340 520 352 546 368',
      'M280 380 L280 470',
      'M108 540 C180 548 380 548 452 540',
    ],
    stitches: ['M182 386 C182 378 378 378 378 386', 'M208 78 C250 72 310 72 352 78'],
    folds: ['M232 240 C228 300 228 340 230 540', 'M328 240 C332 300 332 340 330 540'],
    wrinkles: [
      'M150 320 C176 350 192 400 194 460',
      'M410 320 C384 350 368 400 366 460',
      'M214 130 C226 158 230 186 228 206',
      'M346 130 C334 158 330 186 332 206',
    ],
    printArea: { x: 176, y: 236, w: 208, h: 130 },
    cmPerUnit: 62 / 346,
    placements: [
      { id: 'bib',    label: 'Bib',    x: 220, y: 92,  w: 120 },
      { id: 'centre', label: 'Centre', x: 188, y: 250, w: 184 },
      { id: 'pocket', label: 'Pocket', x: 194, y: 396, w: 172 },
    ],
  },

  {
    id: 'cap',
    name: 'Cap',
    category: 'Headwear',
    viewBox: '0 0 560 340',
    body: 'M150 250 C150 78 410 78 410 250 C350 262 210 262 150 250 Z',
    parts: [
      'M146 246 C210 236 350 236 414 246 C462 254 486 286 470 306 ' +
      'C400 322 160 322 90 306 C74 286 98 254 146 246 Z',
    ],
    seams: [
      'M280 100 L280 254',
      'M206 102 C224 152 240 208 246 254',
      'M354 102 C336 152 320 208 314 254',
      'M120 284 C200 296 360 296 440 284',
    ],
    stitches: ['M154 240 C212 230 348 230 406 240'],
    wrinkles: [
      'M170 180 C186 196 200 212 208 234',
      'M390 180 C374 196 360 212 352 234',
    ],
    printArea: { x: 186, y: 118, w: 188, h: 110 },
    cmPerUnit: 22 / 260,
    placements: [
      { id: 'front', label: 'Front panel', x: 190, y: 126, w: 180 },
      { id: 'small', label: 'Small front', x: 232, y: 142, w: 96 },
    ],
  },
]

/**
 * Garment colourways. Each is a three-stop ramp: the edge (in shadow), the
 * mid tone, and the lit centre. The renderer builds the cloth shading from
 * these, so a garment looks like fabric rather than a filled outline.
 */
export const colourways = [
  { id: 'black', label: 'Black', edge: '#0b0b0c', mid: '#1e1f21', lit: '#34363a', line: '#000000', ink: '#ffffff' },
  { id: 'white', label: 'White', edge: '#cfcfca', mid: '#ececea', lit: '#ffffff', line: '#9a9a95', ink: '#111111' },
  { id: 'grey',  label: 'Grey',  edge: '#5c5e62', mid: '#7c7f84', lit: '#9aa0a6', line: '#3a3c40', ink: '#ffffff' },
  { id: 'navy',  label: 'Navy',  edge: '#0f1729', mid: '#1c2740', lit: '#2c3b5c', line: '#070c17', ink: '#ffffff' },
  { id: 'sand',  label: 'Sand',  edge: '#bdae97', mid: '#d8cbb6', lit: '#eee3d0', line: '#8d8069', ink: '#1a1a1a' },
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
