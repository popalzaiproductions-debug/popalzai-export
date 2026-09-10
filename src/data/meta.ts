import { produceMeta } from './site'

/**
 * Per-route title and description.
 *
 * These live here rather than inline in each page wrapper because two things
 * need them: the <Meta> component at runtime, and scripts/prerender.mjs at
 * build time, which bakes them into a real HTML file per route. Google was
 * being served the homepage's title, description and — worse — a canonical
 * pointing at "/" for every route, because those tags only existed after
 * React ran.
 *
 * Keep every routed path in here. A path missing from this table gets no
 * prerendered HTML file and falls back to the SPA shell, which is the bug
 * this table exists to prevent.
 */

export const SITE = 'Popalzai Clothing Production'
export const ORIGIN = 'https://www.popalzaiproduction.com'

export type RouteMeta = {
  title: string
  description: string
  /**
   * The complete <title>, when it should not simply be `title — SITE`. The
   * homepage's is the one Google has already indexed, so it keeps its
   * keyword tail rather than collapsing to the bare brand name.
   */
  titleTag?: string
}

export const routeMeta: Record<string, RouteMeta> = {
  '/': {
    title: SITE,
    titleTag: 'Popalzai Clothing Production | Made-to-Measure Uniforms UAE',
    description:
      'Made-to-measure uniforms and garments for hospitality groups, independent brands, and private clients. UAE-based production, no standard sizes, no minimums.',
  },
  '/about': {
    title: 'About',
    description:
      'Popalzai is a UAE production house drafting individual patterns for hospitality groups, independent brands, and private clients — no grading, no outsourcing.',
  },
  '/services': {
    title: 'Services',
    description:
      'Made-to-measure programmes, private client tailoring, brand production, new hire onboarding, lifetime alterations, and material sourcing — UAE-based, no minimum order.',
  },
  '/on-site': {
    title: 'Popalzai On-Site',
    description:
      'Rent a master tailor by the month. We bring the tailor into the UAE, handle the visa, supply the machine and materials, and place them full time inside your hotel for uniform production and same-day alterations.',
  },
  '/sample-maker': {
    title: 'Sample maker',
    description:
      'Pick a garment, upload your artwork, size and place it, and send us the specification. Print or stitched name — t-shirts, tanks, long sleeves, polos, shirts, hoodies and caps, front and back.',
  },
  '/work': {
    title: 'Work',
    description:
      'Recent made-to-measure production for barbershops, concept stores, and independent labels across the UAE — including 8 Studios and No Cap Barbershop.',
  },
  '/process': {
    title: 'Process',
    description:
      'Five steps from consultation to delivery: 26-point measurement, hand-drafted patterns, approval sampling, three-stage quality control, and on-site fitting across all seven emirates.',
  },
  '/produce': {
    title: produceMeta.title,
    description: produceMeta.description,
  },
  '/faq': {
    title: 'FAQ',
    description:
      'Minimum order, turnaround times, emirate coverage, adding new hires to an existing programme, and what lifetime alterations actually cover.',
  },
  '/inquiry': {
    title: 'Start a project',
    description:
      'Tell us about your team, timeline, and requirements. We reply within 24 hours to schedule a consultation anywhere in the UAE.',
  },
}

/** The complete <title> for a route. */
export const titleFor = (m: RouteMeta) =>
  m.titleTag ?? (m.title === SITE ? m.title : `${m.title} — ${SITE}`)

/** The complete <title> for a bare title, used by pages outside the table. */
export const fullTitle = (title: string) => (title === SITE ? title : `${title} — ${SITE}`)
