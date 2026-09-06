# Licensed garment mockups

**Empty on purpose.** Stock mockups are copyrighted and are not committed here.

## Adding one

1. Download the mockup from wherever you licensed it (Magnific/Freepik, Envato,
   Vecteezy…). Prefer a **transparent PNG**, front view, garment squared up.
2. Drop the file in this folder, e.g. `tee-black.png`.
3. In `src/data/garments.ts`, add `mockup` to the garment and re-express its
   geometry in the image's own pixel dimensions:

```ts
{
  id: 'tee',
  name: 'T-Shirt',
  viewBox: '0 0 1400 1600',                                  // = image w/h
  mockup: { src: '/mockups/tee-black.png', w: 1400, h: 1600 },
  printArea: { x: 430, y: 470, w: 540, h: 640 },             // measured in px
  cmPerUnit: 52 / 900,        // 52 cm chest ÷ its pixel width in the image
  placements: [ /* x, y, w in the same pixel space */ ],
  body: '…',                  // keep the vector paths as a fallback
}
```

`cmPerUnit` is the one to get right — measure the garment's chest width in
pixels in the image, then divide the real flat measurement by it. Everything the
customer sees in centimetres depends on that number.

When `mockup` is set the photo replaces the vector flat and the colourway picker
hides, since the photograph carries its own colour. Add one garment entry per
colour you licensed.

## Licensing

Check what you actually bought. Freepik/Magnific's **free** tier requires
attribution ("Designed by Freepik") somewhere on the page; **Premium** does not.
Neither permits redistributing the file itself.
