import DocsLayout from '../components/DocsLayout'
import { Button, CodeBlock, CopyButton, InlineCode, Section, Status } from '../components/ui'
import { GITHUB } from '../data/packages'
import { PAPERS, paperBibtex } from '../data/research'

export default function Research() {
  return (
    <DocsLayout
      eyebrow="Research"
      title="Research"
      lede="Papers that use anySQL, with the code and data needed to check their results."
      toc={PAPERS.map((p) => ({ id: p.id, label: p.title.split(':')[0] }))}
    >
      {PAPERS.map((p) => (
        <Section key={p.id} id={p.id} title={p.title}>
          <p className="text-ink">{p.authors}</p>
          <p className="text-ink-muted text-sm mt-1">{p.venue}</p>
          <p className="text-ink-muted text-sm">{p.place}</p>
          <div className="mt-3"><Status status={p.status} /></div>

          <p className="text-ink-muted mt-5 leading-relaxed">{p.summary}</p>

          <h3 className="font-serif text-xl mt-6 mb-2">Findings</h3>
          <ul className="list-disc pl-5 flex flex-col gap-2 text-ink-muted">
            {p.findings.map((f) => <li key={f}>{f}</li>)}
          </ul>

          <h3 className="font-serif text-xl mt-6 mb-2">Artefacts</h3>
          <p className="text-ink-muted mb-4">
            Evaluation loader, detection queries, frozen query hashes and raw results, tag{' '}
            <InlineCode>{p.artifactsTag}</InlineCode>. The provenance change is anySQL{' '}
            <InlineCode>{p.anysqlVersion}</InlineCode> (commit <InlineCode>{p.anysqlCommit}</InlineCode>).
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={p.artifacts} variant="solid">Artefacts on GitHub</Button>
            <Button href={`${GITHUB}/commit/${p.anysqlCommit}`}>anySQL commit {p.anysqlCommit}</Button>
          </div>

          <div className="flex items-center justify-between mt-6">
            <h3 className="font-serif text-xl">Cite</h3>
            <CopyButton text={paperBibtex(p)} label={`Copy BibTeX: ${p.title.split(':')[0]}`} />
          </div>
          <CodeBlock code={paperBibtex(p)} />
        </Section>
      ))}
    </DocsLayout>
  )
}
