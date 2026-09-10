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
export const SITE_DOMAIN = 'popalzaiproduction.com'
export const INSTAGRAM = 'https://www.instagram.com/popalzaiproduction/'
export const INSTAGRAM_HANDLE = '@popalzaiproduction'
export const LOCATION = 'United Arab Emirates'

/** Formspree endpoint — submissions land at formspree.io/forms/xvzvwgla/submissions */
export const FORM_ENDPOINT = 'https://formspree.io/f/xvzvwgla'

export const nav = [
  { to: '/about',    label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/on-site',  label: 'On-Site' },
  { to: '/sample-maker', label: 'Sample Maker' },
  { to: '/work',     label: 'Work' },
  { to: '/process',  label: 'Process' },
  { to: '/produce',  label: 'Produce' },
  { to: '/faq',      label: 'FAQ' },
] as const

/* ------------------------------------------------------------------ *
 * Popalzai On-Site
 *
 * A separate line of business from made-to-measure production: master
 * tailors brought into the UAE, sponsored, equipped, and placed full time
 * inside a property on a monthly subscription.
 *
 * No prices are published — the rate is quoted per engagement.
 * ------------------------------------------------------------------ */
export const ONSITE_NAME = 'Popalzai On-Site'

/** What the subscription covers. */
export const onSiteProvided = [
  {
    term: 'The tailor',
    value: 'An experienced master tailor, recruited and brought into the country for the placement.',
  },
  {
    term: 'Visa & sponsorship',
    value: 'Entry, residency and sponsorship handled end to end. You do not process paperwork.',
  },
  {
    term: 'Machinery',
    value: 'Industrial machine and the equipment needed to produce and alter on site.',
  },
  {
    term: 'Materials',
    value: 'Cloth, trims and consumables for uniform production, up to an agreed monthly allowance.',
  },
  {
    term: 'Ongoing support',
    value: 'We remain the tailor’s employer of record and manage cover, replacement and escalation.',
  },
]

/** What the property is responsible for. Deliberately short — it is the whole ask. */
export const onSiteRequired = [
  {
    term: 'A workspace',
    value: 'A room on the property for the tailor to work in, with power for the machine.',
  },
  {
    term: 'Accommodation',
    value: 'Housing for the tailor for the duration of the placement.',
  },
]

/** Day-to-day scope once the tailor is installed. */
export const onSiteScope = [
  'Uniform production on the property, to your specification',
  'Alterations and repairs as they arise, same day',
  'Fittings and measurement for new hires',
  'Maintenance of the existing uniform stock',
]

export const onSiteSteps = [
  {
    num: '01',
    title: 'Scope',
    description:
      'We look at your headcount, your uniform programme and your turnover of staff, and work out whether a resident tailor is worth it — and if so, how many.',
    note: 'No charge',
  },
  {
    num: '02',
    title: 'Matching',
    description:
      'We select a tailor against the work: hospitality shirting and tailoring are not the same skill as heavy kitchen wear or front-of-house formal. You approve the placement before we mobilise.',
    note: 'You approve before mobilisation',
  },
  {
    num: '03',
    title: 'Visa & mobilisation',
    description:
      'We handle recruitment, entry, residency and sponsorship, and ship the machine and initial materials to the property.',
    note: 'Handled entirely by us',
  },
  {
    num: '04',
    title: 'Installation',
    description:
      'The tailor is set up in the space you have provided, introduced to your team, and briefed on the uniform standard they are maintaining.',
    note: 'On your premises',
  },
  {
    num: '05',
    title: 'Running',
    description:
      'The tailor works your hours, full time, on your floor. Materials are replenished against the monthly allowance. We handle cover for leave and replacement if a placement is not working.',
    note: 'Monthly subscription',
  },
]

export const onSiteFaqs = [
  {
    q: 'Who employs the tailor?',
    a: 'We do. We sponsor the visa and remain the employer of record. The tailor works full time at your property, but payroll, sponsorship and the employment relationship sit with us.',
  },
  {
    q: 'What does the property have to provide?',
    a: 'Two things: a room for the tailor to work in with power for the machine, and accommodation for the duration of the placement. Everything else — the tailor, the visa, the machine, the materials — comes from us.',
  },
  {
    q: 'What happens if the tailor is not the right fit?',
    a: 'We replace them. Matching a tailor to a property is a judgement call and it does not always land first time; the subscription covers replacement rather than leaving you to manage it.',
  },
  {
    q: 'Is there a limit on materials?',
    a: 'Yes. The subscription includes cloth, trims and consumables up to an agreed monthly allowance, set against your expected production. Anything beyond that is quoted separately.',
  },
  {
    q: 'Can we take more than one tailor?',
    a: 'Yes. Larger properties and groups typically need more than one, and the placement is priced per tailor.',
  },
  {
    q: 'How is it priced?',
    a: 'A flat monthly subscription per tailor, covering everything listed above. The rate depends on the skill level required and the materials allowance, so it is quoted per engagement rather than published.',
  },
]

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

/* ------------------------------------------------------------------ *
 * /produce — How to produce your clothing line in the UAE
 *
 * A guide page aimed at independent brands and first-time founders.
 *
 * FOUR THINGS ARE DELIBERATELY MISSING. The source copy carried four
 * [confirm] placeholders — sample turnaround, whether "no minimums" extends
 * to brand production, the end-to-end timeline, and the position on
 * international clients and shipping. None of them are rendered, because a
 * wrong number on a page like this is worse than no number. They are listed
 * in `producePending` below; fill those in and add them back.
 * ------------------------------------------------------------------ */

/**
 * A run of copy that mixes plain text with real in-app links.
 *
 * Prose on this page links to /sample-maker and /inquiry mid-sentence, and
 * those have to be router links rather than anchors or the SPA does a full
 * page load. Storing the paragraph as segments keeps the words here in the
 * data rather than hardcoded around a <Link> in the component.
 */
export type Segment = string | { text: string; to: string }
export type Para = Segment[]

export const produceMeta = {
  title: 'How to Produce Your Clothing Line in the UAE',
  description:
    'A plain guide to producing your first clothing collection in the UAE — from concept to sample to production, and what actually affects cost and time.',
}

export const produceLead = {
  heading: 'How to produce your clothing line in the UAE',
  paragraphs: [
    'You have a design, or the beginning of one. This page explains how it becomes a real garment — what happens at each stage, what affects the cost, and where to start.',
    'It is written for independent brands and first-time founders, but the process is the same whether you need one sample or a full uniform program.',
  ],
}

export const produceSummary = {
  heading: 'The short version',
  body: 'Production happens in four stages: specification, sample, fitting, production. Everything else — fabric sourcing, grading, finishing — hangs off those four. You do not need a finished tech pack to start. You need a clear idea and one conversation.',
}

export type ProduceStage = {
  num: string
  title: string
  paragraphs: Para[]
}

export const produceStages: ProduceStage[] = [
  {
    num: '01',
    title: 'Specification',
    paragraphs: [
      [
        'A specification is the garment described precisely: the cut, the fabric, the measurements, the artwork and where it sits. This is the document production works from.',
      ],
      [
        'If you already have a tech pack, we work from that. If you don’t, the ',
        { text: 'Sample Maker', to: '/sample-maker' },
        ' exists for exactly this: pick a garment, place your artwork on it, and it produces a written spec with real dimensions in centimetres. That spec is enough to open a conversation.',
      ],
    ],
  },
  {
    num: '02',
    title: 'Sample',
    paragraphs: [
      [
        'The sample is the first physical garment. It exists to answer questions a drawing can’t: how the fabric falls, whether the proportions work, how the print or embroidery sits on cloth.',
      ],
      [
        'Expect the sample to be imperfect. That is its job. A sample that comes back with three things to change is a successful sample — those three things would otherwise have been wrong across the whole run.',
      ],
    ],
  },
  {
    num: '03',
    title: 'Fitting and revision',
    paragraphs: [
      [
        'You wear it, or your fit model does. We measure what needs to move and revise. Because everything is made to measure rather than cut to standard sizes, this stage is where the garment becomes yours: the block is adjusted to real bodies, not a size chart.',
      ],
      [
        'One round of revision is normal. Two happens. More than that usually means the spec, not the sewing, needs another look — and we’ll say so.',
      ],
    ],
  },
  {
    num: '04',
    title: 'Production',
    paragraphs: [
      [
        'Once the sample is approved, production is repetition with discipline: the same garment, made to the same standard, at quantity.',
      ],
    ],
  },
]

export const produceCost = {
  heading: 'What actually affects the cost',
  intro:
    'No two garments price the same, which is why nothing on this site carries a price. But the levers are consistent:',
  body: 'Fabric is usually the largest single variable — both the cloth itself and how much of it the cut consumes. Construction complexity is second: a lined blazer is a different job from a t-shirt. Decoration — embroidery, print, appliqué — prices by size and technique. Quantity matters less than people expect at small runs and more at large ones.',
  close: [
    'The honest answer to “what will it cost” is a quote against your spec, which is free and does not commit you to anything. ',
    { text: 'Start with the Sample Maker', to: '/sample-maker' },
    ' or ',
    { text: 'send an inquiry', to: '/inquiry' },
    '.',
  ] as Para,
}

export const produceTiming = {
  heading: 'How long it takes',
  paragraphs: [
    'The slowest stage is almost always waiting on decisions, not sewing. A client who reviews the sample the week it’s ready moves twice as fast as one who doesn’t.',
  ],
}

export const produceFaqs = [
  {
    q: 'Do I need a tech pack to start?',
    a: 'No. A tech pack helps, but a clear description and reference images are enough. The Sample Maker produces a workable spec from a garment choice and your artwork.',
  },
  {
    q: 'Can you produce just one piece?',
    a: 'Yes. Made-to-measure is the core of what we do — single garments, small runs, and full programs are all normal work here.',
  },
  {
    q: 'Who owns my design?',
    a: 'You do. Your artwork, your spec, your garment. We produce it; we don’t resell it.',
  },
]

export const produceClose = {
  heading: 'Ready when you are',
  links: [
    { text: 'Sample Maker', to: '/sample-maker' },
    { text: 'Inquiry', to: '/inquiry' },
  ],
}

/**
 * Awaiting real numbers from Majid. Not rendered anywhere — this is a to-do
 * list in the data, so it travels with the copy instead of living in a commit
 * message nobody reads again.
 */
export const producePending = [
  {
    where: 'Stage 02 — Sample',
    question: 'Typical sample turnaround from an approved spec.',
  },
  {
    where: 'Stage 04 — Production',
    question:
      'Does "no minimums" apply to brand production, or only to made-to-measure? The sitewide FAQ states no minimum; the source copy queried whether that holds for brand runs, so the claim is off this page until confirmed.',
  },
  {
    where: 'How long it takes',
    question: 'End-to-end range from approved spec to delivered production run.',
  },
  {
    where: 'Frequently asked',
    question:
      'Position on clients outside the UAE, and shipping. The whole Q&A is omitted until this is settled.',
  },
]

/** Project types offered in the inquiry form's select. */
export const projectTypes = [
  'On-site tailor placement (Popalzai On-Site)',
  'Uniform programme — new opening',
  'Uniform programme — existing team',
  'Brand production / small batch',
  'Private client commission',
  'New hire additions',
  'Something else',
]
