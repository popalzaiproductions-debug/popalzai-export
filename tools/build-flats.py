"""
Turn the extracted tech-pack SVGs into normalised front-view garment flats.

For each garment: drop page furniture, cluster the paths by centre-x to separate
the front view from the back (and side) views, keep the leftmost cluster, then
scale so every garment is 600 units tall. Height is the stable dimension — for
tops the sleeves make overall width vary wildly, so `cmPerUnit` is derived from
a real body length rather than a width.
"""
import re, os, json, sys

SC = os.path.dirname(os.path.abspath(__file__))
VEC = os.path.join(SC, 'vec')
NUM = r'[-+]?[0-9]*\.?[0-9]+'
PAIR = re.compile(r'(%s)\s+(%s)' % (NUM, NUM))

# garment -> (chosen stream file, number of views on the sheet, real height cm)
PICK = {
    'tee':        ('stream10_37.svg', 2, 72),
    'tank':       ('stream09_74.svg', 2, 72),
    'longsleeve': ('stream09_79.svg', 2, 72),
    'hoodie':     ('stream06_74.svg', 2, 88),
    'ziphoodie':  ('stream09_89.svg', 2, 88),
    'polo':       ('stream13_90.svg', 2, 74),
    'shirt':      ('stream11_85.svg', 2, 80),
    'jeans':      ('stream10_94.svg', 2, 104),
    'cap':        ('stream11_85.svg', 3, 16),
}


def bbox(d):
    p = [(float(a), float(b)) for a, b in PAIR.findall(d)]
    if not p:
        return None
    xs = [q[0] for q in p]; ys = [q[1] for q in p]
    return min(xs), min(ys), max(xs), max(ys)


def kmeans1d(vals, k, iters=60):
    vals = sorted(vals)
    cs = [vals[int((i + 0.5) * len(vals) / k)] for i in range(k)]
    for _ in range(iters):
        groups = [[] for _ in range(k)]
        for v in vals:
            groups[min(range(k), key=lambda i: abs(v - cs[i]))].append(v)
        new = [sum(g) / len(g) if g else cs[i] for i, g in enumerate(groups)]
        if new == cs:
            break
        cs = new
    return cs


