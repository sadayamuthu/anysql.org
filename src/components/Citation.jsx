import { useEffect, useRef, useState } from 'react'
import { AUTHOR, CITE, bibtex, citationText, doiUrl, versionLabel, zenodoUrl } from '../data/cite'

async function copy(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // insecure context or permission denied: fall back below
  }
  return false
}

function CopyButton({ label, text, onFail, onCopied, children }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])

  const onClick = async () => {
    if (!(await copy(text))) return onFail(text)
    setCopied(true)
    onCopied()
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="px-3 py-1 rounded-sm border border-ink/30 text-xs hover:border-ink transition-colors"
    >
      {copied ? 'Copied' : children}
    </button>
  )
}

function Fallback({ label, text }) {
  const ref = useRef()
  useEffect(() => {
    ref.current?.focus()
    ref.current?.select()
  }, [text])
  return (
    <label className="flex flex-col gap-1 text-xs text-ink-muted">
      <span>{label} · press ⌘C / Ctrl+C to copy</span>
      <textarea
        ref={ref}
        readOnly
        aria-label={label}
        value={text}
        rows={label === 'BibTeX' ? 9 : 3}
        className="w-full font-mono text-xs text-ink bg-paper border border-rule rounded-sm p-2"
      />
    </label>
  )
}

export default function Citation({ compact = false }) {
  const [fallback, setFallback] = useState(null)
  const [announcement, setAnnouncement] = useState('')
  const url = doiUrl()
  return (
    <div className="flex flex-col gap-2">
      <p className="font-serif text-[15px] leading-snug">
        {AUTHOR} ({CITE.year}). <i>{CITE.title}</i> ({versionLabel()}) [Software]. Zenodo.
      </p>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <a href={url} target="_blank" rel="noreferrer" className="font-mono text-xs text-acc underline underline-offset-2 break-all hover:text-ink">
          {url}
        </a>
        <div className="flex flex-wrap gap-2">
          <CopyButton
            label={`Copy citation for ${CITE.name}`}
            text={citationText()}
            onFail={(text) => setFallback({ label: 'Citation', text })}
            onCopied={() => setAnnouncement('Citation copied')}
          >
            Copy
          </CopyButton>
          <CopyButton
            label={`Copy BibTeX for ${CITE.name}`}
            text={bibtex()}
            onFail={(text) => setFallback({ label: 'BibTeX', text })}
            onCopied={() => setAnnouncement('BibTeX copied')}
          >
            BibTeX
          </CopyButton>
          {!compact && (
            <a href={zenodoUrl()} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-sm border border-ink/30 text-xs hover:border-ink transition-colors">
              Zenodo ↗
            </a>
          )}
        </div>
      </div>
      {fallback && <Fallback label={fallback.label} text={fallback.text} />}
      <span role="status" aria-live="polite" className="sr-only">{announcement}</span>
    </div>
  )
}
