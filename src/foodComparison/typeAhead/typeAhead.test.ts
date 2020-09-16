import typeAhead from './typeAhead'

describe('typeAhead', () => {
  const fetcher = jest.fn((query: string): Promise<string[]> => {
    return new Promise((resolve) => {
      resolve([query])
    })
  })
  const t = typeAhead<string[]>(fetcher)
  it('does nothing if a query is less than the min query params', () => {
    return t.fetchResults("fo").then((data: string[]) => {
      expect(data).toBeUndefined()
    })
  })
  it('allows to setMinQueryChars if positive and more than 0', () => {
    t.setMinQueryChars(5)
    expect(t.getMinQueryChars()).toBe(5)
    t.setMinQueryChars(-2)
    expect(t.getMinQueryChars()).toBe(5)
    t.setMinQueryChars(3.54)
    expect(t.getMinQueryChars()).toBe(5)
    t.setMinQueryChars(3)
    expect(t.getMinQueryChars()).toBe(3)
  })
})  