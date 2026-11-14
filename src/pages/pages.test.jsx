import { render, screen, fireEvent, act, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sdk from './Sdk'
import Proxy from './Proxy'
import Server from './Server'
import Ui from './Ui'
import Schema from './Schema'
import Queries from './Queries'
import Cli from './Cli'

const r = (C) => render(<MemoryRouter><C /></MemoryRouter>)

describe('package pages', () => {
  it.each([
    [Sdk, 'anysql-sdk', /available/],
    [Proxy, 'anysql-proxy', /available/],
    [Server, 'anysql-server', /coming soon/],
    [Ui, 'anysql-ui', /coming soon/],
  ])('%#: renders the package name and status', (C, name, status) => {
    r(C)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(name)
    expect(screen.getAllByText(status).length).toBeGreaterThan(0)
  })

  it('shows a breadcrumb back to the packages list', () => {
    r(Proxy)
    expect(screen.getByRole('link', { name: 'Packages' })).toHaveAttribute('href', '/#packages')
  })

  it('links to the other packages', () => {
    r(Proxy)
    const other = within(screen.getByRole('navigation', { name: 'Other packages' }))
    expect(other.getByRole('link', { name: /anysql-sdk/ })).toHaveAttribute('href', '/sdk')
    expect(other.queryByRole('link', { name: /anysql-proxy/ })).toBeNull()
  })

  it('uses the documented adapter API on the SDK page', () => {
    const { container } = r(Sdk)
    expect(container.textContent).toContain('anysql.openai(db).wrap(')
    expect(container.textContent).toContain('anysql.claude(db).wrap(')
    expect(container.textContent).not.toMatch(/anysql\.(openai|claude)\((openai|anthropic)\./)
  })

  it('keeps the proxy CLI reference and IDE setup', () => {
    r(Proxy)
    expect(screen.getByText('anysql-proxy setup claude-code')).toBeInTheDocument()
    expect(screen.getByText('Cursor')).toBeInTheDocument()
  })
})

describe('docs pages', () => {
  it('Schema lists all six tables with a table of contents', () => {
    r(Schema)
    const toc = within(screen.getByRole('navigation', { name: 'On this page' }))
    ;['llm.responses', 'eval.results', 'pipeline.runs', 'agent.tool_calls', 'agent.trace', 'rag.chunks'].forEach((t) => {
      expect(screen.getByRole('heading', { name: t })).toBeInTheDocument()
      expect(toc.getByRole('link', { name: t })).toHaveAttribute('href', `#${t.replace(/[._]/g, '-')}`)
    })
  })

  it('Schema anchors replace every dot and underscore', () => {
    r(Schema)
    expect(document.getElementById('agent-tool-calls')).not.toBeNull()
  })

  it('Queries has a Copy button per query that copies the SQL', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    const { container } = r(Queries)
    const buttons = screen.getAllByRole('button', { name: /^Copy SQL:/ })
    expect(buttons.length).toBe(container.querySelectorAll('pre').length)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy SQL: Average cost by model' })) })
    expect(writeText.mock.calls[0][0]).toMatch(/^SELECT model,/)
  })

  it('Queries has a table of contents for the five use cases', () => {
    r(Queries)
    const toc = within(screen.getByRole('navigation', { name: 'On this page' }))
    expect(toc.getAllByRole('link')).toHaveLength(5)
  })

  it('CLI documents query and stats', () => {
    r(Cli)
    expect(screen.getByRole('heading', { name: 'anysql query' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'anysql stats' })).toBeInTheDocument()
  })
})
