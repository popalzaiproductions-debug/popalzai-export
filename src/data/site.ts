/**
 * Single source of truth for site content.
 *
 * The client list used to live in both Hero.tsx and Work.tsx, and three
 * different email addresses were scattered across Footer/Contact. Anything
 * appearing in more than one place now lives here.
 */

/* ------------------------------------------------------------------ *
 * Contact
 *
 * One address, used everywhere — footer text, mailto: links, the inquiry
 * page and the JSON-LD in index.html. The old site displayed one address
 * while linking to another; change this constant and it changes sitewide.
 * ------------------------------------------------------------------ */
export const EMAIL = 'majid@popalzaiproduction.com'
export const INSTAGRAM = 'https://www.instagram.com/popalzaiproduction/'
export const INSTAGRAM_HANDLE = '@popalzaiproduction'
export const LOCATION = 'United Arab Emirates'

/** Formspree endpoint — submissions land at formspree.io/forms/xvzvwgla/submissions */
export const FORM_ENDPOINT = 'https://formspree.io/f/xvzvwgla'

export const nav = [
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/work',     label: 'Work' },
  { to: '/process',  label: 'Process' },
  { to: '/faq',      label: 'FAQ' },
] as const

/**
 * The client index is a plain, unnumbered list — every entry renders
 * identically. Numbering it read as a ranking, which it is not.
 * The site carries no photography at all; it is typographic throughout.
 */
export type Client = {
  name: string
  sector: string
}

export const clients: Client[] = [
  { name: 'Bad Berry Club',     sector: 'Apparel' },
  { name: 'No Cap Barbershop',  sector: 'Grooming & Retail' },
  { name: '8 Studios',          sector: 'Barbershop & Creative Hub' },
  { name: 'Lostboys Studios',   sector: 'Creative Production' },
  { name: 'WIP Workinprogress', sector: 'Streetwear & Apparel' },
  { name: 'The Karak',          sector: 'Events Company' },
  { name: 'Losing Dog Company', sector: 'Apparel & Design' },
]

export const stats = [
  { value: '26', label: 'Measurements per person' },
  { value: '0',  label: 'Standard sizes used' },
  { value: '7',  label: 'Emirates served' },
  { value: '∞',  label: 'Pattern archive' },
]

/** Terms panel on the homepage. Each line restates a commitment made elsewhere on the site. */
export const specs = [
  { term: 'Minimum order',   value: 'None' },
  { term: 'Measurements',    value: '26 per person' },
  { term: 'Grading',         value: 'Never — every pattern individual' },
  { term: 'Pattern storage', value: 'Archived indefinitely' },
  { term: 'Alterations',     value: 'Free, for the life of the garment' },
  { term: 'Production',      value: 'In-house, UAE' },
  { term: 'Lead time',       value: '2–3 weeks from measurement' },
  { term: 'Coverage',        value: 'All seven emirates' },
]

export type Service = {
  num: string
  title: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    num: '01',
    title: 'Made-to-Measure Programs',
    description:
      'Complete garment programmes for new openings, brand launches, or private wardrobe builds. Individual measurement sessions, sample approvals, and full production with individual labelling.',
    features: [
      'Individual 26-point measurement',
      'Pattern drafting & indefinite storage',
      '2–6 week production',
      'No minimum order',
    ],
  },
  {
    num: '02',
    title: 'Private Client Tailoring',
    description:
      'Individual commissions for clients who require precise fit and personal oversight. From a single garment to seasonal wardrobe development.',
    features: [
      'Dedicated fitting sessions',
      'Pattern archive for life',
      'Seasonal wardrobe planning',
      'Discreet, personal service',
    ],
  },
  {
    num: '03',
    title: 'Brand Production',
    description:
      'Small-batch production for independent labels and emerging brands. Pattern development, sampling, and controlled runs with consistent quality.',
    features: [
      'Custom pattern drafting',
      'Sample prototyping',
      'Function & wear testing',
      'Brand alignment consultation',
    ],
  },
  {
    num: '04',
    title: 'New Hire & Team Onboarding',
    description:
      'We hold your pattern library for ongoing staffing needs. Two-week turnaround for additions, consistent with your existing programme.',
    features: [
      '2-week turnaround for additions',
      'Consistent with existing programme',
      'Direct delivery to property',
      'Size record maintenance',
    ],
  },
  {
    num: '05',
    title: 'Alterations & Maintenance',
    description:
      'Lifetime alterations on every garment we produce. Pattern adjustments stored indefinitely — weight changes, comfort refinements, wear-test feedback.',
    features: [
      'Free alterations for life',
      'Pattern adjustments stored',
      'Individual garment replacement',
      'Same-fabric matching',
    ],
  },
  {
    num: '06',
    title: 'Material Sourcing & Development',
    description:
      'In-house fabric library spanning technical hospitality cloths to premium shirtings. Industrial-tested and climate-appropriate for UAE conditions.',
    features: [
      'Pre-washed, shrink-tested fabrics',
      'Industrial laundry certified',
      'Climate-specific weights',
      'Stain-resistant options available',
    ],
  },
]

