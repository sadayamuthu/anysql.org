# anySQL.org Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle anysql.org in the OpenAstra Research Lab system with a green accent, keeping all 8 routes and their content.

**Architecture:** Shared `ui.jsx`, `Citation.jsx`, `PackageLayout`, `DocsLayout`. Each page keeps its data arrays and gets new markup. Vitest is added (there are no tests today).

**Tech Stack:** React 18, react-router 6, Tailwind 3, Vite 5, Vitest 2 (compatible with Vite 5).

**Spec:** `docs/superpowers/specs/2026-11-13-research-lab-restyle-design.md`

## Global Constraints

- Tokens: paper `#F6F3EC`, card `#FFFDF8`, ink `#1B1B1B`, ink-muted `#5E5B55`, rule `#D9D4C8`, acc `#2F6B4F`.
- DOI `10.5281/zenodo.23980548`, version `0.1.1`; GitHub `https://github.com/sadayamuthu/anySQL`.
- Adapters: `anysql.openai(db).wrap(...)` / `anysql.claude(db).wrap(...)`.
- No dark-theme class names remain.

## Review Focus

- Clipboard unavailable on Citation and on the query Copy buttons: no throw. Citation reveals the text. Tests in Tasks 2 and 5.
- The Packages menu must work by keyboard and touch, not hover only: a button toggles it, links are reachable. Test in Task 3.
- An unknown route still renders Home (existing `*` behavior). Test in Task 3.
- 375px: wide schema tables and code scroll inside their boxes. Visual check in Task 6.

---

### Task 1: Tooling + theme
- [ ] `npm i -D vitest@2.1.9 jsdom@25.0.1 @testing-library/react@16.3.0 @testing-library/jest-dom@6.6.3 @testing-library/dom@10.4.0`. Add a `test` script, vitest config in `vite.config.js` (globals, jsdom, setup file), and `src/test/setup.js` (jest-dom; stub `window.scrollTo`).
- [ ] Fix the lint script to `eslint .`; add a vitest-globals block for test files; lint passes.
- [ ] Theme tokens, fonts and body as in Global Constraints; `index.html` meta.
- [ ] Commit `chore: vitest, lint fix, research-lab theme`.

### Task 2: ui primitives + Citation
- [ ] `ui.jsx`: Eyebrow, Pill, Button, CodeBlock(`code`, `lang?`), Section(`id`, `title`), CopyButton(`text`, `label`). CopyButton never throws without a clipboard.
- [ ] `Citation.jsx` as in openastra.org. Tests: the DOI link, Copy and BibTeX text, and the fallback textbox. RED, GREEN, commit.

### Task 3: Shell: Navbar + Footer + App
- [ ] Tests first:
  - The wordmark links to `/`; the family link goes to `https://openastra.org`.
  - The Packages button toggles a menu with SDK `/sdk`, Proxy `/proxy`, Server `/server` and UI `/ui` (`aria-expanded` flips).
  - Schema, Queries, CLI and Cite (`/#cite`) links; GitHub `https://github.com/sadayamuthu/anySQL`.
  - Footer has "An OpenAstra framework" and "IV. Observability".
  - `AppRoutes` at `/nope` renders Home's h1.
- [ ] Implement (App exports `AppRoutes`; ScrollToTop on route change; hash scroll for `/#cite`). Commit.

### Task 4: Home
- [ ] Tests first:
  - h1 "SQL analytics for AI systems."
  - The 4 packages link to `/sdk`, `/proxy`, `/server` and `/ui`, with statuses available, available, coming soon, coming soon.
  - The JOIN section, the 3 Why titles, 5 use cases UC1–UC5, quick-start code containing `anysql.claude(db).wrap(`, and `#cite` with the DOI link.
- [ ] Implement. Commit.

### Task 5: Package + docs pages
- [ ] `PackageLayout({ number, name, status, lede, children })` and `DocsLayout({ title, lede, toc: [{id,label}], children })`.
- [ ] Tests:
  - Each package page h1 is the package name; Server and UI show "coming soon".
  - SDK code contains `anysql.openai(db).wrap(`.
  - Schema renders all 6 table names and a TOC link per table.
  - Queries renders a Copy button per query (count = number of queries), and Copy writes the SQL.
  - CLI shows `anysql query` and `anysql stats`.
- [ ] Restyle all 7 pages, keeping their data. RED, GREEN, commit.

### Task 6: Verify
- [ ] `npx vitest run`, `npm run lint` and `npm run build` pass; no dark tokens remain (`grep -r "accent-cyan\|bg-space\|text-text-" src` is empty); scrollWidth is 375 on all routes. Commit fixes.
