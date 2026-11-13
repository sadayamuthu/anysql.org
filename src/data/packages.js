export const GITHUB = 'https://github.com/sadayamuthu/anySQL'

export const PACKAGES = [
  {
    number: 1,
    name: 'anysql-sdk',
    short: 'SDK',
    to: '/sdk',
    status: 'available · v0.1.0',
    summary: 'SQL analytics for LLM responses, agent traces, and RAG pipelines. Powered by DuckDB. Zero configuration.',
    install: 'pip install anysql-sdk',
    pypi: 'https://pypi.org/project/anysql-sdk/',
  },
  {
    number: 2,
    name: 'anysql-proxy',
    short: 'Proxy',
    to: '/proxy',
    status: 'available · v0.1.0',
    summary: 'Local IDE LLM proxy: intercept, log, and query your AI coding assistant usage from Cursor, Claude Code, Windsurf, and VS Code.',
    install: 'pip install anysql-proxy',
  },
  {
    number: 3,
    name: 'anysql-server',
    short: 'Server',
    to: '/server',
    status: 'coming soon',
    summary: 'REST API server for querying anySQL data over HTTP. Query your AI telemetry from any language or tool.',
  },
  {
    number: 4,
    name: 'anysql-ui',
    short: 'UI',
    to: '/ui',
    status: 'coming soon',
    summary: 'Monaco SQL editor and pre-built dashboards at localhost:4243. Query and visualize without leaving your machine.',
  },
]

export const getPackage = (to) => PACKAGES.find((p) => p.to === to)
