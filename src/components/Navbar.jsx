import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Docs',    to: '/docs' },
  { label: 'Queries', to: '/queries' },
  { label: 'Schema',  to: '/schema' },
  { label: 'CLI',     to: '/cli' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-text-primary hover:text-accent-cyan transition-colors duration-200">
          <span className="text-accent-cyan" aria-hidden="true">⚡</span> anySQL
        </Link>
        <div className="flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm transition-colors duration-200 ${
                pathname === to ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/anysql/anysql"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            aria-label="GitHub repository"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
