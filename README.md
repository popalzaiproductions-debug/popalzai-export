# Popalzai Clothing Production

Website for Popalzai Clothing Production — UAE-based made-to-measure uniform and
garment production.

**Live:** https://www.popalzaiproduction.com
**Instagram:** [@popalzaiproduction](https://www.instagram.com/popalzaiproduction/)

## Stack

React 19 · TypeScript · Vite 7 · React Router 6 · Tailwind (layout utilities only)

Colour, type and spacing come from CSS custom properties in `src/index.css`, not
from the Tailwind theme. Tailwind is kept purely for grid/flex/responsive
utilities, with `preflight` disabled so it doesn't fight the design tokens.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the built output
```

## Structure

```
public/
  logo.png          Popalzai wordmark, black on transparent
  logo-white.png    the same wordmark in white, for dark grounds
  og.jpg            1200×630 link-preview card
  favicon.png       the "P" mark — light browser chrome
  favicon-dark.png  the "P" mark in white — dark browser chrome
  apple-touch-icon.png
src/
  data/site.ts    ← all copy, clients, services, process, FAQ, contact details
  components/     Meta (per-route SEO), Reveal (scroll-in), SectionHead
  sections/       Hero, Manifesto, About, Services, Process, Work, FAQ, Inquiry,
                  Header, Footer
  pages/          one thin wrapper per route, each supplying <Meta>
```

### Editing content

**Almost everything lives in `src/data/site.ts`.** Client list, services, process
steps, FAQ entries, navigation, and contact details are all defined once and
consumed everywhere. Change it there and it changes sitewide.

> **Contact email** is the single `EMAIL` constant at the top of
> `src/data/site.ts` — currently `majid@popalzaiproduction.com`. It feeds the
> footer, every `mailto:` link, the inquiry page and the JSON-LD in
> `index.html`. The previous site displayed one address while linking to a
> different one, so enquiries could land in an inbox nobody was reading.

## Routes

| Path | Notes |
| --- | --- |
| `/` | Full homepage: hero, position, services, work, process, FAQ |
| `/about` | |
| `/services` | |
| `/work` | Gallery + client index |
| `/process` | |
| `/faq` | |
| `/inquiry` | The single enquiry form |
| `/contact` | → redirects to `/inquiry` |
| `/studio` | → redirects to `/about` |
| anything else | 404 page |

## Imagery

**The site carries no photography.** It is typographic throughout — black and
white, monospace, hairline rules. The only images are the wordmark and the
favicons, all derived from the original `Final.png` logo artwork.

If photography is added later, note that the previous version shipped 7.6 MB of
images that nothing referenced. Resize before committing and reference the file
from a component in the same change.

### Logo and icons

Generated from the 7000×5000 `Final.png` original (kept out of the repo; it lives
in git history on the pre-redesign commits):

- `logo.png` / `logo-white.png` — the full wordmark, trimmed to its ink bounds.
  The footer uses the white file rather than a CSS `invert()` filter.
- `favicon.png` / `favicon-dark.png` — the "P" and its underline on a transparent
  ground, swapped by `prefers-color-scheme` so the mark stays visible in both
  light and dark browser chrome. Deliberately not a filled square.

## Contact form

Posts to Formspree: `https://formspree.io/f/xvzvwgla`
Submissions: https://formspree.io/forms/xvzvwgla/submissions

The form validates inline, exposes errors via `aria-invalid`/`aria-describedby`,
and carries a `_gotcha` honeypot for spam. The endpoint is the `FORM_ENDPOINT`
constant in `src/data/site.ts`.

## Deployment

Vercel, auto-deploying from `main`.

`vercel.json` supplies the SPA rewrite — **this is required**. Without it, a hard
refresh or direct link to `/about` returns 404, because the server looks for a
file at that path instead of serving `index.html` and letting the router take
over. It also sets immutable cache headers on `/assets/*` and `/img/*`.

## Accessibility notes

Worth preserving if you edit these areas:

- The FAQ accordion uses real `<button>`s with `aria-expanded`/`aria-controls`,
  and animates `grid-template-rows: 0fr → 1fr` rather than capping `max-height` —
  a fixed cap silently clips longer answers.
- `overflow-x: hidden` is deliberately **not** set on `html`/`body`; it breaks
  `position: sticky`, which the About and Process layouts rely on. Overflow is
  contained on `#root` with `overflow-x: clip` instead.
- Every animation is gated behind `prefers-reduced-motion`.
- There's a skip link, and focus moves to the confirmation after the form sends.

---

© Popalzai Clothing Production — UAE-based production
