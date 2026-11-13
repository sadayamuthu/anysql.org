import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function Eyebrow({ children, className = '', ...props }) {
  return (
    <p className={`text-[11px] font-medium tracking-[0.14em] uppercase text-ink-muted ${className}`} {...props}>
      {children}
    </p>
  )
}

export function Status({ status }) {
  const available = status.startsWith('available')
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-mono text-[11px] ${available ? 'border-acc text-acc' : 'border-dashed border-ink/30 text-ink-muted'}`}>
      {status}
    </span>
  )
}

const buttonTone = {
  solid: 'bg-ink text-paper border-ink hover:bg-acc hover:border-acc',
  outline: 'border-ink text-ink hover:bg-ink hover:text-paper',
}
const buttonBase = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-sm border text-sm font-medium transition-colors'

export function Button({ to, href, variant = 'outline', children, className = '' }) {
  const cls = `${buttonBase} ${buttonTone[variant]} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

export function CodeBlock({ code, title, className = '' }) {
  return (
    <div className={`bg-ink text-[#EDE7DA] rounded-sm p-5 font-mono text-[13px] leading-relaxed overflow-x-auto [font-variant-ligatures:none] my-4 ${className}`}>
      {title && <p className="text-[#EDE7DA]/50 mb-1">{title}</p>}
      <pre className="whitespace-pre"><code>{code}</code></pre>
    </div>
  )
}

export function InlineCode({ children }) {
  return <code className="font-mono text-[0.9em] px-1 py-0.5 rounded-sm bg-card border border-rule">{children}</code>
}

export function Section({ id, title, children }) {
  return (
    <section id={id} className="py-8 border-t border-rule scroll-mt-24">
      <h2 className="font-serif text-2xl sm:text-3xl mb-4">{title}</h2>
      {children}
    </section>
  )
}

async function writeClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // insecure context or permission denied
  }
  return false
}

export function CopyButton({ text, label = 'Copy', className = '' }) {
  const [state, setState] = useState('idle')
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  const onClick = async () => {
    setState((await writeClipboard(text)) ? 'copied' : 'failed')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2000)
  }
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`px-2.5 py-1 rounded-sm border border-ink/30 text-xs hover:border-ink transition-colors ${className}`}
    >
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select & copy' : 'Copy'}
    </button>
  )
}
