import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

const renderHome = () => render(<MemoryRouter><Home /></MemoryRouter>)
const section = (container, id) => within(container.querySelector(`#${id}`))

describe('Home', () => {
  it('leads with the research-lab headline', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SQL analytics for AI systems.')
  })

  it('lists the four packages with their status, each linking to its page', () => {
    const { container } = renderHome()
    const pk = section(container, 'packages')
    ;[['anysql-sdk', '/sdk'], ['anysql-proxy', '/proxy'], ['anysql-server', '/server'], ['anysql-ui', '/ui']].forEach(([name, to]) =>
      expect(pk.getByRole('link', { name: new RegExp(name) })).toHaveAttribute('href', to)
    )
    expect(pk.getAllByText(/available/)).toHaveLength(2)
    expect(pk.getAllByText('coming soon')).toHaveLength(2)
  })

  it('keeps the cross-layer JOIN and the three reasons', () => {
    renderHome()
    expect(screen.getByText(/The cross-layer JOIN nobody has built/)).toBeInTheDocument()
    ;['SQL over AI telemetry', 'Zero configuration', 'Cross-layer JOINs'].forEach((t) => expect(screen.getByText(t)).toBeInTheDocument())
  })

  it('shows all five use cases', () => {
    const { container } = renderHome()
    const uc = section(container, 'use-cases')
    ;['UC1', 'UC2', 'UC3', 'UC4', 'UC5'].forEach((id) => expect(uc.getByText(id)).toBeInTheDocument())
  })

  it('uses the documented adapter API in the quick start', () => {
    const { container } = renderHome()
    expect(container.querySelector('#quick-start').textContent).toContain('anysql.claude(db).wrap(')
    expect(container.textContent).not.toMatch(/anysql\.(openai|claude)\((openai|anthropic)\./)
  })

  it('offers the citation with its DOI', () => {
    const { container } = renderHome()
    expect(section(container, 'cite').getByRole('link', { name: 'https://doi.org/10.5281/zenodo.23980548' })).toBeInTheDocument()
  })

  it('links to GitHub', () => {
    renderHome()
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute('href', 'https://github.com/sadayamuthu/anySQL')
  })
})
