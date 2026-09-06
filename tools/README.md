# pdf-to-flat.py

Extracts vector path geometry from an Illustrator-generated tech-pack PDF and
writes one SVG per artwork stream. Used to build the garment flats in
`src/data/garments.ts` from real technical drawings rather than drawing them
by eye — which is how the earlier versions ended up with wrong proportions.

```bash
python tools/pdf-to-flat.py "SHORT SLEEVE POLO SHIRT.pdf" out/
```

It is a partial PDF content-stream interpreter: transform stack (`q`/`Q`/`cm`)
plus the path operators (`m l c v y re h`) and the painting operators that end
a path. PDF's origin is bottom-left with y up, so the output flips y.

Streams are ranked by path count; the garment drawings are usually the ones
with a few dozen to a few hundred paths. Page borders and rules are filtered
out by dropping anything wider than 700pt or taller than 560pt.

To isolate one garment from a front/back sheet, cluster the paths by centre-x
into two groups and take the left one. The silhouette is the path with the
largest bounding box — fill that, stroke the rest.

Watch for stray annotation geometry: size-label boxes and leader lines sit near
the collar on these sheets and need removing by hand.

## build-flats.py / emit-garments.py

The rest of the pipeline. `build-flats.py` picks one stream per garment,
isolates the FRONT view by clustering paths on centre-x, strips annotation
(measurement rulers, spec boxes, leader lines, the tech pack's own chest logo)
and normalises everything to 600 units tall. `emit-garments.py` turns that into
the `garments` array in `src/data/garments.ts`.

Two things learned the hard way:

- **The outline is not one closed path.** A shirt's body and sleeves are
  separate open strokes. So each garment carries a `fill` set — the paths big
  enough to be outline pieces — filled together under `nonzero`. Filling only
  closed paths leaves shirts hollow; filling everything closes the hem and
  topstitch lines into stray black triangles. The generator picks per garment:
  closed paths where they cover enough area, force-closed big paths otherwise.

- **Height is the stable dimension.** Sleeve spread makes overall width vary
  from 57 cm (polo) to 166 cm (hoodie, sleeves extended), so `cmPerUnit` comes
  from a real body length, not a width.

`printArea` and `placements` are hand-set in `emit-garments.py` and checked
against the render. Deriving them from the silhouette kept failing — a boxy
tee's sleeves reach into the hem band, a shirt's curved tail samples
asymmetrically.
