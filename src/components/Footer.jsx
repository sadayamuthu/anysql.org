import { Link } from 'react-router-dom'
import { GITHUB, PACKAGES } from '../data/packages'

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="max-w-page mx-auto px-4 sm:px-6 py-8 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-ink-muted">
        <p>
          <span className="font-serif text-ink">any<span className="text-acc">SQL</span></span> · An{' '}
          <a href="https://openastra.org" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ink">OpenAstra</a>{' '}
          framework · IV. Observability
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {PACKAGES.map((p) => (
            <Link key={p.to} to={p.to} className="hover:text-ink">{p.short}</Link>
          ))}
          <Link to="/schema" className="hover:text-ink">Schema</Link>
          <Link to="/queries" className="hover:text-ink">Queries</Link>
          <Link to="/cli" className="hover:text-ink">CLI</Link>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-ink">GitHub ↗</a>
        </div>
        <p>© {new Date().getFullYear()} · Apache 2.0</p>
      </div>
    </footer>
  )
}
