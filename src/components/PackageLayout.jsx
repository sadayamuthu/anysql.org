import { Link } from 'react-router-dom'
import { Eyebrow, Status } from './ui'
import { PACKAGES, getPackage } from '../data/packages'

export default function PackageLayout({ to, lede, note, children }) {
  const pkg = getPackage(to)
  const others = PACKAGES.filter((p) => p.to !== to)
  return (
    <article className="max-w-page mx-auto px-4 sm:px-6 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
        <Link to={{ pathname: '/', hash: '#packages' }} className="hover:text-ink">Packages</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink font-mono">{pkg.name}</span>
      </nav>
      <header className="py-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <Eyebrow>{String(pkg.number).padStart(2, '0')} · Package</Eyebrow>
          <Status status={pkg.status} />
        </div>
        <h1 className="font-mono text-4xl sm:text-5xl tracking-tight mt-4 break-words">{pkg.name}</h1>
        <p className="font-serif text-xl sm:text-2xl leading-snug mt-4">{lede}</p>
        {note && (
          <p className="mt-6 border border-dashed border-ink/30 rounded-sm px-4 py-3 text-sm text-ink-muted">{note}</p>
        )}
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16rem] gap-10">
        <div className="min-w-0 max-w-3xl">{children}</div>
        <nav aria-label="Other packages" className="self-start lg:sticky lg:top-24 border-t lg:border-t-0 border-rule pt-6 lg:pt-8">
          <Eyebrow className="mb-2">Other packages</Eyebrow>
          <ul>
            {others.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="flex items-baseline justify-between gap-3 py-2 border-b border-rule hover:text-acc">
                  <span className="font-mono text-sm">{p.name}</span>
                  <span className="text-[11px] text-ink-muted">{p.status.startsWith('available') ? 'available' : 'soon'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  )
}
