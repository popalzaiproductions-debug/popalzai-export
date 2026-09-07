/**
 * Studio unlock — lets Popalzai export a sample sheet without the watermark.
 *
 * Unlock by loading the sample maker with the key in the URL:
 *
 *     /sample-maker?studio=<key>
 *
 * It is then remembered in this browser, so the parameter is only needed once
 * per device. `?studio=off` clears it.
 *
 * ---------------------------------------------------------------------------
 * WHAT THIS IS AND IS NOT
 *
 * This is a deterrent, not access control. The site is a static bundle on a
 * CDN — there is no server to ask, so every check runs on the customer's own
 * machine, and anyone willing to edit the JavaScript can skip it. They could
 * equally well delete the watermark from the exported PNG. The point is that
 * it stops the sheet being casually reusable as a clean technical drawing.
 *
 * What it does do properly is keep the key out of the repository and out of
 * the shipped bundle: only the SHA-256 of the key is stored, and the hash is
 * not reversible. Nobody reading the source or the built JS learns the key.
 *
 * To change the key, hash the new one and replace the constant below:
 *
 *     node -e "console.log(require('crypto').createHash('sha256').update('NEW-KEY').digest('hex'))"
 * ---------------------------------------------------------------------------
 */

const KEY_SHA256 = 'b95c4c5a624ac7dd1586f261e892e25b543b475916900614c0fec3893e172592'
const STORE = 'popalzai.studio'

async function sha256Hex(input: string): Promise<string | null> {
  // Web Crypto is unavailable over plain http on some hosts, and in a few
  // embedded browsers. No hash, no unlock — the watermark stays.
  if (!globalThis.crypto?.subtle) return null
  const bytes = new TextEncoder().encode(input)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function read(): boolean {
  try {
    return localStorage.getItem(STORE) === '1'
  } catch {
    // private windows and blocked site data throw rather than return null
    return false
  }
}

function write(on: boolean) {
  try {
    if (on) localStorage.setItem(STORE, '1')
    else localStorage.removeItem(STORE)
  } catch {
    /* nothing to do — it just will not persist */
  }
}

/**
 * Resolves to true when this browser is unlocked. Consumes `?studio=` from the
 * URL if present, then strips it so the key does not sit in the address bar to
 * be screenshotted or pasted into a chat along with the link.
 */
export async function resolveStudio(): Promise<boolean> {
  let unlocked = read()

  const params = new URLSearchParams(window.location.search)
  const supplied = params.get('studio')

  if (supplied !== null) {
    if (supplied === 'off') {
      unlocked = false
      write(false)
    } else if ((await sha256Hex(supplied)) === KEY_SHA256) {
      unlocked = true
      write(true)
    }

    params.delete('studio')
    const qs = params.toString()
    window.history.replaceState(
      null,
      '',
      window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash,
    )
  }

  return unlocked
}

export function lockStudio() {
  write(false)
}
