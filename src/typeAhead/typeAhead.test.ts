import typeAhead, { ResultsFetcherResponse, TypeAheadResults } from './typeAhead'

describe('typeAhead', () => {
  const fetcher = jest.fn((query: string): ResultsFetcherResponse => {
    return new Promise((resolve) => {
      resolve({
        [query]: query
      })
    })
  })
  const t = typeAhead(fetcher)
  it('takes a Promise as argument to fetch results', () => {
    return t.fetchResults("foo").then((data: TypeAheadResults) => {
      expect(data).toMatchObject({"foo": "foo"})
    })
  })
  it('stores previous suggsestions in cache', () => {
    return t.fetchResults("foo").then((data: TypeAheadResults) => {
      expect(data).toMatchObject({"foo": "foo"})
      expect(fetcher).toHaveBeenCalledTimes(1)
    })
  })
  it('does nothing if a query is less than the min query params', () => {
    return t.fetchResults("fo").then((data: TypeAheadResults) => {
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