export type Step = {
  num: string
  title: string
  description: string
  note: string
}

export const process: Step[] = [
  {
    num: '01',
    title: 'Consultation',
    description:
      'We meet to understand your environment, your brand, or your personal requirements. A kitchen demands different durability than a concierge desk; a private client demands different discretion than a group rollout. We discuss timeline, proportion, and design direction.',
    note: '1–2 hours · No charge',
  },
  {
    num: '02',
    title: 'Measurement',
    description:
      'Individual sessions using portable fitting equipment. We record 26 measurements per person, scheduled around your service hours. Available across all seven emirates.',
    note: 'On-site or in-studio',
  },
  {
    num: '03',
    title: 'Pattern & Sampling',
    description:
      'Patterns drafted by hand in our UAE studio. For orders over 15 garments or multi-piece private commissions, we produce approval samples before full production. All patterns are digitised and archived indefinitely.',
    note: '3–6 days · Patterns archived indefinitely',
  },
  {
    num: '04',
    title: 'Production & Quality Control',
    description:
      'Single-layer cutting for grain alignment. Three-stage QC: after cutting, after construction, after pressing. Weekly progress updates throughout.',
    note: '2–3 weeks · In-house production',
  },
  {
    num: '05',
    title: 'Delivery & Fitting',
    description:
      'Individually packaged with labelling and care instructions. Optional on-site fitting session for final adjustments. Delivery across all seven emirates.',
    note: 'All emirates · Optional on-site fitting',
  },
]

export const faqs = [
  {
    q: 'What is your minimum order?',
    a: 'There is no minimum. We regularly produce single garments for individual new hires at established clients, as well as full staff complements for new openings.',
  },
  {
    q: 'How long does the process take?',
    a: 'Measurement sessions can usually be scheduled within a week. Production takes 2–3 weeks from measurement completion. Rush orders for single replacements can be accommodated in about a week.',
  },
  {
    q: 'Do you serve all of the UAE?',
    a: 'Yes. We are based in the UAE with production operated locally. We conduct on-site measurements and deliver finished garments to all seven emirates.',
  },
  {
    q: 'What happens when we hire new staff?',
    a: 'We keep every pattern archived indefinitely. New team members are measured and their garments produced to the exact specifications of your existing programme, so the look stays consistent. Turnaround for additions is two weeks.',
  },
  {
    q: 'Are alterations really included?',
    a: 'Yes. Weight fluctuations, adjustments for comfort, and refinements after wear-testing are all covered. We adjust both the pattern and the garment at no additional cost.',
  },
  {
    q: 'Why not just order from overseas?',
    a: 'Overseas manufacturing means long lead times, high minimums, and no recourse when a run comes back wrong. Local jobbing shops are quicker but inconsistent between batches. We produce locally under direct oversight, which is what lets us offer no minimums, lifetime alterations, and a pattern archive.',
  },
]

/** Project types offered in the inquiry form's select. */
export const projectTypes = [
  'Uniform programme — new opening',
  'Uniform programme — existing team',
  'Brand production / small batch',
  'Private client commission',
  'New hire additions',
  'Something else',
]
