import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  it('names the family, category and license', () => {
    render(<MemoryRouter><Footer /></MemoryRouter>)
    expect(screen.getByText(/framework · IV\. Observability/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'OpenAstra' })).toHaveAttribute('href', 'https://openastra.org')
    expect(screen.getByText(/Apache 2\.0/)).toBeInTheDocument()
  })
})
