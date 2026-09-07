# Garment blanks

One PNG per garment per angle — `<garment>-<view>.png` — front view only was
the old arrangement; there are now 15 files covering front and back for every
garment plus a side for the cap. All are 900px tall. These are what the sample
maker draws: `src/data/garments.ts` points at them and every coordinate in that
file is in these images' own pixel space.

## Where they come from

`refs/` holds the source sheets: Popalzai's own technical flats, exported from
the pattern room. Each sheet carries two or three views of one garment plus
measurement rulers, spec boxes, and on some, faint watermark text.

`tools/crop-views.ps1` separates the views and cleans each one. Re-run it after
changing anything in `refs/`:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/crop-views.ps1
```

Which views a sheet carries, and in what left-to-right order, is the `$SHEETS`
table at the top of the script. That is the one thing it cannot work out for
itself — it can find three clusters on the cap sheet, but not that they are
front, side and back.

## How the views get separated

By labelling connected ink components and k-means clustering their centroids,
weighted by pixel count so the garment outlines anchor the clusters.

Splitting on a gap in the ink does not work, and it is worth knowing why before
anyone tries it again:

- the widest gap on a sheet is often *inside* a garment — a tee's underarm
- where sleeves nearly touch there is no gap at all
- the hoodie's two views are drawn diagonally overlapping, front above-left of
  back, so no straight line separates them in any direction

An earlier version cropped a generous box and painted out the corner the back
view intruded into. That always left fragments sitting just past whichever edge
was guessed, and tightening the box cut the front's own sleeve off instead.

Clustering alone is not quite enough either. The hoodie sheet carries faint
watermark text, which sits nearer the front view than the back and so survives
the split — it stretched the crop by a quarter of the image, leaving the garment
finishing at 76% of the height with the rest whitespace. Anything falling
outside its cluster's largest component's box is dropped: no part of a garment
— ribbing, buttons, topstitching, drawcord — lies outside its own outline.

## Adding a new garment or angle

1. Save the sheet into `refs/`. Black line art on white or transparent; the
   whole sheet, uncropped, with however many views it carries.
2. Add it to `$SHEETS` in `tools/crop-views.ps1` with its views named in
   left-to-right order.
3. Run the script.
4. Run `tools/measure-views.ps1` to get the printable body of each new view.
5. Add the view to `src/data/garments.ts` with a `printArea` and `placements`.
6. Run `tools/check-print-areas.ps1`.

## Getting the measurements right

`cmPerUnit` is the number that matters — everything the customer sees in
centimetres comes from it. It is the garment's real body length divided by
`INK` (888: the 900px crop less 6px padding top and bottom), so it needs one
real measurement per garment, and it is shared across that garment's views.

**Every body length currently in `src/data/garments.ts` is an estimate.** The
hoodie shows why that matters: at 88cm its sleeve span worked out to 169cm,
which is not a garment. It is set to 80 now, still a guess.

`printArea` and `placements` are set by hand. After changing any of them:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/check-print-areas.ps1
```

It parses `garments.ts` directly — no second copy of the numbers to keep in
step — and ray-casts every corner of every box against the image, reporting any
that land off the garment. A point counts as inside when a scan in all four
directions hits ink; that four-way test is the whole trick, because these are
outlines on white, so "is this pixel dark" says nothing about whether you are
on cloth.

One thing the checker does not catch: a placement whose width, squared up, is
taller than its own `printArea`. The artwork box keeps its aspect ratio when it
snaps to a placement, so a placement wider than the guide is tall shows the
"outside the print area" warning the moment the garment is selected. The cap
had this on all three views.

## Why raster and not vector

Earlier versions traced these to SVG paths. Every attempt lost real
construction detail — collar ribbing, cuff stitching, pocket edges, cap panel
seams — because on a tech pack those are short straight segments, and so are
the leader lines pointing out to the measurement labels. Any filter aggressive
enough to remove the leaders removed the ribbing with it. The tracing tools are
still in `tools/` and documented there, but nothing ships from them.
