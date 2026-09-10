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
 * Adopt the prerendered markup where it matches what this app is about to
 * render — see scripts/prerender.mjs.
 *
 * Two shapes of document arrive with markup already in them. A route in
 * `routeMeta` is served its own file. Anything else is served dist/404.html,
 * which carries a marker: its markup is NotFound, which renders the same
 * whatever the URL, so it is safe to adopt at a path the route table has never
 * heard of.
 *
 * Anything else gets a fresh root, and the container is emptied first so a
 * stale shell cannot be left behind under the new tree.
 */
const path = window.location.pathname.replace(/(.)\/$/, '$1')
const canHydrate =
  container.hasChildNodes() &&
  (container.dataset.shell === '404' || Object.prototype.hasOwnProperty.call(routeMeta, path))

if (canHydrate) {
  hydrateRoot(container, tree)
} else {
  container.replaceChildren()
  createRoot(container).render(tree)
}
