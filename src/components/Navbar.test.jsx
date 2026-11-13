import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNav = (path = '/') => render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>)

describe('Navbar', () => {
  it('links the wordmark home and the family site', () => {
    renderNav()
    expect(screen.getByRole('link', { name: 'anySQL' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /An OpenAstra framework/ })).toHaveAttribute('href', 'https://openastra.org')
  })

  it('opens the Packages menu with a button, not hover only', () => {
    renderNav()
    const btn = screen.getByRole('button', { name: /Packages/ })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: /anysql-sdk/ })).toBeNull()
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /anysql-sdk/ })).toHaveAttribute('href', '/sdk')
    expect(screen.getByRole('link', { name: /anysql-proxy/ })).toHaveAttribute('href', '/proxy')
    expect(screen.getByRole('link', { name: /anysql-server/ })).toHaveAttribute('href', '/server')
    expect(screen.getByRole('link', { name: /anysql-ui/ })).toHaveAttribute('href', '/ui')
  })

  it('closes the Packages menu on Escape', () => {
    renderNav()
    const btn = screen.getByRole('button', { name: /Packages/ })
    fireEvent.click(btn)
    fireEvent.keyDown(btn, { key: 'Escape' })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('has docs, cite and GitHub links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: 'Schema' })).toHaveAttribute('href', '/schema')
    expect(screen.getByRole('link', { name: 'Queries' })).toHaveAttribute('href', '/queries')
    expect(screen.getByRole('link', { name: 'CLI' })).toHaveAttribute('href', '/cli')
    expect(screen.getByRole('link', { name: 'Cite' })).toHaveAttribute('href', '/#cite')
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', 'https://github.com/sadayamuthu/anySQL')
  })

  it('marks Packages active on a package page', () => {
    renderNav('/proxy')
    expect(screen.getByRole('button', { name: /Packages/ }).className).toMatch(/border-acc/)
  })
})
