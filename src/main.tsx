import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { routeMeta } from './data/meta'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Adopt the prerendered markup where there is any to adopt.
 *
 * Routes in `routeMeta` ship as their own HTML file (see scripts/prerender.mjs)
 * whose markup matches this app's initial state, so hydrating is both correct
 * and avoids the repaint a fresh render would cause.
 *
 * Any other URL falls through Vercel's rewrite to the shell — which is the
 * homepage's file, markup and all. Hydrating a 404 against homepage markup is
 * a guaranteed mismatch, so those get a fresh root instead. Checking the path
 * rather than just `hasChildNodes()` is what separates the two cases.
 */
const isPrerendered = Object.prototype.hasOwnProperty.call(
  routeMeta,
  window.location.pathname.replace(/(.)\/$/, '$1'),
)

if (isPrerendered && container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  container.replaceChildren()
  createRoot(container).render(tree)
}
