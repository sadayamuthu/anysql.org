import { readFileSync } from 'node:fs'

describe('GitHub Pages deep links', () => {
  it('ships a 404.html SPA fallback so /sdk etc. load directly', () => {
    expect(readFileSync('.github/workflows/deploy.yml', 'utf8')).toMatch(/cp dist\/index\.html dist\/404\.html/)
  })

  it('uses absolute asset paths so nested routes resolve', () => {
    expect(readFileSync('vite.config.js', 'utf8')).toMatch(/base: '\/'/)
  })
})
