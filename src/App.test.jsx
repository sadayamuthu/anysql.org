import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
})