out = {}
for gid, (fn, views, real_h) in PICK.items():
    path = os.path.join(VEC, gid, fn)
    if not os.path.exists(path):
        print('MISSING', gid, fn); continue
    src = open(path, encoding='utf-8').read()
    paths = re.findall(r'<path d="([^"]+)"', src)

    items = []
    for d in paths:
        b = bbox(d)
        if b is None:
            continue
        x0, y0, x1, y1 = b
        if (x1 - x0) > 700 or (y1 - y0) > 560:      # page frame and rules
            continue
        if (x1 - x0) < 0.6 and (y1 - y0) < 0.6:     # stray dots
            continue
        # Fabric texture and gradient meshes come through as paths with
        # hundreds of points. No garment outline needs that many.
        if len(PAIR.findall(d)) > 300:
            continue
        items.append((d, (x0, y0, x1, y1), (x0 + x1) / 2))
    if not items:
        print('no artwork', gid); continue

    cs = kmeans1d([i[2] for i in items], views)
    target = min(cs)                                 # leftmost view = the front
    front = [i for i in items if min(range(views), key=lambda j: abs(i[2] - cs[j])) == cs.index(target)]

    # Anchor everything to the silhouette: the largest path is the garment.
    big = max(front, key=lambda p: (p[1][2]-p[1][0]) * (p[1][3]-p[1][1]))
    sx0, sy0, sx1, sy1 = big[1]
    sw, sh = sx1 - sx0, sy1 - sy0

    # 1. Anything wholly above or below the garment is annotation: the
    #    measurement ruler at the top, spec boxes at the bottom.
    pad = sh * 0.02
    front = [p for p in front if not (p[1][1] > sy1 + pad or p[1][3] < sy0 - pad)]

    # 2. Leader lines. These point OUTWARD from the garment to a label, so what
    #    identifies them is crossing the silhouette boundary — not being short
    #    or straight. An earlier version dropped every short straight path and
    #    took the collar ribbing, cuff stitching, pocket edges and cap panel
    #    seams with it, because those are short straight segments too.
    def is_leader(item):
        d, b, _ = item
        if 'C' in d:                      # real construction lines are beziers
            return False
        out_l = b[0] < sx0 - sw * 0.02
        out_r = b[2] > sx1 + sw * 0.02
        out_t = b[3] > sy1 + sh * 0.02
        out_b = b[1] < sy0 - sh * 0.02
        return out_l or out_r or out_t or out_b
    front = [p for p in front if not is_leader(p)]

    # 3. The tech pack's own chest logo — it sits exactly where the customer's
    #    artwork goes. Compact marks in the middle of the chest only.
    def is_logo(b):
        inside = (b[0] > sx0 + sw*0.30 and b[2] < sx0 + sw*0.70
                  and b[1] > sy0 + sh*0.48 and b[3] < sy1 - sh*0.10)
        compact = (b[2]-b[0]) < sw*0.22 and (b[3]-b[1]) < sh*0.12
        return inside and compact
    logo = [p for p in front if is_logo(p[1])]
    if len(logo) >= 2:
        front = [p for p in front if not is_logo(p[1])]

    # 4. Leader stubs. Where the outward-pointing half of a leader was already
    #    clipped by rule 1, a short axis-aligned remnant survives inside the
    #    garment. Real detail on these sheets is never a perfectly horizontal
    #    or vertical two-point segment.
    def is_stub(item):
        d, b, _ = item
        if 'C' in d or len(PAIR.findall(d)) != 2:
            return False
        w_, h_ = b[2] - b[0], b[3] - b[1]
        axis = w_ < 0.8 or h_ < 0.8
        short = max(w_, h_) < max(sw, sh) * 0.30
        return axis and short
    front = [p for p in front if not is_stub(p)]

    # 5. Per-garment scrub: the pullover's chest logo sits outside the generic
    #    compact-mark test, so it goes by position.
    SCRUB = {'hoodie': (0.30, 0.46, 0.70, 0.80)}
    if gid in SCRUB:
        a_, b_, c_, d_ = SCRUB[gid]
        def in_scrub(bb):
            # size guard first: a scrub box must never be able to swallow the
            # body panel. Only small marks qualify.
            if (bb[2]-bb[0]) > sw*0.16 or (bb[3]-bb[1]) > sh*0.10:
                return False
            cx_ = (bb[0]+bb[2])/2; cy_ = (bb[1]+bb[3])/2
            return (sx0 + sw*a_ < cx_ < sx0 + sw*c_) and (sy0 + sh*b_ < cy_ < sy0 + sh*d_)
        front = [p for p in front if not in_scrub(p[1])]

    if not front:
        print('nothing left', gid); continue

    xs = [p[1][0] for p in front] + [p[1][2] for p in front]
    ys = [p[1][1] for p in front] + [p[1][3] for p in front]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    S = 600.0 / h

    def conv(d):
        # integers: on a 600-unit canvas the sub-unit precision is invisible
        # and it is a third of the payload
        return PAIR.sub(lambda m: '%d %d' % (round((float(m.group(1)) - minx) * S),
                                             round((maxy - float(m.group(2))) * S)), d)

    conv_paths = [conv(d) for d, _, _ in front]
    # The silhouette is the path enclosing the most area, not the one with the
    # biggest bounding box — on several of these sheets an internal
    # construction line spans a wider box than the outline itself.
    def enclosed(d):
        pts_ = [(float(a), float(b)) for a, b in PAIR.findall(d)]
        if len(pts_) < 3:
            return 0.0
        s = 0.0
        for k in range(len(pts_)):
            x1, y1 = pts_[k]
            x2, y2 = pts_[(k + 1) % len(pts_)]
            s += x1 * y2 - x2 * y1
        return abs(s) / 2.0

    sil = max(range(len(conv_paths)), key=lambda k: enclosed(conv_paths[k]))

    W = round(w * S)
    out[gid] = {
        'viewBox': '0 0 %d 600' % W,
        'width': W,
        'silhouette': conv_paths[sil],
        'detail': [p for i, p in enumerate(conv_paths) if i != sil],
        'cmPerUnit': round(real_h / 600.0, 6),
        'realHeightCm': real_h,
        'widthCm': round(W * real_h / 600.0, 1),
    }
    print('%-11s %3d paths  %4d x 600 units  = %5.1f x %d cm'
          % (gid, len(front), W, out[gid]['widthCm'], real_h))

PREV = os.path.join(SC, 'fronts')
os.makedirs(PREV, exist_ok=True)
for gid, g in out.items():
    parts = []
    for d in g['detail']:
        parts.append('<path d="' + d + '" fill="none" stroke="#111" stroke-width="2"/>')
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + g['viewBox'] + '">'
           + '<path d="' + g['silhouette'] + '" fill="#e9e9e6" stroke="#111" stroke-width="3"/>'
           + ''.join(parts) + '</svg>')
    open(os.path.join(PREV, gid + '.svg'), 'w', encoding='utf-8').write(svg)

open(os.path.join(SC, 'flats.json'), 'w').write(json.dumps(out))
print('\nwrote flats.json')
