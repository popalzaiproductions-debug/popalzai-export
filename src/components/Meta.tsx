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

type Props = {
  /** Route path. Its title and description come from `routeMeta`. */
  path?: string
  /** Override, for pages that are not a routed path — the 404, say. */
  title?: string
  description?: string
}

/**
 * Keeps <title>, description and canonical correct as the router moves between
 * pages.
 *
 * `scripts/prerender.mjs` writes the same values into a real HTML file per
 * route at build time, so a crawler sees them without running any JavaScript.
 * This component is what keeps them right afterwards, during client-side
 * navigation, when no new document is ever fetched.
 */
export default function Meta({ path, title, description }: Props) {
  const entry = path ? routeMeta[path] : undefined
  const resolvedTitle = title ?? entry?.title ?? SITE
  const resolvedDescription = description ?? entry?.description ?? ''

  useEffect(() => {
    const full = entry ? titleFor(entry) : fullTitle(resolvedTitle)
    document.title = full

    setMeta('meta[name="description"]', 'name', 'description', resolvedDescription)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', resolvedDescription)

    const url = ORIGIN + (path ?? window.location.pathname)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [resolvedTitle, resolvedDescription, path])

  return null
}
