import { render, screen, fireEvent, act } from '@testing-library/react'
import { CopyButton, CodeBlock } from './ui'

describe('CopyButton', () => {
  const original = navigator.clipboard
  afterEach(() => Object.defineProperty(navigator, 'clipboard', { value: original, configurable: true }))

  it('copies its text and confirms', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    render(<CopyButton text="SELECT 1" label="Copy query" />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy query' })) })
    expect(writeText).toHaveBeenCalledWith('SELECT 1')
    expect(screen.getByRole('button', { name: 'Copy query' })).toHaveTextContent('Copied')
  })

  it('does not throw without a clipboard', async () => {
    Object.defineProperty(navigator, 'clipboard', { value: undefined, configurable: true })
    render(<CopyButton text="SELECT 1" label="Copy query" />)
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Copy query' })) })
    expect(screen.getByRole('button', { name: 'Copy query' })).toHaveTextContent('Select & copy')
  })
})

describe('CodeBlock', () => {
  it('renders code verbatim', () => {
    render(<CodeBlock code={'pip install anysql-sdk'} />)
    expect(screen.getByText('pip install anysql-sdk')).toBeInTheDocument()
  })
})

describe('inline code', () => {
  it('pages use the shared InlineCode style instead of copies of its classes', async () => {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const dir = path.resolve(__dirname, '../pages')
    const offenders = fs.readdirSync(dir)
      .filter((f) => f.endsWith('.jsx') && !f.includes('.test.'))
      .filter((f) => fs.readFileSync(path.join(dir, f), 'utf8').includes('px-1 py-0.5 rounded-sm bg-card border border-rule'))
    expect(offenders).toEqual([])
  })
})
