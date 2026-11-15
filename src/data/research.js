// Papers that use anySQL. Newest first. Add a `pdf` or `doi` link once the paper is published.
export const PAPERS = [
  {
    id: 'untraced-by-design',
    title: 'Untraced by Design: Hunting Prompt-Injection Compromises in LLM Agent Telemetry with SQL',
    authors: 'Karthikeyan Sadayamuthu',
    venue: 'IEEE International Conference on Cybersecurity Systems, Technologies and Applications (CSTA 2026)',
    place: 'San Antonio, TX, USA · 8–10 December 2026',
    status: 'accepted · oral presentation',
    year: 2026,
    summary:
      'LLM agents read untrusted content through their tools and act on it. When an injected instruction succeeds, the evidence is split across the user’s request, the tool output that carried the instruction, and the later tool call that obeyed it. The paper shows that agent telemetry built for debugging could not answer which retrieved text came before which action, adds a per-session step sequence shared by all layers (anySQL 0.2.0), and evaluates SQL detection queries on 11,652 recorded AgentDojo sessions with queries frozen on one model and tested on four held-out models.',
    findings: [
      'A text signature catches 93.9% of successful attacks but also fires on 58.5% of attacks the model resisted: it shows that injected text arrived, not that the agent obeyed.',
      'On an attack phrased as a plain to-do item, signatures catch none; a provenance query that flags actions using identifiers the user never supplied catches 91.2%.',
      'Provenance flags 12.1% of benign sessions; requiring both provenance and an unrequested action raises precision to 0.70 at 30.2% recall.',
    ],
    artifacts: 'https://github.com/sadayamuthu/untraced-by-design',
    artifactsTag: 'v1.0',
    anysqlVersion: '0.2.0',
    anysqlCommit: 'fe92f1a',
  },
]

export function paperBibtex(p) {
  return [
    `@inproceedings{sadayamuthu${p.year}untraced,`,
    `  author = {${p.authors}},`,
    `  title = {${p.title}},`,
    `  booktitle = {Proc. IEEE Int. Conf. Cybersecurity Systems, Technologies and Applications (CSTA)},`,
    `  address = {San Antonio, TX, USA},`,
    `  year = {${p.year}},`,
    `}`,
  ].join('\n')
}
