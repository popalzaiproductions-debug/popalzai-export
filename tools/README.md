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

## Fill: what actually took the longest

The tech packs draw outlines in three different ways, and each needs different
handling to end up as a solid garment:

1. **A closed contour.** Fills directly. (tee, tank, cap)
2. **An open contour whose ends nearly meet** — a sleeve outline. Force-closing
   it is correct. The endpoint gap relative to the path's diagonal is what
   distinguishes this from a line that merely sweeps across the garment; force
   -closing one of those puts a black triangle on the chest.
3. **A filled BAND: outer contour, then an inner one back the other way.**
   Filling that gives you the outline, not the garment — this is why the jeans
   rendered hollow through several attempts. Taking only the first subpath of
   each fill path yields the outer contour and solves it, and is a no-op for
   single-subpath shapes.

So the fill set is: the silhouette always, plus any path that is closed, near
-closed, or simply large enough (>=18% of the canvas) that it can only be an
outline piece. Small open paths stay out.

Annotation removal, in order: page furniture, anything wholly above or below
the silhouette (measurement rulers, spec boxes), compact marks inside the chest
(the tech pack's own logo, which sits where customer artwork goes), hairline
paths running outside the silhouette, straight polylines, and finally any path
of three points or fewer with no curve — every real seam and hem on these
sheets is a bezier, so short straight runs are always callout leaders.


## Annotation removal: what NOT to do

An earlier version dropped every short straight path on the theory that real
detail is always a bezier. That is wrong, and it quietly gutted the drawings:
collar ribbing, cuff stitching, pocket openings and cap panel seams are all
short straight segments. The garments still *looked* like garments, so the
damage was easy to miss until they were put next to the source drawings.

What actually identifies a leader line is that it points OUTWARD, past the
garment edge, toward a label. So the test is whether the path crosses the
silhouette boundary — not how short or how straight it is.

Order of removal:
  1. anything wholly above or below the silhouette (measurement rulers, spec
     boxes)
  2. straight paths whose box extends past the silhouette (leaders)
  3. compact marks in the middle of the chest (the pack's own logo, which sits
     where customer artwork goes)
  4. short axis-aligned two-point remnants left behind when step 1 clipped the
     outer half of a leader
  5. a per-garment scrub box for anything positional the above misses — with a
     hard size guard, because an unguarded scrub box will happily delete the
     body panel
