describe('test setup', () => {
  it('runs in jsdom', () => {
    expect(document.createElement('div')).toBeInstanceOf(HTMLElement)
  })
})
