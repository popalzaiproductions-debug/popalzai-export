/**
 * Sections double as homepage blocks and as standalone pages.
 * As a block the lead heading must be an <h2>; as a page it must be the <h1>.
 */
export type HeadingLevel = 1 | 2

export const leadTag = (level: HeadingLevel = 2) => (level === 1 ? 'h1' : 'h2') as 'h1' | 'h2'
