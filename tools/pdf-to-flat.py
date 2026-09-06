"""
Extract vector path geometry from an Illustrator-generated PDF and emit SVG.

PDF content streams are a little stack machine. We only care about the path
construction and painting operators, plus the transform stack, so this is a
deliberately partial interpreter:

    q / Q        push / pop graphics state
    a b c d e f cm   concatenate transform
    x y m        moveto
    x y l        lineto
    ... c / v / y    bezier variants
    x y w h re   rectangle
    h            closepath
    S s f F f* B B* b b* n   paint (and end) the current path

PDF's origin is bottom-left with y increasing upward; SVG's is top-left with y
down, so the final transform flips y about the page height.
"""
import re, sys, zlib, os, json

PDF = sys.argv[1]
OUT = sys.argv[2]
os.makedirs(OUT, exist_ok=True)

data = open(PDF, 'rb').read()

# ---- collect every decompressed stream -------------------------------------
streams = []
for m in re.finditer(rb'stream\r?\n', data):
    start = m.end()
    end = data.find(b'endstream', start)
    if end < 0:
        continue
    raw = data[start:end]
    try:
        s = zlib.decompress(raw)
    except Exception:
        continue
    streams.append(s)

print(f'decompressed streams: {len(streams)}')

NUM = r'[-+]?[0-9]*\.?[0-9]+'
TOKEN = re.compile((r'(%s)|([A-Za-z\*\'"]+)' % NUM).encode())


def mul(a, b):
    """a then b, both [a b c d e f] affine."""
    return [
        a[0]*b[0] + a[1]*b[2],
        a[0]*b[1] + a[1]*b[3],
        a[2]*b[0] + a[3]*b[2],
        a[2]*b[1] + a[3]*b[3],
        a[4]*b[0] + a[5]*b[2] + b[4],
        a[4]*b[1] + a[5]*b[3] + b[5],
    ]


def apply(m, x, y):
    return (m[0]*x + m[2]*y + m[4], m[1]*x + m[3]*y + m[5])


def interpret(buf):
    """Return a list of (svg_path_d, painted) for one content stream."""
    ctm = [1, 0, 0, 1, 0, 0]
    stack = []
    ops = []          # numeric operand stack
    out = []
    cur = []          # current path, as SVG commands in device space
    start_pt = None
    cx = cy = 0.0

    def pt(x, y):
        return apply(ctm, x, y)

    for mt in TOKEN.finditer(buf):
        num, op = mt.group(1), mt.group(2)
        if num is not None:
            try:
                ops.append(float(num))
            except ValueError:
                ops.append(0.0)
            if len(ops) > 8:
                del ops[:-8]
            continue

        o = op.decode('latin-1')

        if o == 'q':
            stack.append(list(ctm))
        elif o == 'Q':
            if stack:
                ctm = stack.pop()
        elif o == 'cm' and len(ops) >= 6:
            ctm = mul(ops[-6:], ctm)
        elif o == 'm' and len(ops) >= 2:
            cx, cy = ops[-2], ops[-1]
            x, y = pt(cx, cy)
            cur.append(f'M{x:.2f} {y:.2f}')
            start_pt = (cx, cy)
        elif o == 'l' and len(ops) >= 2:
            cx, cy = ops[-2], ops[-1]
            x, y = pt(cx, cy)
            cur.append(f'L{x:.2f} {y:.2f}')
        elif o == 'c' and len(ops) >= 6:
            p1 = pt(ops[-6], ops[-5]); p2 = pt(ops[-4], ops[-3]); p3 = pt(ops[-2], ops[-1])
            cur.append(f'C{p1[0]:.2f} {p1[1]:.2f} {p2[0]:.2f} {p2[1]:.2f} {p3[0]:.2f} {p3[1]:.2f}')
            cx, cy = ops[-2], ops[-1]
        elif o == 'v' and len(ops) >= 4:
            p1 = pt(cx, cy); p2 = pt(ops[-4], ops[-3]); p3 = pt(ops[-2], ops[-1])
            cur.append(f'C{p1[0]:.2f} {p1[1]:.2f} {p2[0]:.2f} {p2[1]:.2f} {p3[0]:.2f} {p3[1]:.2f}')
            cx, cy = ops[-2], ops[-1]
        elif o == 'y' and len(ops) >= 4:
            p1 = pt(ops[-4], ops[-3]); p3 = pt(ops[-2], ops[-1])
            cur.append(f'C{p1[0]:.2f} {p1[1]:.2f} {p3[0]:.2f} {p3[1]:.2f} {p3[0]:.2f} {p3[1]:.2f}')
            cx, cy = ops[-2], ops[-1]
        elif o == 're' and len(ops) >= 4:
            x0, y0, w, h = ops[-4], ops[-3], ops[-2], ops[-1]
            a = pt(x0, y0); b = pt(x0 + w, y0); c2 = pt(x0 + w, y0 + h); d = pt(x0, y0 + h)
            cur.append(f'M{a[0]:.2f} {a[1]:.2f}L{b[0]:.2f} {b[1]:.2f}'
                       f'L{c2[0]:.2f} {c2[1]:.2f}L{d[0]:.2f} {d[1]:.2f}Z')
        elif o == 'h':
            cur.append('Z')
        elif o in ('S', 's', 'f', 'F', 'f*', 'B', 'B*', 'b', 'b*', 'n'):
            if cur:
                out.append((''.join(cur), o))
            cur = []
        if num is None:
            ops = []
    return out


