import { render, screen, fireEvent, act } from '@testing-library/react'
import Citation from './Citation'
import { citationText, bibtex } from '../data/cite'

const mockClipboard = () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  return writeText
}

describe('Citation', () => {
  const original = navigator.clipboard
  afterEach(() => Object.defineProperty(navigator, 'clipboard', { value: original, configurable: true }))

  it('formats the anySQL citation', () => {
    expect(citationText()).toBe('Sadayamuthu, K. (2026). anySQL: SQL Analytics for AI Systems (v0.1.1) [Software]. Zenodo. https://doi.org/10.5281/zenodo.23980548')
    expect(bibtex().startsWith('@software{sadayamuthu2026anysql,')).toBe(true)
  })

  it('links the DOI and copies the citation', async () => {
    const writeText = mockClipboard()
    render(<Citation />)
    expect(screen.getByRole('link', { name: 'https://doi.org/10.5281/zenodo.23980548' })).toHaveAttribute('href', 'https://doi.org/10.5281/zenodo.23980548')
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy citation for anySQL' })) })
    expect(writeText).toHaveBeenCalledWith(citationText())
  })

  it('reveals the BibTeX when the clipboard is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    render(<Citation />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy BibTeX for anySQL' })) })
    expect(screen.getByRole('textbox', { name: 'BibTeX' })).toHaveValue(bibtex())
  })
})
