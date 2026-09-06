/**
 * Garment blanks for the sample maker.
 *
 * Flat-vector technical sketches — the drawing convention apparel factories
 * work from. Crisp fills and confident linework, no blur, no imitation
 * photography. What makes them read as real garments is construction detail:
 * ribbed collars and cuffs, plackets, buttons, eyelets, pocket openings and
 * topstitching.
 *
 * PROPORTIONS COME FROM REAL MEASUREMENTS, not eyeballing. Each drawing is laid
 * out at 7 viewBox units per centimetre against a size-M spec — the tee is 52 cm
 * chest (364 units) by 72 cm length (~500 units). `cmPerUnit` converts back, so
 * the tool reports a physical artwork width, which is the number production
 * needs.
 *
 * Layers, drawn in order:
 *   partsBehind  pieces that fall behind the body (the hood)
 *   body      the silhouette — filled and outlined
 *   parts     separate pieces over it (pocket, collar, cuff, brim) in a 2nd tone
 *   lines     solid construction lines (hems, seams, plackets, creases)
 *   hatch     fine parallel ticks — ribbing and elastic gathers
 *   stitches  dashed topstitching
 *   dots      buttons and eyelets
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

export type Dot = { cx: number; cy: number; r: number; hollow?: boolean }

export type Garment = {
  id: string
  name: string
  category: string
  viewBox: string
  body: string
  /** Pieces that sit behind the body — a hood falls behind the shoulders. */
  partsBehind?: string[]
  parts?: string[]
  lines?: string[]
  hatch?: string[]
  stitches?: string[]
  dots?: Dot[]
  /** Region artwork is expected to sit within; drawn as a dashed guide. */
  printArea: { x: number; y: number; w: number; h: number }
  cmPerUnit: number
  placements: Placement[]
  /**
   * Optional licensed photographic mockup. Stock mockups are copyrighted, so
   * none ship with the repo — see public/mockups/README.md. When set it replaces
   * the vector flat, and the geometry above is read in the image's pixel space.
   */
  mockup?: { src: string; w: number; h: number }
}

/**
 * Evenly spaced tick marks along a straight run — ribbing on a cuff, gathers on
 * an elastic waistband. Authoring twenty of these by hand is how errors creep in.
 */
function ticks(
  x1: number, y1: number, x2: number, y2: number,
  dx: number, dy: number, n: number,
): string[] {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n
    const x = x1 + (x2 - x1) * t
    const y = y1 + (y2 - y1) * t
    return `M${x.toFixed(1)} ${y.toFixed(1)} L${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`
  })
}

