import { useEffect } from 'react'

const SITE = 'Popalzai Clothing Production'
const ORIGIN = 'https://www.popalzaiproduction.com'

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
  title: string
  description: string
  /** Path for the canonical URL, e.g. "/about". Defaults to the current path. */
  path?: string
}

/**
 * Per-route <title>, description and canonical.
 *
 * A Vite SPA serves one index.html for every route, so without this every page
 * shares the homepage's title and description in search results and link previews.
 */
export default function Meta({ title, description, path }: Props) {
  useEffect(() => {
    const full = title === SITE ? title : `${title} — ${SITE}`
    document.title = full

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', full)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)

    const url = ORIGIN + (path ?? window.location.pathname)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path])

  return null
}
