import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { GITHUB, PACKAGES } from '../data/packages'

const DOCS = [
  { to: '/schema', label: 'Schema' },
  { to: '/queries', label: 'Queries' },
  { to: '/cli', label: 'CLI' },
]

const linkClass = ({ isActive }) =>
  `text-sm pb-0.5 border-b transition-colors ${isActive ? 'text-ink border-acc' : 'text-ink-muted border-transparent hover:text-ink'}`

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const listId = useId()
  const packagesActive = PACKAGES.some((p) => p.to === pathname)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!menuRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <header className="bg-paper/95 backdrop-blur sticky top-0 z-50">
      <nav className="max-w-page mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-b-2 border-ink">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <Link to="/" aria-label="anySQL" className="font-serif text-xl tracking-tight">
            any<span className="text-acc">SQL</span>
          </Link>
          <a href="https://openastra.org" target="_blank" rel="noreferrer" className="text-xs text-ink-muted hover:text-ink">
            An OpenAstra framework ↗
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <div
            className="relative"
            ref={menuRef}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && open) {
                setOpen(false)
                buttonRef.current?.focus()
              }
            }}
          >
            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((o) => !o)}
              className={`text-sm pb-0.5 border-b inline-flex items-center gap-1 transition-colors ${packagesActive ? 'text-ink border-acc' : 'text-ink-muted border-transparent hover:text-ink'}`}
            >
              Packages
              <svg aria-hidden="true" viewBox="0 0 12 12" className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-180' : ''}`}>
                <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {open && (
              <ul id={listId} className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-64 bg-card border border-rule rounded-sm shadow-sm py-1 z-50">
                {PACKAGES.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to} onClick={() => setOpen(false)} className="flex items-baseline gap-3 px-4 py-2 hover:bg-paper">
                      <span className="font-mono text-xs text-ink-muted">{String(p.number).padStart(2, '0')}</span>
                      <span className="font-mono text-sm">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {DOCS.map((d) => (
            <NavLink key={d.to} to={d.to} className={linkClass}>{d.label}</NavLink>
          ))}
          <Link to={{ pathname: '/', hash: '#cite' }} className="text-sm text-ink-muted hover:text-ink">Cite</Link>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="text-sm text-ink-muted hover:text-ink">GitHub ↗</a>
        </div>
      </nav>
    </header>
  )
}
