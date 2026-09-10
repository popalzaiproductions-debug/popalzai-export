import { useEffect } from 'react'
import { routeMeta, titleFor, fullTitle, SITE, ORIGIN } from '../data/meta'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(selector: string) {
  document.head.querySelector(selector)?.remove()
}

type Props = {
  /** Route path. Its title and description come from `routeMeta`. */
  path?: string
  /** Override, for pages that are not a routed path — the 404, say. */
  title?: string
  description?: string
  /**
   * Keep this page out of the index, and stop it claiming a canonical URL.
   * The 404 is served at every mistyped address there is; a canonical would
   * hand one of those a real URL to be indexed under.
   */
  noindex?: boolean
}

/**
 * Keeps <title>, description, canonical and robots correct as the router moves
 * between pages.
 *
 * `scripts/prerender.mjs` writes the same values into a real HTML file per
 * route at build time, so a crawler sees them without running any JavaScript.
 * This component is what keeps them right afterwards, during client-side
 * navigation, when no new document is ever fetched.
 *
 * That means it has to clear what a previous page set, not only set its own.
 * The 404 ships with a noindex tag in its HTML; without the removal below,
 * clicking out of the 404 carried that tag onto the real page.
 */
export default function Meta({ path, title, description, noindex = false }: Props) {
  const entry = path ? routeMeta[path] : undefined
  const resolvedTitle = title ?? entry?.title ?? SITE
  const resolvedDescription = description ?? entry?.description ?? ''

  useEffect(() => {
    const full = entry ? titleFor(entry) : fullTitle(resolvedTitle)
    document.title = full

    setMeta('meta[name="description"]', 'name', 'description', resolvedDescription)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', resolvedDescription)

    if (noindex) {
      setMeta('meta[name="robots"]', 'name', 'robots', 'noindex')
      removeMeta('link[rel="canonical"]')
      removeMeta('meta[property="og:url"]')
      return
    }

    removeMeta('meta[name="robots"]')

    const url = ORIGIN + (path ?? window.location.pathname)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [resolvedTitle, resolvedDescription, path, noindex, entry])

  return null
}
