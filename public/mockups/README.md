# Garment blanks

One PNG per garment, front view only, 900px tall. These are what the sample
maker draws — `src/data/garments.ts` points at them and every coordinate in
that file is in these images' own pixel space.

## Where they come from

`refs/` holds the source sheets: Popalzai's own technical flats, exported from
the pattern room. Each sheet carries two or three views (front, back, sometimes
side) plus measurement rulers and spec boxes.

`tools/crop-fronts.ps1` isolates the front view and scales it. Re-run it after
replacing anything in `refs/`:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/crop-fronts.ps1
```

It splits the views by even division of the ink span rather than by hunting for
a gap between them — the widest gap on a sheet is often *inside* a garment (a
tee's underarm), and where sleeves nearly touch there is no gap at all.

The hoodie is laid out diagonally, front above-left of back, so no vertical
line separates the two at all. That one is split by labelling connected ink
components and 2-means clustering their centroids, weighted by pixel count so
the two outlines anchor the clusters. An earlier version cropped a generous box
and painted out the corner the back view intruded into; that always left
fragments sitting just past whichever edge was guessed.

Clustering alone was not enough either. The hoodie sheet carries faint
watermark text, which sits nearer the front view than the back and so survived
the split — it dragged the crop down by a quarter of the image, leaving the
garment ending at 76% of the height with the rest whitespace. Anything falling
outside the largest kept component's box is dropped: no part of a garment
(ribbing, buttons, topstitching, drawcord) lies outside its own outline.

Which garments use which method is a table at the top of the script.

## Why raster and not vector

Earlier versions traced these to SVG paths. Every attempt lost real
construction detail — collar ribbing, cuff stitching, pocket edges, cap panel
seams — because on a tech pack those are short straight segments, and so are
the leader lines pointing out to the measurement labels. Any filter aggressive
enough to remove the leaders removed the ribbing with them. The tracing tools
are still in `tools/` and documented there, but nothing ships from them.

## Changing a garment's measurements

`cmPerUnit` is the number to get right — everything the customer sees in
centimetres is derived from it. It is the garment's real body length divided by
`INK` (888: the 900px crop less 6px of padding top and bottom), so it only
needs the one real measurement per garment. The body lengths currently in
`src/data/garments.ts` are estimates and should be replaced with measured
values from the pattern room. The hoodie shows why this matters: at 88cm its
sleeve span worked out to 169cm, which is not a garment. It is set to 80 now,
still a guess.

`printArea` and `placements` are set by hand. After changing any of them run:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/check-print-areas.ps1
```

which ray-casts every corner of every box against the image and reports any
that fall outside the garment. Note that it carries its own copy of the
numbers — update the `$SPEC` table in it to match `garments.ts`.
