"""Emit src/data/garments.ts from the extracted flats."""
import json, os, re

SC = os.path.dirname(os.path.abspath(__file__))
flats = json.load(open(os.path.join(SC, 'flats.json')))
NUM = r'[-+]?[0-9]*\.?[0-9]+'
PAIR = re.compile(r'(%s)\s+(%s)' % (NUM, NUM))

META = {
    #  id            display name    category      real height cm
    'tee':        ('T-Shirt',      'Tops',      72),
    'tank':       ('Tank Top',     'Tops',      72),
    'longsleeve': ('Long Sleeve',  'Tops',      72),
    'polo':       ('Polo Shirt',   'Tops',      74),
    'shirt':      ('Button Shirt', 'Tops',      80),
    'hoodie':     ('Hoodie',       'Tops',      88),
    'ziphoodie':  ('Zip Hoodie',   'Tops',      88),
    'jeans':      ('Jeans',        'Bottoms',  104),
    'cap':        ('Cap',          'Headwear',  16),
}
# 'shirt' is omitted: its tech pack draws the two front panels as separate
# open strokes that do not meet, so it fills with a white gap down the front.
# Everything else extracts cleanly. Re-add it once that is solved.
ORDER = ['tee', 'tank', 'longsleeve', 'polo', 'hoodie', 'ziphoodie', 'jeans', 'cap']


def pts(d):
    return [(float(a), float(b)) for a, b in PAIR.findall(d)]


def body_span(sil, H):
    """
    Width of the garment body, measured near the hem where sleeves don't reach.
    Measured symmetrically about the centre — a shirt's curved tail gives an
    asymmetric sample and would otherwise report half the body width.
    """
    p = pts(sil)
    cx = (min(q[0] for q in p) + max(q[0] for q in p)) / 2
    low = [q for q in p if q[1] > H * 0.78]
    if len(low) < 6:
        low = p
    half = max(abs(q[0] - cx) for q in low)
    return cx - half, cx + half


