import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Research from './Research'
import { PAPERS, paperBibtex } from '../data/research'

const r = () => render(<MemoryRouter><Research /></MemoryRouter>)

describe('Research page', () => {
  it('lists each paper with its venue and status', () => {
    r()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Research')
    PAPERS.forEach((p) => {
      expect(screen.getByRole('heading', { level: 2, name: p.title })).toBeInTheDocument()
      expect(screen.getByText(p.venue)).toBeInTheDocument()
      expect(screen.getByText(p.status)).toBeInTheDocument()
    })
  })

  it('links the artefact repository and the anySQL commit', () => {
    r()
    expect(screen.getByRole('link', { name: /Artefacts on GitHub/ })).toHaveAttribute('href', 'https://github.com/sadayamuthu/untraced-by-design')
    expect(screen.getByRole('link', { name: /anySQL commit fe92f1a/ })).toHaveAttribute('href', expect.stringMatching(/\/commit\/fe92f1a$/))
  })

  it('gives a BibTeX entry with a Copy button', () => {
    r()
    expect(screen.getByRole('button', { name: /^Copy BibTeX: Untraced by Design/ })).toBeInTheDocument()
    expect(paperBibtex(PAPERS[0])).toMatch(/^@inproceedings\{sadayamuthu2026untraced,/)
  })
})
