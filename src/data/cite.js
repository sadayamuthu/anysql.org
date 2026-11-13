export const CITE = {
  name: 'anySQL',
  key: 'anysql',
  title: 'anySQL: SQL Analytics for AI Systems',
  version: '0.1.1',
  year: 2026,
  doi: '10.5281/zenodo.23980548',
}

export const AUTHOR = 'Sadayamuthu, K.'
export const doiUrl = (doi = CITE.doi) => `https://doi.org/${doi}`
export const zenodoUrl = (doi = CITE.doi) => `https://zenodo.org/doi/${doi}`
export const versionLabel = (v = CITE.version) => (/^\d/.test(v) ? `v${v}` : v)

export function citationText(c = CITE) {
  return `${AUTHOR} (${c.year}). ${c.title} (${versionLabel(c.version)}) [Software]. Zenodo. ${doiUrl(c.doi)}`
}

export function bibtex(c = CITE) {
  return [
    `@software{sadayamuthu${c.year}${c.key},`,
    `  author = {Sadayamuthu, Karthikeyan},`,
    `  title = {${c.title}},`,
    `  year = {${c.year}},`,
    `  version = {${c.version}},`,
    `  publisher = {Zenodo},`,
    `  doi = {${c.doi}},`,
    `  url = {${doiUrl(c.doi)}}`,
    `}`,
  ].join('\n')
}
