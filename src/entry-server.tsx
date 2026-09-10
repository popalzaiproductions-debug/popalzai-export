import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

// Re-exported so the prerender script gets the route table from the same
// bundle it gets the renderer from, rather than a second one.
export { routeMeta, titleFor, ORIGIN } from './data/meta'

/**
 * Build-time render, used only by scripts/prerender.mjs.
 *
 * Nothing here runs in the browser. Every component reaches the DOM through
 * effects, which do not fire during renderToString, so the markup this
 * produces is the app's initial state — the same state the client starts in,
 * which is what lets main.tsx hydrate it rather than throw it away.
 */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
