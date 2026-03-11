import { Link, useLocation } from 'react-router-dom'

const DOC_LINKS = [
  { label: 'Schema',  to: '/schema' },
  { label: 'Queries', to: '/queries' },
  { label: 'CLI',     to: '/cli' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const docsActive = ['/schema', '/queries', '/cli'].includes(pathname)

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-subtle">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-text-primary hover:text-accent-cyan transition-colors duration-200">
          anySQL
        </Link>
        <div className="flex items-center gap-8">
          {[
            { label: 'SDK',    to: '/sdk' },
            { label: 'Proxy',  to: '/proxy' },
            { label: 'Server', to: '/server' },
            { label: 'UI',     to: '/ui' },
          ].map(({ label, to }) => (
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

          {/* Docs dropdown */}
          <div className="relative group">
            <button
              aria-label="Documentation"
              aria-haspopup="true"
              className={`text-sm transition-colors duration-200 flex items-center gap-1 ${
                docsActive ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Docs
              <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-surface border border-subtle rounded-lg py-1 min-w-[120px] shadow-lg">
                {DOC_LINKS.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                      pathname === to ? 'text-accent-cyan' : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://github.com/sadayamuthu/anysql"
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
