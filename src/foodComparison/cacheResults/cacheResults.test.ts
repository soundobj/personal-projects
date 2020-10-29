import cacheResults from './cacheResults'

describe('cacheResults', () => {
  const fetcher = jest.fn((query: string): Promise<string[]> => {
    return new Promise((resolve) => {
      resolve([query])
    })
  })
  const t = cacheResults<string[]>(fetcher)
  it('takes a Promise as argument to fetch results', () => {
    return t.fetchResults("foo").then((data: string[]) => {
      expect(data).toMatchObject(["foo"])
    })
  })
  it('serves previously stored results from cache', () => {
    return t.fetchResults("foo").then((data: string[]) => {
      expect(data).toMatchObject(["foo"])
      expect(fetcher).toHaveBeenCalledTimes(1)
    })
  })
})  