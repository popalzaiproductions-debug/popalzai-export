/**
 * Writes a real HTML file per route into dist/.
 *
 * Why this exists: the site is a Vite SPA, so every route was served the same
 * index.html. That shell carries the homepage's <title>, the homepage's
 * description, and a canonical link pointing at "/" — and the correct values
 * were only swapped in after React ran. Google renders JavaScript eventually,
 * but a canonical saying "this page is really the homepage" is exactly the
 * signal that stops a page being indexed on its own, and Bing, link previews
 * and the AI crawlers robots.txt invites do not run JavaScript at all.
 *
 * Each generated file carries that route's real head tags and its markup. The
 * markup is the app's initial state, matching what the client renders first,
 * so main.tsx hydrates it instead of discarding it.
 *
 * Run as part of `npm run build` — see package.json. Needs `vite build` and
 * `vite build --ssr` to have run first.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js')

if (!existsSync(ssrEntry)) {
  console.error('prerender: missing %s — run `vite build --ssr` first', ssrEntry)
  process.exit(1)
}

const { render, routeMeta, titleFor, ORIGIN } = await import(pathToFileURL(ssrEntry).href)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

/** Escape for use inside a double-quoted HTML attribute. */
const attr = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

let written = 0
for (const [path, entry] of Object.entries(routeMeta)) {
  const title = titleFor(entry)
  const url = ORIGIN + (path === '/' ? '/' : path)

  let html = template

  // Replace, rather than append — the shell already carries the homepage's
  // copies of all of these, and two <title>s is worse than a stale one.
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = html.replace(
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${attr(entry.description)}" />`,
  )
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${attr(url)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:title"[^>]*>/,
    `<meta property="og:title" content="${attr(title)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:description"[^>]*>/,
    `<meta property="og:description" content="${attr(entry.description)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:url"[^>]*>/,
    `<meta property="og:url" content="${attr(url)}" />`,
  )

  let body = ''
  try {
    body = render(path)
  } catch (err) {
    // A route that will not render server-side still gets correct head tags,
    // which is the part that actually decides whether it is indexed.
    console.warn('prerender: %s rendered head only — %s', path, err.message)
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  const out = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
  written++
  console.log('  %s  %s', path.padEnd(15), body ? `${(body.length / 1024).toFixed(1)}kB markup` : 'head only')
}

// The SSR bundle is a build artefact, not something to deploy.
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true })

console.log('prerender: %d routes written', written)
