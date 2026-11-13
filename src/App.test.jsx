import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Link } from 'react-router-dom'
import { AppRoutes } from './App'

const renderAt = (path) => render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>)

describe('routes', () => {
  it.each([
    ['/sdk', 'anysql-sdk'],
    ['/proxy', 'anysql-proxy'],
    ['/server', 'anysql-server'],
    ['/ui', 'anysql-ui'],
    ['/schema', 'Schema'],
    ['/queries', 'Query Library'],
    ['/cli', 'CLI Reference'],
  ])('%s renders %s', (path, h1) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(h1)
  })

  it('renders Home for unknown routes', () => {
    renderAt('/nope')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('SQL analytics for AI systems')
  })

  it('scrolls to top again when the current page link is clicked', () => {
    render(<MemoryRouter initialEntries={['/sdk']}><Link to="/sdk">again</Link><AppRoutes /></MemoryRouter>)
    window.scrollTo.mockClear?.()
    const spy = vi.spyOn(window, 'scrollTo')
    fireEvent.click(screen.getByRole('link', { name: 'again' }))
    expect(spy).toHaveBeenCalledWith(0, 0)
  })
})