out = []
for gid in ORDER:
    if gid not in flats:
        print('skip', gid); continue
    g = flats[gid]
    name, cat, real_h = META[gid]
    W = g['width']; H = 600
    bx0, bx1 = body_span(g['silhouette'], H)
    bw = bx1 - bx0
    cpu = real_h / 600.0

    # Print areas are set by hand and checked against the render. Deriving them
    # from the silhouette kept failing: a boxy tee's sleeves hang into the hem
    # band, and a shirt's curved tail samples asymmetrically.
    AREA = {
      # tee body centre is x=421 (the drawing widened when leader lines were
      # stripped, which moved it) — these are aligned to that
      'tee':        ((296,150,250,230), [('left-chest','Left chest',436,180,90),
                                         ('right-chest','Right chest',316,180,90),
                                         ('centre','Centre chest',336,200,170),
                                         ('full','Full front',296,170,250)]),
      'tank':       ((90,140,225,250),  [('left-chest','Left chest',225,175,75),
                                         ('centre','Centre chest',110,190,185),
                                         ('full','Full front',90,160,225)]),
      'longsleeve': ((195,150,210,230), [('left-chest','Left chest',310,180,80),
                                         ('centre','Centre chest',205,200,190),
                                         ('full','Full front',195,170,210)]),
      'polo':       ((110,210,245,200), [('left-chest','Left chest',255,225,70),
                                         ('right-chest','Right chest',140,225,70),
                                         ('lower','Lower front',125,280,215)]),
      'shirt':      ((205,220,180,200), [('left-chest','Left chest',305,235,65),
                                         ('right-chest','Right chest',225,235,65),
                                         ('lower','Lower front',215,290,160)]),
      'hoodie':     ((445,160,245,190), [('left-chest','Left chest',580,185,80),
                                         ('centre','Centre chest',460,200,215),
                                         ('full','Full front',445,175,245)]),
      'ziphoodie':  ((445,160,245,190), [('left-chest','Left chest',590,190,75),
                                         ('right-chest','Right chest',475,190,75)]),
      'jeans':      ((25,130,105,180),  [('thigh','Thigh',35,160,85),
                                         ('hip','Hip',35,110,70),
                                         ('abovehem','Above hem',35,430,70)]),
      'cap':        ((300,130,270,200), [('front','Front panel',310,150,250),
                                         ('small','Small front',370,180,130)]),
    }
    (ax, ay, aw, ah), places = AREA[gid]
    pa = {'x': ax, 'y': ay, 'w': aw, 'h': ah}

    # Paths big enough to be outline pieces — body, sleeve, leg, hood. Filling
    # only closed paths leaves garments whose outline is drawn as open strokes
    # (the button shirt) unfilled; filling everything closes detail lines into
    # stray triangles. Size is the discriminator.
    canvas = W * H
    def big(d):
        q = pts(d)
        if len(q) < 3:
            return False
        bw_ = max(x for x, _ in q) - min(x for x, _ in q)
        bh_ = max(y for _, y in q) - min(y for _, y in q)
        return (bw_ * bh_) > canvas * 0.03 and bw_ > W * 0.04 and bh_ > H * 0.04
    def shoelace(d):
        q = pts(d)
        if len(q) < 3:
            return 0.0
        t = 0.0
        for k in range(len(q)):
            x1, y1 = q[k]; x2, y2 = q[(k + 1) % len(q)]
            t += x1 * y2 - x2 * y1
        return abs(t) / 2.0

    allp = [g['silhouette']] + g['detail']
    big_paths = [d for d in allp if big(d)]
    closed_big = [d for d in big_paths if d.rstrip().endswith('Z')]

    # Prefer genuinely closed outline pieces: force-closing an open path that
    # merely sweeps across the garment produces a filled triangle. Only fall
    # back to force-closing when a garment has no usable closed outline — the
    # button shirt draws its body and sleeves as open strokes.
    # A sleeve is often drawn as an OPEN contour whose ends nearly meet. Those
    # should fill. A line that merely sweeps across the garment has its ends
    # far apart, and force-closing it produces a black triangle. Endpoint
    # separation is what separates the two.
    def nearly_closed(d):
        q = pts(d)
        if len(q) < 3:
            return False
        (x0_, y0_), (x1_, y1_) = q[0], q[-1]
        gap = ((x1_ - x0_) ** 2 + (y1_ - y0_) ** 2) ** 0.5
        bw_ = max(x for x, _ in q) - min(x for x, _ in q)
        bh_ = max(y for _, y in q) - min(y for _, y in q)
        diag = (bw_ ** 2 + bh_ ** 2) ** 0.5
        return diag > 0 and gap / diag < 0.25

    def bbox_frac(d):
        q = pts(d)
        if len(q) < 3:
            return 0.0
        bw_ = max(x for x, _ in q) - min(x for x, _ in q)
        bh_ = max(y for _, y in q) - min(y for _, y in q)
        return (bw_ * bh_) / canvas

    # What fills: the silhouette always, plus any path that is either a closed
    # contour, a near-closed one (a sleeve drawn as an open outline), or simply
    # large enough that it can only be an outline piece. That last clause is
    # what catches the jeans — one open path whose ends sit far apart — and the
    # shirt, whose two front panels are separate open strokes. Small open paths
    # stay out: force-closing a hem line makes a black triangle.
    fill_paths = [g['silhouette']]
    for d in big_paths:
        if d in fill_paths:
            continue
        if d.rstrip().endswith('Z') or nearly_closed(d) or bbox_frac(d) >= 0.18:
            fill_paths.append(d)

    print('   fill: %d of %d big paths' % (len(fill_paths), len(big_paths)))

    # Some outlines are drawn as a filled BAND: outer contour, then an inner
    # one back the other way. Filling that gives you the outline, not a solid
    # garment (this is why the jeans rendered hollow). Keeping only the first
    # subpath of each fill path takes the outer contour and solves it; for
    # single-subpath shapes it changes nothing.
    def outer(d):
        i = d.find('M', 1)
        head = d[:i] if i > 0 else d
        head = head.rstrip()
        return head if head.endswith('Z') else head + 'Z'
    fill_paths = [outer(d) for d in fill_paths]

    det = chr(10).join("      '%s'," % d for d in g['detail'])
    fil = chr(10).join("      '%s'," % d for d in fill_paths)
    pl = '\n'.join(
        "      { id: '%s', label: '%s', x: %d, y: %d, w: %d }," % p for p in places)
    out.append(f"""  {{
    id: '{gid}',
    name: '{name}',
    category: '{cat}',
    viewBox: '{g['viewBox']}',
    silhouette:
      '{g['silhouette']}',
    fill: [
{fil}
    ],
    detail: [
{det}
    ],
    printArea: {{ x: {pa['x']}, y: {pa['y']}, w: {pa['w']}, h: {pa['h']} }},
    cmPerUnit: {real_h} / 600,
    placements: [
{pl}
    ],
  }},""")
    print('%-11s W=%4d body %4.0f..%-4.0f  print %d,%d %dx%d  %.1f cm wide'
          % (gid, W, bx0, bx1, pa['x'], pa['y'], pa['w'], pa['h'], bw*cpu))

open(os.path.join(SC, 'garments_body.txt'), 'w', encoding='utf-8').write('\n'.join(out))
print('\nwrote garments_body.txt')