# ---- page size -------------------------------------------------------------
mb = re.search(rb'/MediaBox\s*\[\s*(%s)\s+(%s)\s+(%s)\s+(%s)' % (
    NUM.encode(), NUM.encode(), NUM.encode(), NUM.encode()), data)
if mb:
    x0, y0, x1, y1 = (float(mb.group(i)) for i in range(1, 5))
else:
    x0, y0, x1, y1 = 0, 0, 612, 792
PW, PH = x1 - x0, y1 - y0
print(f'page: {PW:.0f} x {PH:.0f}')

# ---- interpret every stream, keep the ones with real artwork ---------------
results = []
for i, s in enumerate(streams):
    if b' c\n' not in s and b' c\r' not in s and b' c ' not in s:
        continue
    try:
        paths = interpret(s)
    except Exception as e:
        continue
    if len(paths) < 3:
        continue
    results.append((i, paths))

results.sort(key=lambda r: -len(r[1]))
print(f'streams with artwork: {len(results)}')
for i, paths in results[:14]:
    print(f'  stream {i}: {len(paths)} paths')

manifest = []
for rank, (i, paths) in enumerate(results[:14]):
    xs, ys = [], []
    for d, _ in paths:
        for nx, ny in re.findall(r'(%s)\s+(%s)' % (NUM, NUM), d):
            xs.append(float(nx)); ys.append(float(ny))
    if not xs:
        continue
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    w, h = maxx - minx, maxy - miny
    if w < 20 or h < 20:
        continue
    body = '\n'.join(
        f'<path d="{d}" fill="none" stroke="#000" stroke-width="1"/>' for d, _ in paths)
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{minx:.1f} {miny:.1f} {w:.1f} {h:.1f}">'
           f'<g transform="translate(0,{2*miny + h:.1f}) scale(1,-1)">{body}</g></svg>')
    fn = os.path.join(OUT, f'stream{rank:02d}_{i}.svg')
    open(fn, 'w', encoding='utf-8').write(svg)
    manifest.append({'file': os.path.basename(fn), 'stream': i,
                     'paths': len(paths), 'w': round(w, 1), 'h': round(h, 1)})

open(os.path.join(OUT, 'manifest.json'), 'w').write(json.dumps(manifest, indent=1))
print('wrote', len(manifest), 'svg files')
