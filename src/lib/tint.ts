/**
 * Recolours a garment flat.
 *
 * The flats are black line drawings on white, and the white is both the cloth
 * and the page around it. Multiplying a colour over the whole image would paint
 * the page too, so the two have to be told apart first: a flood fill from the
 * image border through light pixels marks everything outside the garment. The
 * outline is a closed stroke, so the fill cannot get in — whatever it did not
 * reach is cloth or construction line.
 *
 * Cloth is then blended from line colour to fabric colour by how light each
 * pixel was, which keeps anti-aliasing, stitching and ribbing intact. On dark
 * fabric the lines are drawn light, or a black garment would lose every seam.
 *
 * Runs in the browser only (canvas), so it is always called from an effect and
 * never during the build-time render.
 */

/** Pixels at least this light let the outside fill through. */
const PASSABLE = 200

const cache = new Map<string, Promise<string>>()

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** True when a fabric colour needs light construction lines to stay legible. */
export function isDarkColour(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex).map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.18
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`could not load ${src}`))
    img.src = src
  })
}

async function render(src: string, hex: string): Promise<string> {
  const img = await loadImage(src)
  const w = img.naturalWidth
  const h = img.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return src
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, w, h)
  const px = data.data

  const lum = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const o = i * 4
    lum[i] = (px[o] + px[o + 1] + px[o + 2]) / 3
  }

  // Flood fill the outside from every border pixel.
  const outside = new Uint8Array(w * h)
  const queue = new Int32Array(w * h)
  let head = 0
  let tail = 0
  const seed = (i: number) => {
    if (!outside[i] && lum[i] >= PASSABLE) {
      outside[i] = 1
      queue[tail++] = i
    }
  }
  for (let x = 0; x < w; x++) {
    seed(x)
    seed((h - 1) * w + x)
  }
  for (let y = 0; y < h; y++) {
    seed(y * w)
    seed(y * w + w - 1)
  }
  while (head < tail) {
    const i = queue[head++]
    const x = i % w
    if (x > 0) seed(i - 1)
    if (x < w - 1) seed(i + 1)
    if (i >= w) seed(i - w)
    if (i < w * (h - 1)) seed(i + w)
  }

  const [cr, cg, cb] = hexToRgb(hex)
  const [lr, lg, lb] = isDarkColour(hex) ? [226, 226, 222] : [17, 17, 17]

  for (let i = 0; i < w * h; i++) {
    const o = i * 4
    if (outside[i]) {
      px[o] = px[o + 1] = px[o + 2] = 255
    } else {
      const t = lum[i] / 255
      px[o] = lr + (cr - lr) * t
      px[o + 1] = lg + (cg - lg) * t
      px[o + 2] = lb + (cb - lb) * t
    }
    px[o + 3] = 255
  }
  ctx.putImageData(data, 0, 0)
  return canvas.toDataURL('image/png')
}

/**
 * A data URL of the flat in `hex`. White returns the original file untouched.
 * Cached per image and colour — the same blank is re-tinted whenever the angle
 * flips back and forth.
 */
export function tintedFlat(src: string, hex: string): Promise<string> {
  if (hex.toLowerCase() === '#ffffff') return Promise.resolve(src)
  const key = `${src}|${hex.toLowerCase()}`
  let hit = cache.get(key)
  if (!hit) {
    hit = render(src, hex).catch(() => src)
    cache.set(key, hit)
  }
  return hit
}
