import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Docs',    to: '/docs' },
  { label: 'Queries', to: '/queries' },
  { label: 'Schema',  to: '/schema' },
  { label: 'CLI',     to: '/cli' },
]

export default function Footer() {
  return (
    <footer className="border-t border-subtle bg-surface mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} · anySQL is Apache 2.0 ·{' '}
          <a
            href="https://openastra.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-cyan transition-colors duration-200"
          >
            by OpenAstra
          </a>
        </p>
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-sm text-text-muted hover:text-accent-cyan transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/anysql/anysql"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted hover:text-accent-cyan transition-colors duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