export const garments: Garment[] = [
  {
    // 52 cm chest × 72 cm length. Set-in sleeves, ribbed crew neck.
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
    parts: [
      'M217 44 C222 68 248 84 280 84 C312 84 338 68 343 44 L331 45 C327 65 306 76 280 76 C254 76 233 65 229 45 Z',
    ],
    lines: [
      'M30 146 C48 180 72 206 98 222',
      'M530 146 C512 180 488 206 462 222',
      'M105 524 C160 532 400 532 455 524',
      'M121 66 C112 108 106 152 104 196',
      'M439 66 C448 108 454 152 456 196',
    ],
    stitches: [
      'M38 140 C56 174 80 200 106 216',
      'M522 140 C504 174 480 200 454 216',
      'M107 514 C160 522 400 522 453 514',
      'M226 50 C232 72 254 88 280 88 C306 88 328 72 334 50',
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
    // 46 cm chest. Bound neck and armholes.
    id: 'tank',
    name: 'Tank Top',
    category: 'Tops',
    viewBox: '0 0 560 600',
    body:
      'M232 44 C220 45 208 47 200 50 C204 110 186 170 152 214 ' +
      'C140 262 128 400 120 540 C176 548 384 548 440 540 ' +
      'C432 400 420 262 408 214 C374 170 356 110 360 50 ' +
      'C352 47 340 45 328 44 C322 72 304 88 280 88 C256 88 238 72 232 44 Z',
    parts: [
      'M232 44 C238 72 256 88 280 88 C304 88 322 72 328 44 L318 45 C313 66 300 78 280 78 C260 78 247 66 242 45 Z',
    ],
    lines: [
      'M209 55 C213 110 196 166 164 208',
      'M351 55 C347 110 364 166 396 208',
      'M121 522 C176 530 384 530 439 522',
    ],
    stitches: [
      'M216 58 C220 110 204 164 174 204',
      'M344 58 C340 110 356 164 386 204',
      'M123 512 C176 520 384 520 437 512',
      'M240 50 C246 74 262 92 280 92 C298 92 314 74 320 50',
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
    // Tee block, sleeves run to the wrist with ribbed cuffs.
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
    parts: [
      'M217 44 C222 68 248 84 280 84 C312 84 338 68 343 44 L331 45 C327 65 306 76 280 76 C254 76 233 65 229 45 Z',
      'M17 342 C33 364 55 376 81 380 L74 398 C48 394 26 382 10 360 Z',
      'M543 342 C527 364 505 376 479 380 L486 398 C512 394 534 382 550 360 Z',
    ],
    lines: [
      'M105 524 C160 532 400 532 455 524',
      'M121 66 C112 108 106 156 98 200',
      'M439 66 C448 108 454 156 462 200',
    ],
    hatch: [
      ...ticks(20, 348, 78, 380, 4, -13, 6),
      ...ticks(540, 348, 482, 380, -4, -13, 6),
    ],
    stitches: [
      'M107 514 C160 522 400 522 453 514',
      'M226 50 C232 72 254 88 280 88 C306 88 328 72 334 50',
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
    // 56 cm chest, cut fuller. Hood with drawcords, kangaroo pocket, ribbed hem.
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
    partsBehind: [
      'M186 118 C156 -2 404 -2 374 118 C336 140 310 150 280 150 C250 150 224 140 186 118 Z',
    ],
    parts: [
      'M156 396 C156 388 404 388 404 396 L410 496 C410 504 150 504 150 496 Z',
      'M84 528 C146 536 414 536 476 528 L476 566 C414 574 146 574 84 566 Z',
      'M28 412 C44 428 64 438 86 440 L84 458 C62 456 42 446 26 430 Z',
      'M532 412 C516 428 496 438 474 440 L476 458 C498 456 518 446 534 430 Z',
    ],
    lines: [
      'M206 104 C236 128 260 140 280 140 C300 140 324 128 354 104',
      'M124 96 C114 140 106 168 100 194',
      'M436 96 C446 140 454 168 460 194',
      'M170 400 C176 424 186 442 202 454',
      'M390 400 C384 424 374 442 358 454',
      'M248 146 C244 166 240 182 234 198',
      'M312 146 C316 166 320 182 326 198',
    ],
    hatch: [
      ...ticks(92, 533, 468, 533, 0, 38, 20),
      ...ticks(32, 416, 84, 441, 8, -13, 4),
      ...ticks(528, 416, 476, 441, -8, -13, 4),
    ],
    stitches: [
      'M162 402 C162 394 398 394 398 402',
      'M214 112 C240 134 262 146 280 146 C298 146 320 134 346 112',
    ],
    dots: [
      { cx: 248, cy: 142, r: 5, hollow: true },
      { cx: 312, cy: 142, r: 5, hollow: true },
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
    // Tee block with a ribbed collar and a three-button placket.
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
      'M214 44 C224 96 248 130 272 148 L280 104 L288 148 C312 130 336 96 346 44 ' +
        'L328 44 C320 90 302 120 280 136 C258 120 240 90 232 44 Z',
      'M260 106 L300 106 L300 236 L260 236 Z',
    ],
    lines: [
      'M280 106 L280 236',
      'M30 146 C48 180 72 206 98 222',
      'M530 146 C512 180 488 206 462 222',
      'M105 524 C160 532 400 532 455 524',
      'M104 498 L104 544',
      'M456 498 L456 544',
    ],
    stitches: [
      'M266 112 L266 230',
      'M294 112 L294 230',
      'M107 514 C160 522 400 522 453 514',
      'M38 140 C56 174 80 200 106 216',
      'M522 140 C504 174 480 200 454 216',
    ],
    dots: [
      { cx: 280, cy: 134, r: 6 },
      { cx: 280, cy: 172, r: 6 },
      { cx: 280, cy: 210, r: 6 },
    ],
    printArea: { x: 140, y: 244, w: 280, h: 186 },
    cmPerUnit: 52 / 364,
    placements: [
      { id: 'left-chest', label: 'Left chest',   x: 316, y: 250, w: 76 },
      { id: 'centre',     label: 'Centre chest', x: 210, y: 276, w: 140 },
    ],
  },

  {
    // 40 cm flat waist, 102 cm outseam. Five-pocket construction.
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
    parts: [
      'M140 40 C200 34 360 34 420 40 L424 96 C360 90 200 90 136 96 Z',
      'M156 38 L170 38 L170 76 L156 76 Z',
      'M273 35 L287 35 L287 73 L273 73 Z',
      'M390 38 L404 38 L404 76 L390 76 Z',
    ],
    lines: [
      'M280 96 C286 132 286 168 280 206',
      'M152 104 C176 134 204 150 232 156',
      'M408 104 C384 134 356 150 328 156',
      'M126 730 C160 736 232 736 266 730',
      'M294 730 C328 736 400 736 434 730',
      'M196 220 C192 400 190 600 189 730',
      'M364 220 C368 400 370 600 371 730',
    ],
    stitches: [
      'M136 86 C200 80 360 80 424 86',
      'M270 100 C276 134 276 170 270 206',
      'M158 110 C180 138 206 154 234 162',
      'M402 110 C380 138 354 154 326 162',
      'M128 720 C160 726 232 726 264 720',
      'M296 720 C328 726 400 726 432 720',
      'M274 210 C277 254 279 296 280 326',
    ],
    dots: [{ cx: 254, cy: 68, r: 7 }],
    printArea: { x: 150, y: 190, w: 110, h: 220 },
    cmPerUnit: 40 / 280,
    placements: [
      { id: 'thigh',    label: 'Thigh',     x: 160, y: 230, w: 88 },
      { id: 'hip',      label: 'Hip',       x: 156, y: 140, w: 70 },
      { id: 'abovehem', label: 'Above hem', x: 160, y: 640, w: 70 },
    ],
  },

  {
    // Elastic waist with a drawcord.
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
    parts: [
      'M140 40 C200 34 360 34 420 40 L426 104 C360 98 200 98 134 104 Z',
    ],
    lines: [
      'M280 104 C286 130 286 156 280 182',
      'M122 402 C158 408 228 408 264 402',
      'M296 402 C332 408 402 408 438 402',
      'M196 210 C192 300 190 370 189 402',
      'M364 210 C368 300 370 370 371 402',
    ],
    hatch: [...ticks(146, 46, 414, 46, 0, 52, 18)],
    stitches: [
      'M136 94 C200 88 360 88 424 94',
      'M124 392 C158 398 228 398 262 392',
      'M298 392 C332 398 402 398 436 392',
      'M262 104 C256 122 250 134 240 144',
      'M298 104 C304 122 310 134 320 144',
    ],
    printArea: { x: 150, y: 180, w: 110, h: 180 },
    cmPerUnit: 40 / 280,
    placements: [
      { id: 'thigh', label: 'Thigh', x: 160, y: 220, w: 86 },
      { id: 'hip',   label: 'Hip',   x: 156, y: 136, w: 68 },
    ],
  },

  {
    // Bib apron: neck strap with a slider, waist ties, divided patch pocket.
    id: 'apron',
    name: 'Apron',
    category: 'Workwear',
    viewBox: '0 0 560 620',
    body:
      'M200 70 C250 64 310 64 360 70 C362 120 364 170 366 212 ' +
      'C400 228 432 250 450 272 C458 360 460 470 456 560 ' +
      'C380 568 180 568 104 560 C100 470 102 360 110 272 ' +
      'C128 250 160 228 194 212 C196 170 198 120 200 70 Z',
    parts: [
      'M176 380 C176 372 384 372 384 380 L384 470 C384 478 176 478 176 470 Z',
      'M198 74 C190 6 370 6 362 74 L346 74 C352 30 208 30 214 74 Z',
    ],
    lines: [
      'M110 330 C70 340 40 352 14 368',
      'M450 330 C490 340 520 352 546 368',
      'M280 380 L280 470',
      'M108 542 C180 550 380 550 452 542',
      'M204 216 C202 300 202 400 204 542',
      'M356 216 C358 300 358 400 356 542',
    ],
    stitches: [
      'M182 386 C182 378 378 378 378 386',
      'M208 78 C250 72 310 72 352 78',
      'M110 532 C180 540 380 540 450 532',
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
    // Six-panel cap, curved brim.
    id: 'cap',
    name: 'Cap',
    category: 'Headwear',
    viewBox: '0 0 560 340',
    body: 'M158 248 C150 84 410 84 402 248 C346 260 214 260 158 248 Z',
    parts: [
      'M154 244 C214 234 346 234 406 244 C444 252 464 280 450 298 ' +
      'C392 312 168 312 110 298 C96 280 116 252 154 244 Z',
      'M156 240 C214 230 346 230 404 240 L406 256 C346 246 214 246 154 256 Z',
    ],
    lines: [
      'M280 130 L280 250',
      'M232 134 C238 172 244 216 248 250',
      'M328 134 C322 172 316 216 312 250',
      'M190 158 C196 192 198 224 200 250',
      'M370 158 C364 192 362 224 360 250',
    ],
    stitches: [
      'M132 274 C204 286 356 286 428 274',
      'M118 290 C196 304 364 304 442 290',
    ],
    dots: [
      { cx: 280, cy: 134, r: 7 },
      { cx: 238, cy: 198, r: 4, hollow: true },
      { cx: 322, cy: 198, r: 4, hollow: true },
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
 * Garment colourways. `panel` is the second tone used for ribbing, pockets and
 * collars; `detail` and `stitch` are the linework, which has to invert between
 * dark and light cloth to stay legible.
 */
export const colourways = [
  { id: 'black', label: 'Black',
    fill: '#1b1c1f', fillLo: '#0e0f11', panel: '#26282c', line: '#000000',
    detail: 'rgba(255,255,255,0.34)', stitch: 'rgba(255,255,255,0.44)', ink: '#ffffff' },
  { id: 'white', label: 'White',
    fill: '#ffffff', fillLo: '#f0f0ee', panel: '#e8e8e5', line: '#2b2b29',
    detail: 'rgba(0,0,0,0.34)', stitch: 'rgba(0,0,0,0.40)', ink: '#111111' },
  { id: 'grey',  label: 'Grey',
    fill: '#a1a6ac', fillLo: '#8b9096', panel: '#8f949b', line: '#3a3d41',
    detail: 'rgba(0,0,0,0.32)', stitch: 'rgba(255,255,255,0.5)', ink: '#111111' },
  { id: 'navy',  label: 'Navy',
    fill: '#24334f', fillLo: '#162034', panel: '#2e3f62', line: '#0a0f1a',
    detail: 'rgba(255,255,255,0.30)', stitch: 'rgba(255,255,255,0.40)', ink: '#ffffff' },
  { id: 'sand',  label: 'Sand',
    fill: '#e7dac5', fillLo: '#d6c8b0', panel: '#dbcdb6', line: '#6f6350',
    detail: 'rgba(0,0,0,0.30)', stitch: 'rgba(0,0,0,0.34)', ink: '#1a1a1a' },
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
