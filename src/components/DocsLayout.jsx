import { Eyebrow } from './ui'

export default function DocsLayout({ eyebrow = 'Docs', title, lede, toc = [], children }) {
  return (
    <article className="max-w-page mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-[13rem_1fr] gap-10">
      {toc.length > 0 && (
        <nav aria-label="On this page" className="hidden lg:block self-start sticky top-24 pt-24">
          <Eyebrow className="mb-2">On this page</Eyebrow>
          <ul className="flex flex-col gap-1.5 text-sm">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' }) }} className="font-mono text-xs text-ink-muted hover:text-acc">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="min-w-0 max-w-4xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-serif text-5xl tracking-tight mt-3">{title}</h1>
        {lede && <p className="text-lg text-ink-muted mt-4 max-w-2xl leading-relaxed">{lede}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </article>
  )
}
